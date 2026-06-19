# Changelog

Dated record of features, changes, and fixes. Newest first.

## [1.2.1] — 2026-06-19
### Added
- AEO §8.4: markdown twin discovery (HTML `alternates.types` link + sitemap.xml at
  lower priority + llms.txt) and Next.js App Router routing constraints (catch-all
  cannot be suffixed with `/md`; use `/md/directory/[[...segments]]`) — `#1`, `#5`
- `.ai/examples/nextjs-seo.ts`: reference `serializeJsonLd` + Organization / WebSite /
  BreadcrumbList / LocalBusiness JSON-LD builders, cross-linked from §8.3 — `#4`
- AEO §7.1 + checklists: H1/answer-first-intro must match per-query-param metadata on
  filtered listing pages — `#2`
- ONBOARD: brownfield `.project/` → `.ai/docs/` migration-map appendix and the
  dual-changelog standing rule (CHANGELOG vs AEO-CHANGES) — `#3`
- All five items reported via `/feedback` from the vishwakarm consumer project.

## [Unreleased]
### Added
- Project scaffolded from the VijayaTech Project Framework template.
- Feedback loop ported from Glint: `feedback.sh`, `/feedback` command, `FEEDBACK.md`,
  `FRAMEWORK-FEEDBACK.md` log template, GitHub issue form, and AGENT-GUIDE §8 — 2026-06-09
- Content handoff (ship → blog brief): `content.sh`, `/content` command,
  `CONTENT-HANDOFF.md`, `CONTENT-PIPELINE.md` log template, `templates/content-brief.yml`
  issue form, and AGENT-GUIDE §10 step 5 — 2026-06-10
- Content handoff supports two delivery modes — Local (`CONTENT_DIR` → writes the
  blog's `CONTENT-INBOX.md`) and GitHub (`CONTENT_REPO` → `gh` issue) — to pair an
  OpenStart app with its blog (e.g. a Glint blog: naam → naam-blog) — 2026-06-10

<!-- After /onboard, add an entry like:
### Added
- Project initialized: context, goals, tasks, stakeholders captured — YYYY-MM-DD
-->
