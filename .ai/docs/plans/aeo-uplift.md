# Plan: AEO uplift for OpenStart (sites) + shared eligibility with Glint (blogs)

**Status:** P0–P1 implemented (2026-07-23) — framework v1.4.0  
**Date:** 2026-07-23  
**Owner:** OpenStart framework maintainers  
**Related:**  
- OpenStart: `.ai/framework/aeo/*`, `.ai/docs/plans/indexnow.md` (done), `.claude/skills/aeo-framework`  
- Glint (sibling): `docs/AEO.md`, `docs/UPGRADE.md`, content handoff / `CONTENT-HANDOFF.md`  
**Shared goal:** better **SEO results** and **AI citation eligibility** (not guarantees) across website, app, and content.

### Product pairing (non-negotiable)

| Product | Primary surface | Role |
|---------|-----------------|------|
| **OpenStart** | Websites, landing pages, product/marketing apps | Agent framework + AEO standard + stack examples for **site** visibility |
| **Glint** | Blogs and long-form content | Git-native **content runtime** (twins, feeds, doctor, build) |
| **Together** | App + blog (e.g. naam + naam-blog) | Content handoff keeps product features and blog posts in sync; **shared AEO bar** (crawlability, twins, llms, IndexNow honesty, measurement) |

They are complementary, not competitors. Agents should detect the stack and route work:
- Pure site / landing → implement via OpenStart AEO standard + examples.  
- Pure Glint blog → Glint `docs/AEO.md` + `docs/UPGRADE.md`.  
- Paired app + blog → OpenStart for the app/site; Glint for the blog; handoff pipeline for feature→post sync.

**Philosophy:** OpenStart owns **standards, agent rules, checklists, prompts, and stack examples**. It does **not** ship Glint’s blog engine. Shared surfaces (headers, discovery, IndexNow non-claims) stay **aligned** so multi-repo brands don’t drift.

---

## 0. What OpenStart is (constraints on this plan)

| OpenStart is | OpenStart is not |
|---|---|
| Framework for **websites & landing pages** (+ product apps) | A blog CMS / content engine (**Glint**) |
| Spec + checklist + Next.js (etc.) **examples** | Universal production runtime for every host |
| Onboard/sync of `.ai/framework/` into consumer repos | Automatic rewrite of app `src/` |
| Content handoff **to** a blog (e.g. Glint) so **site/app/content stay in sync** | IndexNow CLI or Astro integrations (Glint owns blog runtime) |

**Implication:** Align the AEO **eligibility surface** with Glint (twins, headers, llms, lastmod, edge human-gate)—implemented as **standards + examples** here, as **engine code** in Glint.

**Runtime split (keep):**

| Surface class | Owner |
|---|---|
| Protocol + discovery + agent non-claims + site examples | **OpenStart** |
| Blog twins, doctor, migrate, `markdownTwinResponse`, llms-full for posts | **Glint** |
| Product ↔ blog brief handoff | **OpenStart** `content.sh` + Glint pipeline |
| CDN Accept / bot negotiation | Consumer **edge**, human-approved only |

---

## 1. Glint surface map → OpenStart fit

Legend: **Adopt** = encode in OpenStart standard + examples · **Pointer** = link to Glint/runtime · **Skip** = wrong layer for OpenStart · **Edge** = docs only + human gate

| # | Surface (from Glint AEO / SEO uplift) | Fit for OpenStart? | Disposition |
|---|--------------------------------------|--------------------|-------------|
| 1 | Markdown twins + AEO response headers (`text/markdown`, tokens, noindex, Vary, nosniff, canonical Link) | **Adopt as standard** | Update §8.4: preferred headers match modern twin delivery; keep optional `text/plain` only as compatibility note, not default |
| 2 | HTML `<link rel="alternate" type="text/markdown">` | **Already adopted** §8.4.1 | Tighten checklist + Next example if thin |
| 3 | Twins in sitemap at lower priority | **Already adopted** §8.4.1 | Example snippet for Next/Astro sitemap config |
| 4 | `llms.txt` | **Already adopted** | Keep; add “when to skip” clarity |
| 5 | `llms-full.txt` (full-body feed) | **Adopt** | New § for optional full-content feed + size guard; when *not* to use (auth apps, huge sites) |
| 6 | robots AI crawler policy (`all` / retrieval-only / none) | **Partially adopted** §8.1.1 | Align three-mode policy language with Glint; keep owner decision |
| 7 | Organization / Person / WebSite / FAQ / HowTo JSON-LD | **Partially adopted** §8.3 + `nextjs-seo.ts` | Extend example: Person author, WebSite SearchAction, Article/BlogPosting when content is a blog |
| 8 | `article:*` OG meta | **Adopt** | Standard for article-like pages + Next `generateMetadata` example |
| 9 | Sitemap `lastmod` | **Adopt** | §8.2 require/recommend lastmod from content dates |
| 10 | RSS enrichment (author, content) | **Adopt lightly** | Checklist item; no Glint-style helper required |
| 11 | Auto OG images | **Optional adopt** | Guidance only—stack-dependent; don’t mandate canvas deps |
| 12 | Per-post JSON API | **Optional adopt** | Only for content-driven sites; pointer for Glint |
| 13 | TOC + heading IDs | **Adopt lightly** | Content/UX standard for long pages; not OpenStart runtime |
| 14 | `links.json` / CTA shortcodes | **Skip as framework code** | Glint-specific; OpenStart can mention “internal link registry” pattern only |
| 15 | IndexNow | **Done** (`indexnow.md` + §8.5) | Maintain; cross-link Glint migrate |
| 16 | Google Indexing API for blogs | **Skip / forbid for BlogPosting** | Explicit non-recommendation (JobPosting/BroadcastEvent only) |
| 17 | Accept / bot UA content negotiation, 406, public `.md` rewrite | **Edge docs only** | New short section: stack-agnostic requirements + **human approval**; no Dualmark product push |
| 18 | `glint doctor` / `glint sync` upgrade path | **Pointer** | When consumer uses Glint → `docs/UPGRADE.md` in Glint |
| 19 | Brand upgrade checklist for agents | **Adopt** | OpenStart: “AEO implement / upgrade” steps in skill + optional `AEO-UPGRADE.md` |

---

## 2. What is **not** suitable for OpenStart

Do **not** implement these *inside* the OpenStart repo as required product code:

1. **Astro/Glint package APIs** (`markdownTwinResponse`, Astro integrations, doctor WARNs on twin templates).  
2. **A single required Worker** or middleware shipped as the only path (hosts differ; apps differ).  
3. **Forcing markdown twins** on every project (SPAs, dashboards, auth apps, thin marketing pages).  
4. **Google Indexing API** as a default blog growth tactic.  
5. **Naming / promoting third-party AEO products** as the standard path (retire “use Dualmark” as default language; prefer “stack-native twins + optional edge negotiation”).  
6. **Guarantees** of rankings, citations, or AI training from headers, llms.txt, or IndexNow 200/202.

---

## 3. What **is** suitable (OpenStart deliverables)

### 3.1 Spec updates — `.ai/framework/aeo/AEO-FRAMEWORK.md`

| ID | Change | Priority |
|----|--------|----------|
| S1 | **§8.4 rename** “markdown / Dualmark” → “markdown twins (optional infrastructure)” | P0 |
| S2 | **Preferred twin headers** table: `Content-Type: text/markdown; charset=utf-8`, `Content-Disposition: inline`, `Link` canonical to HTML, `X-Robots-Tag` with `noindex` (or project policy), `X-Markdown-Tokens` (heuristic), `Vary`, `X-AEO-Version`, `nosniff`. Mark `text/plain` as **compatibility option only**. | P0 |
| S3 | **Static hosts note:** Response headers from prerendered files may need host `_headers` / `vercel.json` / Nginx (evidence-labelled, like Glint Decision 15). | P0 |
| S4 | **`llms-full.txt` (optional):** when content is public + multi-page; size guard (~500KB or top N); link from `llms.txt`; skip for gated/member content. | P1 |
| S5 | **§8.2 lastmod:** recommend `updatedAt ?? publishedAt` / deploy timestamp on priority URLs. | P1 |
| S6 | **Article / blog metadata:** `article:*` / equivalent for post-like pages; BlogPosting/Article JSON-LD when visible. | P1 |
| S7 | **Edge negotiation (optional, human-gated):** Accept `text/markdown`, bot UA defaults, 406 for impossible Accept; never override explicit `Accept: text/html`; agents must not deploy Workers without approval. Point to stack examples, not a mandatory product. | P1 |
| S8 | **Google Indexing API:** explicit “do not use for general BlogPosting”; use GSC sitemap + Inspection + IndexNow (Bing family). | P0 |
| S9 | Remove or reword checklist/prompts that say “Dualmark considered” → “stack-native twin routing considered / edge negotiation approved”. | P0 |
| S10 | **Glint consumers:** if project is a Glint blog, defer twin/doctor/migrate to Glint `docs/AEO.md` + `docs/UPGRADE.md`; OpenStart still owns app/marketing AEO. | P0 |

### 3.2 Checklist / agents / prompts / skill

| ID | File | Change |
|----|------|--------|
| C1 | `AEO-CHECKLIST.md` | Twins: headers + discovery + static-host headers; llms-full optional; lastmod; article meta; edge “approved or skipped”; Google Indexing forbidden for blogs; drop Dualmark checkbox |
| C2 | `AEO-AGENTS.md` | Same rules; human gate for edge; Glint pointer |
| C3 | `AEO-PROMPTS.md` | Prompt D/E: preferred headers, llms-full, no Dualmark force |
| C4 | `aeo-framework/SKILL.md` | Align operating rules; remove Dualmark default; add Glint branch in “when stack is Glint” |
| C5 | `AGENT-GUIDE.md` (if AEO section) | One-line cross-links to new sections |

### 3.3 Examples (copy-paste, not runtime)

| ID | Deliverable | Notes |
|----|-------------|--------|
| E1 | `.ai/examples/nextjs-markdown-twin.ts` (or `.md` + route sketch) | Preferred headers object; `text/markdown`; canonical Link; noindex policy |
| E2 | Extend `nextjs-seo.ts` | `articleMeta` / BlogPosting / Person author helpers (truthful, data-driven) |
| E3 | Extend `nextjs-robots.ts` | Optional three-mode policy comments aligned with Glint `aiCrawlers` |
| E4 | Snippet for `llms-full.txt` generation (Node) | Size guard; public-only |
| E5 | Edge negotiation **pseudocode** or short `edge-aeo.NOTES.md` | Cloudflare/Vercel/Netlify caveats; human approval; no product dependency |
| E6 | Examples README | Document new files |

### 3.4 Plans / versioning

| ID | Change |
|----|--------|
| V1 | This plan under `.ai/docs/plans/aeo-uplift.md` |
| V2 | After implement: bump `.ai/framework/VERSION` + dual changelog (`CHANGELOG` + consumer `AEO-CHANGES` guidance) per OpenStart rules |
| V3 | Optional follow-up plan `aeo-edge-notes.md` if edge examples grow large |

---

## 4. Stack guidance matrix (for agents)

| Project type | Twins / llms-full | Prefer |
|--------------|-------------------|--------|
| **Glint blog** | Yes, engine-default | Implement via Glint upgrade (`UPGRADE.md`); OpenStart AEO for marketing site only if separate |
| **Next.js content/marketing** | Often yes on priority pages | OpenStart examples + App Router twin routes §8.4.2 |
| **Astro static site (non-Glint)** | Yes if content-heavy | Build-time routes + optional `_headers` |
| **SPA / authenticated app** | Usually no public twins | Baseline SEO on public marketing only; robots deny private |
| **WordPress / CMS** | Case-by-case | Prefer CMS plugins or export; don’t invent OpenStart PHP runtime |

---

## 5. Implementation sequence

| Phase | Items | Outcome |
|-------|-------|---------|
| **P0 — Language + headers + safety** | S1–S3, S8–S10, C1–C4 | Spec no longer defaults to Dualmark or text/plain; blogs not pushed to Google Indexing API |
| **P1 — Surfaces** | S4–S7, E1–E4 | llms-full, lastmod, article meta, edge notes, twin header example |
| **P2 — Polish** | E5–E6, V2, skill/onboard touch | Version bump; sync-friendly release |

**Out of scope for this plan:** rewriting Glint; implementing Workers in OpenStart; changing content-handoff pipeline.

---

## 6. Success criteria

- [x] AEO-FRAMEWORK §8.4 describes stack-native twins with **preferred** `text/markdown` + AEO header set; Dualmark not required product language  
- [x] Checklist covers: discovery trio, twin headers, static-host headers, llms-full optional, lastmod, article meta, edge human gate, Google Indexing non-use for blogs  
- [x] At least one Next.js twin-header example ships under `.ai/examples/`  
- [x] Skill + prompts match framework (no Dualmark-first path)  
- [x] Glint blogs explicitly deferred to Glint upgrade docs  
- [x] Honest non-claims preserved (eligibility ≠ rankings/citations)  
- [x] Framework VERSION + CHANGELOG updated when P0–P1 land  
- [x] OpenStart = sites/landings, Glint = blogs; shared eligibility + handoff sync documented

---

## 7. Risks

| Risk | Mitigation |
|------|------------|
| Spec diverges from Glint again | Cross-link Glint `docs/AEO.md`; keep header table in sync when either changes |
| Agents force twins on dashboards | Discovery + “when to skip” in §8.4 and skill |
| Agents deploy edge without approval | Explicit human gate (same as Glint) |
| text/plain vs text/markdown churn | Preferred markdown; plain as optional compatibility only |
| Over-scoped “implement Glint in OpenStart” | Ownership table in §0 |

---

## 8. Decision log (proposed)

| Decision | Choice | Why |
|----------|--------|-----|
| OpenStart layer | Spec + examples + agents only | Matches product identity and IndexNow plan ownership |
| Twin Content-Type default | `text/markdown; charset=utf-8` + AEO headers | Align with Glint; better AI/type signal; alternate type stays markdown |
| Dualmark in docs | Remove as product default | Stack-native + optional edge; no third-party promotion |
| Edge negotiation | Documented, never required | Host- and stack-specific; human approval |
| Google Indexing API | Not for BlogPosting | Official scope; avoid wrong brand rollout |
| Glint blogs | Pointer to Glint | Avoid dual runtimes |

---

## 9. Next actions (ordered)

1. ~~Review/approve this plan~~ — product pairing confirmed; executed 2026-07-23.  
2. ~~P0 doc rewrites~~ — done in v1.4.0.  
3. ~~P1 examples~~ — `nextjs-markdown-twin.ts`, seo helpers.  
4. ~~Version bump~~ — `1.4.0` + CHANGELOG.  
5. **Consumer:** `bash .ai/framework/sync.sh` (or dry-run) in site/app repos; Glint blogs use Glint `docs/UPGRADE.md`.  
6. Optional: pilot on a paired OpenStart app + Glint blog.  
7. **Follow-on plan:** `.ai/docs/plans/aeo-p0-visibility.md` (paired checklist, landing patterns, retrieval bots, CF native markdown, Bing WT).

---

## 10. Reference — Glint already ships (do not re-build here)

For Glint blogs, these are **engine** concerns already (or mostly) done:

- `markdownTwinResponse` / twin doctor  
- `llms-full.txt`, article meta, Org/Person/FAQ/HowTo, lastmod helpers, OG, TOC IDs, RSS HTML, IndexNow CLI  
- `docs/AEO.md`, `docs/UPGRADE.md`, edge worker **guidance only**

OpenStart’s job is to make **non-Glint** (and mixed) projects reach the same *eligibility* bar via agents and examples—not to fork that runtime.
