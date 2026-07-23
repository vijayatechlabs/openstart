/**
 * nextjs-markdown-twin.ts — reference twin Response headers + metadata helpers.
 *
 * Illustration only. Copy into e.g. `lib/aeo-twin.ts` and wire a route such as:
 *   app/provider/[slug]/md/route.ts  →  /provider/acme/md
 *
 * See AEO-FRAMEWORK §8.4. Preferred Content-Type is text/markdown (align with
 * Glint blogs). On static hosts, also set host header rules if prerender drops
 * Response headers (§8.4.3).
 *
 * Edge Accept/bot negotiation is optional and needs human approval (§8.4.4).
 */

/** Preferred AEO twin headers (OpenStart standard §8.4.3). */
export function markdownTwinHeaders(
  body: string,
  opts: { htmlCanonicalUrl: string },
): Record<string, string> {
  const bytes =
    typeof Buffer !== 'undefined'
      ? Buffer.byteLength(body, 'utf-8')
      : new TextEncoder().encode(body).length;
  const raw = Math.ceil(bytes / 4);
  const tokens = body.length === 0 ? 0 : Math.max(1, raw);

  return {
    'Content-Type': 'text/markdown; charset=utf-8',
    'Content-Disposition': 'inline',
    Link: `<${opts.htmlCanonicalUrl}>; rel="canonical"`,
    'X-Robots-Tag': 'noindex, follow',
    'X-Markdown-Tokens': String(tokens),
    Vary: 'Accept, User-Agent',
    'X-AEO-Version': '1.0',
    'X-Content-Type-Options': 'nosniff',
  };
}

/** Build a 200 Response for a twin body. */
export function markdownTwinResponse(
  body: string,
  opts: { htmlCanonicalUrl: string },
): Response {
  return new Response(body, {
    status: 200,
    headers: markdownTwinHeaders(body, opts),
  });
}

/**
 * Next.js generateMetadata fragment for a page that has a twin.
 * Adjust twin path to match your route shape (§8.4.2).
 */
export function twinAlternateMetadata(opts: {
  pageUrl: string;
  /** Absolute or site-relative twin URL — must match the route you implement. */
  twinUrl: string;
}) {
  return {
    alternates: {
      canonical: opts.pageUrl,
      types: {
        'text/markdown': opts.twinUrl,
      },
    },
  };
}

/*
Example route (App Router):

// app/provider/[slug]/md/route.ts
import { markdownTwinResponse } from '@/lib/aeo-twin';
import { getProviderMarkdown, getProviderPageUrl } from '@/lib/content';

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ slug: string }> },
) {
  const { slug } = await ctx.params;
  const body = await getProviderMarkdown(slug);
  if (!body) return new Response('Not found', { status: 404 });
  return markdownTwinResponse(body, {
    htmlCanonicalUrl: getProviderPageUrl(slug),
  });
}
*/
