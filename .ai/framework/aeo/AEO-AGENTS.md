# AGENTS.md

## Repository rules
- Follow `.ai/framework/aeo/AEO-FRAMEWORK.md` as the governing standard.
- Follow the two-framework model: AEO + Google AI Visibility.
- **OpenStart** = websites, landing pages, product apps. **Glint** = blogs and
  long-form content. Both target SEO + AI citation **eligibility** (not guarantees).
  When both exist, keep them in sync via content handoff; do not re-implement Glint
  inside the app repo.
- Ask discovery questions before editing.
- Do not change production SEO behavior without approval.
- Run lint/tests when code changes are made.
- Preserve canonical URLs unless a change is requested.
- Keep schema truthful and visible-content aligned.
- Markdown twins: stack-native only; preferred headers §8.4.3; wire discovery trio.
- Edge content negotiation: **human approval required** before Workers/middleware.
- Do not recommend Google Indexing API for BlogPosting / general pages (§8.4.7).
- For IndexNow: submit only after deploy completion for this revision; durable
  cursor for add/update/delete deltas; Glint = one-time `migrate indexnow` then
  every deploy `glint indexnow`. Never claim crawl, index, ranking, or AI training
  from a 200/202 receipt.
- Document work in `.ai/docs/AEO-CHANGES.md`.

## First response requirement
Before coding, ask for:
- framework and hosting (and whether a **Glint blog** is paired)
- GA4 and Search Console status
- robots.txt and sitemap status
- content model and top pages
- constraints on crawlers or indexing

## Implementation standard
Prefer minimal, framework-native changes.
Do not force markdown twins or edge negotiation.
If stack is Glint blog: follow Glint `docs/AEO.md` / `docs/UPGRADE.md`.
