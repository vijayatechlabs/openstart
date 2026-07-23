# Plan: AEO P0 visibility improvements (OpenStart)

**Status:** P0–P1 implemented (2026-07-23) — framework v1.5.0  
**Date:** 2026-07-23  
**Owner:** OpenStart framework maintainers  
**Related:**  
- `.ai/framework/aeo/*`, `.ai/docs/plans/aeo-uplift.md` (v1.4.0 shipped)  
- Glint sibling plan: `glint/.ai/docs/plans/aeo-p0-visibility.md`  
**Goal:** Better SEO + AI citation **eligibility** for **websites, landing pages, and product apps**—paired with Glint blogs. No ranking guarantees.

---

## 0. Context

OpenStart v1.4.0 already raised the twin-header / edge-gate / no-Dualmark standard.  
Next wave (from 2026 web + X research):

1. **Paired brand** board (site + Glint blog)  
2. Landing **answer-first + FAQ** pattern (citation-friendly formats)  
3. Robots **retrieval vs training** clarity  
4. Platform-native markdown (Cloudflare Markdown for Agents, etc.)  
5. Bing Webmaster + IndexNow as first-class for AI-adjacent discovery  
6. Pre-draft question/gap research in agent prompts  
7. Light measurement (AI referrals / logs)—not scoreboard SaaS  

**Product split (unchanged):**

| Product | Surface |
|---------|---------|
| **OpenStart** | Sites, landings, product apps + AEO **standard/examples** |
| **Glint** | Blogs + content **runtime** |
| **Together** | Handoff + shared eligibility bar |

---

## 1. Deliverables

### P0 — must ship next

| ID | Deliverable | Location |
|----|-------------|----------|
| O1 | **Paired-brand AEO checklist** | New short section in `AEO-FRAMEWORK.md` (e.g. §2.3 or §13) + `AEO-CHECKLIST.md` block: site owns marketing AEO; Glint owns blog; GSC+Bing; IndexNow per stack; handoff for product→post |
| O2 | **Landing “money page” pattern** | `AEO-FRAMEWORK.md` (content formats): answer in first ~100 words; visible FAQ only; comparison tables for B2B; link `faqPage` example |
| O3 | **Retrieval-first robots guidance** | §8.1.1: default recommendation when owner wants AI answers—allow user-action/search bots even if training bots blocked; update `nextjs-robots.ts` comments + checklist |
| O4 | **Bing WT in discovery** | Discovery questions (§3.2): Bing Webmaster verified? IndexNow planned? |

### P1 — next wave

| ID | Deliverable | Location |
|----|-------------|----------|
| O5 | **Platform-native markdown** | New §8.4.x or edge subsection: prefer CF Markdown for Agents / host features when available; custom middleware last; human gate for custom edge |
| O6 | **llms.txt tour-guide template** | Short SaaS landing template in framework (product, pricing, docs, blog index, trust); skill reminder: robots gate + llms guide |
| O7 | **Pre-draft research prompt** | `AEO-PROMPTS.md` + content/onboard touch: map questions, AI-cited sources, evidence gap before writing |
| O8 | **Entity clarity (no new file war)** | §8.3 note: Organization sameAs, SoftwareApplication/Product, AboutPage—don’t invent proprietary “entity map” files |
| O9 | **AI referral measurement** | Point skill + checklist at `nextjs-analytics.ts`; require “checked or intentionally skipped” |

### P2 — later

| ID | Deliverable |
|----|-------------|
| O10 | Optional `ai.txt` / licensing posture (only if demand) |
| O11 | Astro landing example (if consumers need it) |
| O12 | Quarterly bot-list refresh note in framework |

---

## 2. Out of scope

- Implementing Glint blog twins inside OpenStart  
- Required edge Workers  
- Google Indexing API for general/BlogPosting pages  
- Citation-guarantee products  
- Third-party AEO brand promotion  

---

## 3. Joint matrix (keep in sync with Glint)

| Surface | OpenStart (site) | Glint (blog) |
|---------|------------------|--------------|
| Twins + AEO headers | Standard + examples | Engine default |
| llms.txt / full | Standard + template | Templates + doctor |
| robots AI policy | Examples + modes | Templates + `aiCrawlers` |
| IndexNow | Adapter + Next helper | CLI + migrate |
| Edge Accept | Docs + CF native note | Docs + CF native note |
| Content handoff | `content.sh` → blog | Pipeline drains inbox |
| Paired checklist | O1 | G1 (mirror) |

---

## 4. Implementation notes

### O1 paired checklist (agent-facing)

```text
If PROJECT has OpenStart app AND Glint blog:
  [ ] Site: crawlability, schema, llms, robots (this standard)
  [ ] Blog: glint doctor + UPGRADE.md (do not reimplement twins in app)
  [ ] GSC + Bing WT on domain(s)
  [ ] IndexNow on blog and/or site per deploy path
  [ ] Content handoff configured (CONTENT_DIR or CONTENT_REPO)
  [ ] No overclaims of citations from headers alone
```

### O2 money page

- Answer-first intro required for commercial priority URLs  
- FAQPage JSON-LD only for visible Q&A  
- Prefer standalone `/faq` `/about` over `#anchors` (already §7.5)—cross-link  

### O5 CF note

- Link Cloudflare docs “Markdown for Agents”  
- Free-plan Transform Rule caveats if relevant  
- Still require human approval before enabling on production  

---

## 5. Verification

- Manual: checklist items appear in `AEO-CHECKLIST.md` and skill  
- VERSION bump when shipped (e.g. 1.4.1 or 1.5.0) + CHANGELOG  
- Dual changelog: framework CHANGELOG + project `AEO-CHANGES.md`  
- Consumers: `bash .ai/framework/sync.sh --dry-run`  

---

## 6. Success criteria

- [x] Paired OpenStart+Glint checklist in framework  
- [x] Landing answer-first + FAQ pattern written  
- [x] Retrieval vs training robots guidance + example comments  
- [x] Bing WT in discovery questions  
- [x] Platform-native markdown documented  
- [x] VERSION + CHANGELOG updated on implement (1.5.0)

---

## 7. Sequence

1. O1 + O4 (docs, discovery)—same PR as Glint G1 for language match  
2. O2 + O3 (content + robots)  
3. O5–O9 (edge native, llms template, research prompt, entities, measurement)  
4. Version + sync note for consumers  

---

## 8. Research inputs (2026-07)

- llms.txt: useful but often low fetch rate / poor quality; pair with robots  
- Retrieval vs training bot split common in robots templates  
- Cloudflare Markdown for Agents = production Accept path  
- IndexNow ≠ Google; Bing matters for some AI retrieval  
- Citation formats: answer-first, FAQ, comparison, original evidence  
- Agents: Accept markdown/plain; research gap before draft  
