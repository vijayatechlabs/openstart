# AEO Changes

Log of AEO / SEO work performed on this project, per
`framework/aeo/AEO-FRAMEWORK.md`. Newest first.

## 2026-07-23 — P0 visibility plan executed (v1.5.0)
**What changed:** Implemented `aeo-p0-visibility.md`: §2.3 paired checklist, §2.4 money page, §8.1.1 retrieval-first robots, Bing/IndexNow discovery, CF Markdown for Agents in §8.4.4, entity sameAs §8.3, `llms-txt.TEMPLATE.md`, pre-draft research prompt, `nextjs-robots.ts` split, checklist/skill updates.
**Why:** Ship 2026 eligibility improvements for sites in sync with Glint blog work.
**Verification:** VERSION 1.5.0 matches CHANGELOG; dual plan status implemented.

## 2026-07-23 — P0 visibility plan filed
**What changed:** Added `.ai/docs/plans/aeo-p0-visibility.md`. Mirror plan in Glint.
**Why:** Capture follow-ons after v1.4.0.
**Verification:** Plan cross-links joint matrix with Glint.

## 2026-07-23 — AEO uplift v1.4.0 (sites + Glint alignment)
**What changed:**
- `AEO-FRAMEWORK.md` §8.2 lastmod; §8.4 stack-native twins + preferred headers + static-host note + llms-full + article meta + edge human-gate + Google Indexing non-use for BlogPosting
- OpenStart = websites/landings; Glint = blogs; shared SEO/AI eligibility; content handoff for sync (README, AGENT-GUIDE, skill, checklist)
- Removed Dualmark-as-default language across AEO-CHECKLIST, AEO-AGENTS, AEO-PROMPTS, skill, framework body
- `.ai/examples/nextjs-markdown-twin.ts`; `nextjs-seo.ts` person/blogPosting/articleOpenGraph
- Plan `.ai/docs/plans/aeo-uplift.md`; framework VERSION **1.4.0**
**Why:** Align site/landing AEO bar with Glint content runtime; better SEO + AI citation eligibility without third-party product push.
**Verification:** Dualmark string grep clean; VERSION matches CHANGELOG 1.4.0; manual review of §8.4 vs Glint `docs/AEO.md` header set.

## 2026-07-17 — IndexNow Framework Standard
**What changed:**
- `AEO-FRAMEWORK.md` §8.4.3 twin policy + §8.5 IndexNow + §12 checklist items
- `AGENT-GUIDE.md`, `AEO-CHECKLIST.md`, `AEO-AGENTS.md`, `AEO-PROMPTS.md`
- `.ai/examples/nextjs-indexnow.ts` (host filter, chunking, 200/202/429)
- `.ai/framework/templates/github/` adapter + Glint/Next examples (`glint indexnow` post-deploy)
- `.ai/docs/plans/indexnow.md`
**Why:** Post-deploy freshness notify with durable deltas; no overclaims; stack-appropriate CI.
**Verification:** Manual review against revised plan blockers B1–B6; example endpoint/key rules vs indexnow.org docs.

## YYYY-MM-DD — <change title>
**What changed:** <files / settings touched>
**Why:** <SEO / Google AI / broader AEO goal>
**Verification:** <how it was checked>
