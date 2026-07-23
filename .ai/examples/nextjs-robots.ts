/**
 * nextjs-robots.ts — Next.js App Router `robots.ts` for public AEO surfaces.
 *
 * Illustration only. Copy to `app/robots.ts`, set SITE_URL, adjust private paths.
 * Implements AEO-FRAMEWORK §8.1.1 (allow-public / deny-private + retrieval vs training).
 *
 * Postures:
 *   - all: allow named AI bots on public pages
 *   - retrieval-first: allow user-action/search bots; block training scrapers
 *   - none: do not add named AI allows (private paths still denied for *)
 */

import type { MetadataRoute } from 'next';

const SITE_URL = 'https://example.com';

const PRIVATE_PATHS = ['/admin', '/dashboard', '/api', '/login', '/account'];

/** User-action / search — prefer allow when owner wants AI answers/citations. */
const RETRIEVAL_BOTS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'Perplexity-User',
  'PerplexityBot',
  'Claude-User',
  'Claude-SearchBot',
  'ClaudeBot',
];

/**
 * Training-oriented — block under retrieval-first.
 * Google-Extended: generative AI opt-out; does NOT affect normal Googlebot Search.
 */
const TRAINING_BOTS = [
  'GPTBot',
  'CCBot',
  'Google-Extended',
  'Applebot-Extended',
  'Bytespider',
  'meta-externalagent',
  'anthropic-ai',
];

/** Change with owner: 'all' | 'retrieval-first' | 'none' */
const AI_POSTURE: 'all' | 'retrieval-first' | 'none' = 'retrieval-first';

function aiRules(): MetadataRoute.Robots['rules'] {
  const denyPrivate = { allow: '/', disallow: PRIVATE_PATHS } as const;
  if (AI_POSTURE === 'none') return [];
  const agents =
    AI_POSTURE === 'all' ? [...RETRIEVAL_BOTS, ...TRAINING_BOTS] : RETRIEVAL_BOTS;
  const rules = agents.map((userAgent) => ({ userAgent, ...denyPrivate }));
  if (AI_POSTURE === 'retrieval-first') {
    for (const userAgent of TRAINING_BOTS) {
      rules.push({ userAgent, disallow: ['/'] });
    }
  }
  return rules;
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: PRIVATE_PATHS },
      ...aiRules(),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
