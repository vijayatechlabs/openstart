# Checklist

## SEO / Google eligibility
- [ ] Priority pages return 200 and are indexable.
- [ ] Googlebot is not accidentally blocked.
- [ ] sitemap.xml exists and is correct.
- [ ] canonical logic is correct.
- [ ] visible main content is accessible as text.
- [ ] on filtered listing pages (query-param or path-segment), the visible H1 and answer-first intro match the per-filter metadata (not a generic title).
- [ ] page experience issues on key pages were reviewed.
- [ ] structured data matches visible content.
- [ ] preview-control policy was reviewed intentionally.
- [ ] Search Console setup was checked or requested.

## Broader AEO
- [ ] llms.txt created or intentionally skipped.
- [ ] robots.txt AI crawler policy reviewed.
- [ ] markdown twins created or intentionally skipped.
- [ ] twin discovery wired where twins exist (HTML `alternates.types` link + sitemap.xml at lower priority + llms.txt).
- [ ] twin duplicate policy when twins exist (canonical Link → HTML and/or intentional noindex) — §8.4.3.
- [ ] Dualmark considered and justified if used.
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
- [ ] AI referral measurement guidance prepared.
- [ ] conversion-quality metrics identified.
- [ ] .ai/docs/AEO-CHANGES.md added or updated.