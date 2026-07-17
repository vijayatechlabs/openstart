/**
 * nextjs-indexnow.ts — Next.js helper for submitting changed URLs to IndexNow.
 *
 * Illustration only (per `.ai/examples/README.md`). Copy into your project
 * (e.g. `lib/indexnow.ts`), then wire a **project-owned** post-deploy script
 * (e.g. `scripts/submit-indexnow.ts` — not shipped by OpenStart) or deploy webhook.
 * Implements AEO-FRAMEWORK §8.5.
 *
 * Timing: run only AFTER this deploy is live (deploy completion signal / revision
 * check). Do not run as part of the build step. A 200 on a stable key URL alone
 * does not prove the new revision is live.
 *
 * Change detection: git/content/CMS delta between durable prev cursor and current
 * deploy SHA. Do not rely solely on RSS feed pubDates (misses edits and deletes).
 *
 * Outcomes: HTTP 200/202 mean the request was **received** only — not crawled,
 * indexed, ranked, or available in any AI assistant.
 */

export interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

export interface SubmissionResult {
  success: boolean;
  status: number;
  message: string;
  retryAfter?: number;
  submittedCount?: number;
}

/**
 * Validate an IndexNow key:
 * - Length 8–128
 * - Characters [A-Za-z0-9-] only
 */
export function validateKey(key: string): boolean {
  if (!key || key.length < 8 || key.length > 128) return false;
  return /^[A-Za-z0-9-]+$/.test(key);
}

/**
 * Absolute URL of the hosted key file.
 * - Option 1 (preferred): https://example.com/{key}.txt
 * - Option 2 (scoped): https://example.com/blog/{key}.txt — only URLs under that path prefix
 */
export function getKeyLocation(siteUrl: string, key: string, pathPrefix?: string): string {
  const origin = siteUrl.replace(/\/$/, "");
  const keyFileName = `${key}.txt`;
  if (pathPrefix) {
    const formattedPrefix = pathPrefix.replace(/^\/|\/$/g, "");
    return `${origin}/${formattedPrefix}/${keyFileName}`;
  }
  return `${origin}/${keyFileName}`;
}

/** Hostname for IndexNow `host` field (no scheme). */
export function getHost(siteUrl: string): string {
  return new URL(siteUrl).host;
}

/**
 * Keep only URLs that belong to the same host as siteUrl (protocol 422 otherwise).
 * Returns { valid, rejected }.
 */
export function filterUrlsForHost(
  siteUrl: string,
  urls: string[],
): { valid: string[]; rejected: string[] } {
  let expectedHost: string;
  try {
    expectedHost = getHost(siteUrl);
  } catch {
    return { valid: [], rejected: [...urls] };
  }
  const valid: string[] = [];
  const rejected: string[] = [];
  for (const raw of urls) {
    try {
      const u = new URL(raw);
      if (u.host === expectedHost) valid.push(u.href);
      else rejected.push(raw);
    } catch {
      rejected.push(raw);
    }
  }
  return { valid, rejected };
}

/** Split into batches of at most maxPerBatch (IndexNow limit 10_000). */
export function chunkUrls(urls: string[], maxPerBatch = 10_000): string[][] {
  if (maxPerBatch < 1) throw new Error("maxPerBatch must be >= 1");
  const batches: string[][] = [];
  for (let i = 0; i < urls.length; i += maxPerBatch) {
    batches.push(urls.slice(i, i + maxPerBatch));
  }
  return batches;
}

/**
 * Submit one batch (≤10_000 URLs) to IndexNow.
 * Caller should use chunkUrls for larger sets and honor retryAfter on 429.
 */
export async function submitIndexNow(options: {
  siteUrl: string;
  key: string;
  keyLocation: string;
  urls: string[];
  /** Default: https://api.indexnow.org/indexnow */
  endpoint?: string;
  /** If true (default), drop URLs whose host does not match siteUrl */
  filterHost?: boolean;
}): Promise<SubmissionResult> {
  const {
    siteUrl,
    key,
    keyLocation,
    endpoint = "https://api.indexnow.org/indexnow",
    filterHost = true,
  } = options;

  if (!validateKey(key)) {
    return {
      success: false,
      status: 400,
      message: "Invalid IndexNow key (8–128 chars, [A-Za-z0-9-] only)",
    };
  }

  let urls = options.urls ?? [];
  if (filterHost) {
    const { valid, rejected } = filterUrlsForHost(siteUrl, urls);
    if (rejected.length > 0) {
      return {
        success: false,
        status: 400,
        message: `${rejected.length} URL(s) do not match host of siteUrl (first: ${rejected[0]})`,
      };
    }
    urls = valid;
  }

  if (urls.length === 0) {
    return { success: false, status: 400, message: "No URLs provided for submission" };
  }
  if (urls.length > 10_000) {
    return {
      success: false,
      status: 400,
      message: "More than 10_000 URLs — call chunkUrls() and submit each batch",
    };
  }

  let host: string;
  try {
    host = getHost(siteUrl);
  } catch (error) {
    return {
      success: false,
      status: 400,
      message: `Invalid siteUrl: ${(error as Error).message}`,
    };
  }

  const payload: IndexNowPayload = {
    host,
    key,
    keyLocation,
    urlList: urls,
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    const status = response.status;

    // 200 = submitted; 202 = received, key validation may still be pending
    if (status === 200 || status === 202) {
      return {
        success: true,
        status,
        submittedCount: urls.length,
        message:
          status === 200
            ? "Received (200 OK) — not a crawl/index guarantee"
            : "Received (202 Accepted) — key validation may be pending",
      };
    }

    if (status === 429) {
      const retryHeader = response.headers.get("retry-after");
      const retryAfter = retryHeader ? parseInt(retryHeader, 10) : undefined;
      return {
        success: false,
        status,
        message: "Rate limited (429) — honor Retry-After before retrying",
        retryAfter: Number.isFinite(retryAfter) ? retryAfter : undefined,
      };
    }

    const errorText = await response.text();
    return {
      success: false,
      status,
      message: `IndexNow failed: ${status} — ${errorText || response.statusText}`,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: `Network error: ${(error as Error).message}`,
    };
  }
}

/**
 * Submit any number of URLs, chunking at 10_000 and stopping on hard failure.
 * On 429, returns immediately with retryAfter so the caller can sleep and resume.
 */
export async function submitIndexNowAll(
  options: Omit<Parameters<typeof submitIndexNow>[0], "urls"> & { urls: string[] },
): Promise<SubmissionResult[]> {
  const batches = chunkUrls(options.urls, 10_000);
  const results: SubmissionResult[] = [];
  for (const batch of batches) {
    const result = await submitIndexNow({ ...options, urls: batch });
    results.push(result);
    if (!result.success) break;
  }
  return results;
}

/*
 * Example — project-owned scripts/submit-indexnow.ts (you create this file):
 *
 *   import { getKeyLocation, submitIndexNowAll } from '../lib/indexnow';
 *
 *   const siteUrl = process.env.SITE_URL!;
 *   const key = process.env.INDEXNOW_KEY!; // public by design; env is for config only
 *   const prev = process.env.INDEXNOW_PREV_SHA!; // durable cursor (GH var / remote store)
 *   const current = process.env.CURRENT_SHA!;
 *
 *   // TODO: map git diff prev..current (or CMS events) → absolute public URLs + twins
 *   const changedUrls: string[] = [];
 *
 *   const results = await submitIndexNowAll({
 *     siteUrl,
 *     key,
 *     keyLocation: getKeyLocation(siteUrl, key),
 *     urls: changedUrls,
 *   });
 *   console.log(JSON.stringify(results, null, 2));
 *   if (results.some((r) => !r.success)) process.exit(1);
 *   // Only then advance INDEXNOW_PREV_SHA → current in durable storage
 */
