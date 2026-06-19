/**
 * nextjs-analytics.ts — detect AI-assistant referrals and fire a GA4 event.
 *
 * Illustration only (per `.ai/examples/README.md`). Copy into your project
 * (e.g. `lib/analytics.ts`), wire to your real GA4 setup, and adjust the
 * source patterns to taste. Implements the pattern in AEO-FRAMEWORK §9.3.
 *
 * Background: Google AI Overviews / AI Mode traffic is NOT separated in Search
 * Console — it appears in regular web search. This event captures referrals
 * from *other* AI assistants (ChatGPT, Perplexity, Claude, etc.) that send a
 * real `document.referrer`, so you can build a GA4 exploration / channel group.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Ordered patterns — first match wins. Extend as new assistants appear. */
const AI_SOURCE_PATTERNS: ReadonlyArray<{ source: string; test: RegExp }> = [
  { source: 'chatgpt', test: /(^|\.)chatgpt\.com|(^|\.)chat\.openai\.com|(^|\.)openai\.com/i },
  { source: 'perplexity', test: /(^|\.)perplexity\.ai/i },
  { source: 'claude', test: /(^|\.)claude\.ai|(^|\.)anthropic\.com/i },
  { source: 'gemini', test: /(^|\.)gemini\.google\.com|(^|\.)bard\.google\.com/i },
  { source: 'copilot', test: /(^|\.)copilot\.microsoft\.com|(^|\.)bing\.com\/chat/i },
  { source: 'grok', test: /(^|\.)x\.ai|(^|\.)grok\.com/i },
];

/** Return the AI source name for a referrer URL, or null if it isn't one. */
export function detectAiSource(referrer: string): string | null {
  if (!referrer) return null;
  let host: string;
  try {
    host = new URL(referrer).host;
  } catch {
    return null;
  }
  return AI_SOURCE_PATTERNS.find((p) => p.test.test(host))?.source ?? null;
}

/**
 * Fire `ai_referral_landing` once per landing from an AI assistant.
 * Call from a client component on mount (e.g. a top-level <AnalyticsListener/>
 * rendered in app/layout.tsx), after gtag is available.
 */
export function trackAiReferral(): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  const referrer = document.referrer;
  const aiSource = detectAiSource(referrer);
  if (!aiSource) return;

  window.gtag('event', 'ai_referral_landing', {
    ai_source: aiSource,
    page_path: window.location.pathname + window.location.search,
    referrer,
  });
}

/*
 * Client component wiring (app/AnalyticsListener.tsx):
 *
 *   'use client';
 *   import { useEffect } from 'react';
 *   import { trackAiReferral } from '@/lib/analytics';
 *   export function AnalyticsListener() {
 *     useEffect(() => { trackAiReferral(); }, []);
 *     return null;
 *   }
 *
 * GA4 admin checklist (one-time, in the GA4 UI):
 *   1. Admin → Custom definitions → register `ai_source` as a custom dimension
 *      (event-scoped) so it is queryable in explorations.
 *   2. Build a free-form Exploration on the `ai_referral_landing` event,
 *      breakdown by `ai_source` and `page_path`.
 *   3. (Optional) Admin → Data display → Channel groups → add a custom group
 *      that classifies these sessions as "AI Assistants".
 *
 * Verify before shipping:
 *   - Run the site with GA4 DebugView open (Admin → DebugView).
 *   - Set the referrer manually for a smoke test, e.g. open the page from a
 *     link on chatgpt.com, or temporarily stub document.referrer in dev.
 *   - Confirm the `ai_referral_landing` event arrives with the expected
 *     `ai_source`, `page_path`, and `referrer` params.
 */
