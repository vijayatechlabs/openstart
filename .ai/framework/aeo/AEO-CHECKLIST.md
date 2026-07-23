# Checklist

OpenStart = websites / landing pages / product apps.  
Glint = blogs / long-form content. Both aim for SEO + AI citation **eligibility**.
Paired repos: implement site AEO here; blog AEO via Glint; keep content handoff in sync.

## Paired brand (§2.3)
- [ ] Site AEO (this project) complete for priority marketing URLs
- [ ] Glint blog uses Glint doctor / UPGRADE (if blog exists) — no twin reimplementation here
- [ ] GSC + Bing Webmaster verified (or intentionally deferred)
- [ ] Content handoff configured when product + blog are split

## SEO / Google eligibility
- [ ] Priority pages return 200 and are indexable.
- [ ] Googlebot is not accidentally blocked.
- [ ] sitemap.xml exists and is correct.
- [ ] sitemap lastmod considered on priority URLs (§8.2).
- [ ] canonical logic is correct.
- [ ] visible main content is accessible as text.
- [ ] Money pages: answer-first intro (~100 words) — §2.4
- [ ] on filtered listing pages (query-param or path-segment), the visible H1 and answer-first intro match the per-filter metadata (not a generic title).
- [ ] page experience issues on key pages were reviewed.
- [ ] structured data matches visible content; Organization sameAs when real
- [ ] article-like pages: article meta / Article JSON-LD only when truthful (§8.4.6).
- [ ] preview-control policy was reviewed intentionally.
- [ ] Search Console setup was checked or requested.
- [ ] Bing Webmaster checked or intentionally skipped (§3.2).
- [ ] Google Indexing API **not** recommended for BlogPosting/general URLs (§8.4.7).

## Broader AEO
- [ ] llms.txt created or intentionally skipped.
- [ ] llms-full.txt considered (optional size-guarded full feed) or skipped (§8.4.5).
- [ ] robots.txt AI crawler policy reviewed with owner.
- [ ] markdown twins created or intentionally skipped.
- [ ] twin discovery wired where twins exist (HTML alternate + sitemap lower priority + llms.txt) — §8.4.1.
- [ ] twin preferred headers (`text/markdown` + AEO set) and duplicate policy (canonical Link / noindex) — §8.4.3.
- [ ] static-host header rules considered if prerender drops Response headers.
- [ ] edge content negotiation human-approved **or** intentionally skipped — §8.4.4.
- [ ] If this is a **Glint blog**: use Glint `docs/AEO.md` / `docs/UPGRADE.md` (do not re-build blog engine).
- [ ] If **app + Glint blog**: site via OpenStart; blog via Glint; content handoff for product→post sync.
- [ ] IndexNow integration (or documented as intentionally skipped if unused) — §8.5:
  - [ ] Valid key + hosted key file; `keyLocation` matches URL prefixes submitted.
  - [ ] Mounted sites: root key on parent domain or scoped key under mount.
  - [ ] Submit runs only after deploy completion signal for this revision.
  - [ ] Delta uses durable cursor (adds + updates + deletes); no auto full historic on first enable.
  - [ ] 200/202 as receipt; 429 backoff; batches ≤ 10,000; host-matched URLs only.
  - [ ] Twins: HTML + twin on add/update; both on delete when twins exist.
- [ ] answer-first improvements proposed.
- [ ] FAQ/comparison structure proposed where helpful.

## Measurement
- [ ] GA4 presence checked.
- [ ] AI referral measurement checked or intentionally skipped (`nextjs-analytics.ts` pattern).
- [ ] conversion-quality metrics identified.
- [ ] .ai/docs/AEO-CHANGES.md added or updated.
