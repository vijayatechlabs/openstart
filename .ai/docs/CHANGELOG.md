# Changelog

Dated record of features, changes, and fixes. Newest first.

## [1.5.0] — 2026-07-23

### Added
- AEO P0/P1 visibility: paired OpenStart+Glint checklist §2.3; money-page pattern §2.4;
  retrieval-first robots posture §8.1.1; Bing WT + IndexNow in discovery; platform-native
  markdown (CF Markdown for Agents) §8.4.4; entity sameAs note §8.3 — 2026-07-23
- `framework/aeo/llms-txt.TEMPLATE.md` short tour-guide template — 2026-07-23
- Pre-draft question/gap map prompt in `AEO-PROMPTS.md` — 2026-07-23
- Plan `.ai/docs/plans/aeo-p0-visibility.md` executed — 2026-07-23

### Changed
- `nextjs-robots.ts`: retrieval vs training bot split + posture switch — 2026-07-23
- Checklist / skill: paired brand, money pages, Bing, AI referral skip option — 2026-07-23

## [1.4.0] — 2026-07-23

### Added
- AEO §8.4 uplift: preferred markdown twin headers (`text/markdown` + AEO set),
  static-host header note, optional `llms-full.txt`, article metadata, edge
  negotiation human-gate, Google Indexing API non-use for BlogPosting — 2026-07-23
- OpenStart ↔ Glint pairing in README, AGENT-GUIDE, skill, checklist: sites vs
  blogs, shared SEO/AI eligibility goal, content handoff stays the sync path — 2026-07-23
- `.ai/examples/nextjs-markdown-twin.ts`: twin headers + Response + metadata helper — 2026-07-23
- `nextjs-seo.ts`: `person`, `blogPosting`, `articleOpenGraph` helpers — 2026-07-23
- `.ai/docs/plans/aeo-uplift.md`: plan for this release — 2026-07-23

### Changed
- Retire Dualmark-as-default language; stack-native twins + optional edge only — 2026-07-23
- `AEO-CHECKLIST`, `AEO-AGENTS`, `AEO-PROMPTS`, `aeo-framework` skill aligned with §8.4 — 2026-07-23

## [1.3.0] — 2026-07-17
### Added
- AEO §8.5: IndexNow standard (deploy gate, keyLocation root/scoped, git/content delta primary, batch ≤10k, 200/202/429, non-claims) — 2026-07-17
- AEO §8.4.3: twin duplicate policy (canonical Link to HTML / optional noindex) + evidence-labelled twin header guidance — 2026-07-17
- `AGENT-GUIDE.md` §6, `AEO-CHECKLIST.md`, `AEO-AGENTS.md`, `AEO-PROMPTS.md`, §12 checklist: IndexNow agent rules — 2026-07-17
- `.ai/examples/nextjs-indexnow.ts`: validateKey, keyLocation, host filter, chunking, submit (200/202/429) — 2026-07-17
- `.ai/framework/templates/github/`: IndexNow adapter contract + Glint/Next example workflows (not universal runnable) — 2026-07-17
- `.ai/docs/plans/indexnow.md`: design plan (revised after review) — 2026-07-17
- `.ai/framework/VERSION`: bump version to `1.3.0` based on recent IndexNow standard changes — 2026-07-17
- `.githooks/pre-push`: add pre-push validation script to enforce version match between VERSION and CHANGELOG.md — 2026-07-17
- `AGENT-GUIDE.md` §10: update Definition of Done to include framework version bump check — 2026-07-17

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
- AEO §9.3.1 + `.ai/examples/nextjs-analytics.ts`: GA4 `ai_referral_landing`
  pattern (AI-source regex, `trackAiReferral`, admin + DebugView checklist) — `#6`
- AEO §8.1.1 + `.ai/examples/nextjs-robots.ts`: opt-in AI crawler allow-list
  (`robots.ts` allow-public/deny-private + Google-Extended decision guide) — `#7`
- AEO §7.5: standalone trust/about/faq page pattern + route→schema table, with
  `faqPage`/`aboutPage`/`webPage` builders added to `nextjs-seo.ts` — `#8`
### Changed
- Feedback pipeline: local `FRAMEWORK-FEEDBACK.md` log is now optional; added a
  `.ai/FEEDBACK_UPSTREAM_ONLY` marker that makes `feedback.sh` skip the local
  append and `sync.sh` skip seeding the log (FEEDBACK.md, AGENT-GUIDE §8,
  DOC-RULES.md) — `#9`
### Changed (polish)
- §7.1 / checklists / prompts: path-segment filter alignment; §8.4.1 prefix-twin
  `generateMetadata` example + sitemap priority hint; §8.4.2 required catch-all note;
  Prompt D synced with implementation rules; `nextjs-seo.ts` `getSiteUrl`, page-scoped
  `localBusiness` `@id`, `website` publisher link; ONBOARD optional community changelog.
### Notes
- All nine items reported via `/feedback` from the vishwakarm consumer project.

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
