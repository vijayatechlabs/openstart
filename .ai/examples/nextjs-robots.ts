/**
 * nextjs-robots.ts — Next.js App Router `robots.ts` for public AEO surfaces.
 *
 * Illustration only (per `.ai/examples/README.md`). Copy to `app/robots.ts`,
 * set SITE_URL, and adjust the private paths. Implements the allow-public /
 * deny-private pattern in AEO-FRAMEWORK §8.1.1.
 *
 * Intent: a site that *wants* AI visibility on its public pages explicitly
 * allows the major AI crawlers while keeping the same private paths blocked for
 * everyone. Only do this if you have decided to allow AI training/answer crawlers
 * — review the Google-Extended decision below first.
 */

import type { MetadataRoute } from 'next';

const SITE_URL = 'https://example.com';

/** Paths no crawler should index — keep in sync with your auth/app routes. */
const PRIVATE_PATHS = ['/admin', '/dashboard', '/api', '/login', '/account'];

/**
 * AI / answer-engine crawlers to explicitly allow on public pages.
 *
 * Google-Extended decision:
 *   - ALLOW  → your content may be used for Google's generative AI (Gemini,
 *              AI Overviews grounding). Does NOT affect normal Search ranking.
 *   - BLOCK  → remove 'Google-Extended' from this list. Normal Googlebot crawling
 *              and Search indexing are unaffected (that's a separate user-agent).
 * Blocking Google-Extended does not improve or harm Search; it only opts out of
 * generative-AI use. Choose deliberately with the site owner.
 */
const AI_CRAWLERS = [
  'GPTBot', // OpenAI
  'OAI-SearchBot', // OpenAI search
  'ChatGPT-User', // ChatGPT browsing on a user's behalf
  'ClaudeBot', // Anthropic
  'Claude-Web',
  'PerplexityBot', // Perplexity
  'Google-Extended', // Google generative AI (see decision note above)
  'Applebot-Extended', // Apple AI
  'CCBot', // Common Crawl (feeds many models)
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: everyone may crawl public pages, nothing private.
      { userAgent: '*', allow: '/', disallow: PRIVATE_PATHS },
      // Named AI crawlers: same private exclusions, explicitly welcomed elsewhere.
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: PRIVATE_PATHS,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
