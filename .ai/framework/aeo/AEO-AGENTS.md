# AGENTS.md

## Repository rules
- Follow `.ai/framework/aeo/AEO-FRAMEWORK.md` as the governing standard.
- Follow the two-framework model: AEO + Google AI Visibility.
- Ask discovery questions before editing.
- Do not change production SEO behavior without approval.
- Run lint/tests when code changes are made.
- Preserve canonical URLs unless a change is requested.
- Keep schema truthful and visible-content aligned.
- For IndexNow: submit only after deploy completion for this revision; durable
  cursor for add/update/delete deltas; Glint = one-time `migrate indexnow` then
  every deploy `glint indexnow`. Never claim crawl, index, ranking, or AI training
  from a 200/202 receipt.
- Document work in `.ai/docs/AEO-CHANGES.md`.

## First response requirement
Before coding, ask for:
- framework and hosting
- GA4 and Search Console status
- robots.txt and sitemap status
- content model and top pages
- constraints on crawlers or indexing

## Implementation standard
Prefer minimal, framework-native changes.
Use Dualmark only if it clearly reduces complexity.