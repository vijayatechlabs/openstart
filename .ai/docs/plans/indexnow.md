# Plan: IndexNow in OpenStart (AEO framework standard)

**Status:** OpenStart deliverables **implemented** (2026-07-17); residual = Glint runtime  
**Date:** 2026-07-17  
**Owner:** framework maintainers  
**Related:** Glint runtime → sibling `glint/.ai/docs/plans/indexnow.md`  
**Protocol:** [indexnow.org/documentation](https://www.indexnow.org/documentation)

### Implementation map (OpenStart)

| Deliverable | Location |
|-------------|----------|
| §8.5 + §8.4.3 + §12 | `.ai/framework/aeo/AEO-FRAMEWORK.md` |
| Checklist / agents / prompts | `AEO-CHECKLIST.md`, `AEO-AGENTS.md`, `AEO-PROMPTS.md`, `AGENT-GUIDE.md` |
| Next helper | `.ai/examples/nextjs-indexnow.ts` |
| CI adapter + examples | `.ai/framework/templates/github/` |
| Skill | `.claude/skills/aeo-framework/SKILL.md` |

---

## 0. Review verdict (approval blockers)

Architecture direction stands: **standard + examples + agent rules**; runtime for Glint blogs lives in Glint.  
**Do not ship the previous draft unchanged.** Especially: do not claim a universal executable GH workflow, do not make RSS the primary change source, and do not overclaim IndexNow → ChatGPT/training effects.

| # | Blocker | Required fix in OpenStart plan |
|---|---------|--------------------------------|
| B1 | RSS misses edits/deletes | Spec: **content/deploy delta primary**; RSS fallback only |
| B2 | Ephemeral CI state | Spec: durable cursor (SHA / remote); forbid “last N” as sole strategy |
| B3 | Wait-for-key ≠ new deploy | Spec: **deploy completion signal** required |
| B4 | Mounted path key | Spec: root vs path-scoped `keyLocation` |
| B5 | Glint sync limits | Cross-link: Glint **migrate**, not “sync alone” |
| B6 | Fake-universal workflow | **Adapter contract** + stack-specific materialization; not one runnable YAML for all stacks |

---

## 1. Goal

Make IndexNow a first-class **AEO standard** so every project knows:

- when to adopt it,
- key hosting (root vs scoped),
- how to select URLs (add/update/delete),
- when to notify (after **this** deploy is live),
- what agents must / must not claim,
- how CI templates fit **without** pretending one workflow runs everywhere.

OpenStart owns: **spec, checklist, examples, agent rules, adapter-oriented templates**.  
OpenStart does **not** own Glint CLI, brand Coolify boxes, or stack-specific lockfiles.

---

## 2. Ownership split

| Concern | OpenStart | Glint |
|--------|-----------|--------|
| Protocol rules, discovery, checklist | ✅ | references standard |
| Next.js / generic Node helper example | ✅ | N/A |
| Key file + CLI + Astro integration | N/A | ✅ |
| GH workflow **contract** (inputs/outputs) | ✅ | implements for Glint sites |
| Runnable brand workflow | Adapter / onboard copy | `new` + **`migrate indexnow`** |
| Content handoff (`content.sh`) | No IndexNow | N/A |

---

## 3. Principles

1. **Baseline SEO first** — crawlable 200s, sitemap, canonical. IndexNow is a freshness notifier only.
2. **Notify only live URLs for this revision** — after deploy completion signal; never draft/PR alone.
3. **Key publicly fetchable** at `keyLocation` (root preferred; path-scoped allowed per protocol).
4. **URL set = adds + updates + deletes** since last successful notify — **not** full historic site on first enable by default.
5. **Change source of truth** = content/deploy delta (git SHA range, CMS event, manifest) — **not** RSS `pubDate` alone.
6. **Agent is a client**, never the sole trigger.
7. **Honest outcomes** — HTTP 200/202 mean **receipt** (202 = key validation pending). IndexNow does **not** guarantee crawl, index, ranking, ChatGPT fetch, or AI training. Soften any field anecdotes accordingly.
8. **Git-native process** — templates in repo; secrets once; no permanent UI-only Action as the design.

---

## 4. Deliverables

### 4.1 Spec — `AEO-FRAMEWORK.md` §8.5 IndexNow

Same weight as robots / sitemap / schema.

**Must include:**

- What IndexNow is (shared notify API; participating engines).
- Key rules: 8–128 chars, `[A-Za-z0-9-]`; host UTF-8 key file.
- **keyLocation:** Option 1 root `/{key}.txt` preferred; Option 2 path-scoped file limits which URL prefixes may be submitted ([docs](https://www.indexnow.org/documentation)).
- **Timing:** build may write key file → deploy completes → then submit.
- **Live gate:** deploy completion signal or revision marker — **not** “stable key URL returns 200” alone (that can be the previous deploy).
- **URL selection (order of preference):**
  1. **Primary:** git/content/CMS delta between last successful notify cursor and current deploy (includes edits + deletes).
  2. **Fallback:** RSS/Atom for **net-new** items only when no cursor and operator opts in — never for edits/deletes.
  3. **Bootstrap / full:** explicit operator flag only; **not** automatic on first enable.
- Twins: when twins exist, submit HTML + twin on add/update; both on delete.
- Batch ≤ **10_000** URLs; honor **Retry-After** on 429; concurrency protection.
- Response handling: **200 OK** and **202 Accepted** both mean accepted receipt (202 = key validation pending) — do not treat 202 as hard failure.
- Agent rules: no invented keys; no success claim without logging status; no claim that IndexNow “makes ChatGPT work.”
- Non-goals: not a sitemap replacement; not Google Indexing API.

### 4.1b Sitemap + twins (§8.2 / §8.4.1)

- List twin URLs at lower priority **and** define **indexing/canonical policy** for twins:
  - minimum: twin response `Link: <html-canonical>; rel="canonical"` (or equivalent meta), so low priority alone is not the only dupe control;
  - optional product choice: `noindex` on twins if twins are AI-only (document decision per project).
- Same twin URL shape across alternate link, sitemap, llms.txt, IndexNow.

### 4.1c Twin headers + AI fetch lag (evidence-labelled)

**Field report (anecdote, not protocol):** large twin sets + sitemap listing + `Content-Disposition: inline` + sometimes `text/plain` correlated with better assistant fetch after ~24h.

**Standard language:**

| Practice | Status in framework |
|----------|---------------------|
| All public twins in sitemap | **Required** when twins exist |
| UTF-8 + `Content-Disposition: inline` | **Recommended** |
| `Content-Type: text/plain` for twin body | **Compatibility experiment** — optional default; not an absolute requirement; keep HTML alternate `type="text/markdown"` |
| IndexNow HTML+twin post-deploy | **Recommended** for Bing-backed discovery speed |
| Expect assistant fetch lag | **Document** — not a deploy-day pass/fail |
| “IndexNow causes ChatGPT/training” | **Forbidden claim** — IndexNow only confirms notification receipt |

### 4.2 Checklist

- [ ] Valid key + hosted key file; keyLocation matches URL prefixes submitted.
- [ ] Mounted sites: root key on parent **or** scoped key under mount.
- [ ] Submit path runs only after **deploy completion signal**.
- [ ] Delta includes updates + deletes; first enable does **not** dump full historic sitemap unless `--bootstrap`.
- [ ] Durable cursor (SHA/remote), not ephemeral runner file alone.
- [ ] 200/202 handled; 429 backoff; batches ≤10k; logs retained.
- [ ] Twins: sitemap + canonical policy + optional IndexNow pair.
- [ ] Intentionally skipped documented if unused.

### 4.3 Agent surface

- Discovery: publish cadence, host shape (root vs mount), deploy host.
- Prompt D: IndexNow only after baseline SEO.
- Forbid overclaims about assistants/training.
- Glint sites: point to Glint CLI + **migrate**, not OpenStart fake script.

### 4.4 Example — `.ai/examples/nextjs-indexnow.ts`

- `validateKey`, `submitIndexNow` (batch, 200/202/429).
- `keyLocation` helper for root vs path.
- Comments: call **after** deploy webhook / `needs: deploy`; compute URL list from **app’s own publish events or git**, not only RSS.
- No hard dependency.

### 4.5 CI adapter contract (not a universal runnable workflow)

GitHub only runs files **in the project repo**. OpenStart cannot ship one YAML that correctly runs on every stack (npm vs pnpm, Glint vs Next, Coolify vs Pages).

**Ship instead:**

| Artifact | Role |
|----------|------|
| `.ai/framework/templates/github/indexnow.ADAPTER.md` | Contract: inputs, when to run, success criteria |
| `.ai/framework/templates/github/indexnow.glint.yml.example` | Example only — “for Glint, prefer engine migrate output” |
| `.ai/framework/templates/github/indexnow.next.example.yml` | Example: `needs: deploy` + `node` helper path **project must provide** |
| Onboard/agent rule | Materialize **stack-appropriate** workflow; do not paste npm+tsx as universal |

**Adapter contract (minimum):**

```
inputs:
  site_url          # production origin
  indexnow_key      # or from app config
  key_location      # absolute URL of key file
  prev_deploy_sha   # durable cursor
  current_sha       # this deploy
  deploy_signal     # how we know this revision is live

steps:
  1. await deploy_signal for current_sha
  2. compute url delta (adds/updates/deletes) for current_sha since prev_deploy_sha
  3. expand twins if applicable
  4. gate: 200 for add/update; 301|404|410 allowed for deletes
  5. POST api.indexnow.org (≤10k, handle 200/202/429)
  6. advance prev_deploy_sha only after accepted receipt
  7. write submission log artifact

forbidden:
  - sole reliance on RSS pubDate for edits/deletes
  - sole reliance on ephemeral workspace state
  - treating key-file 200 alone as proof of new deploy
  - claiming crawl/index/assistant success from 200/202
```

**Host matrix (documentation only):**

| Host | Deploy signal |
|------|----------------|
| GH deploys site | `needs: [deploy]` |
| Coolify | post-deploy or `repository_dispatch` + sha |
| CF Pages git-connected | deploy hook / status API + revision check |
| Vercel/Netlify | deploy webhook + sha |

Manual once: enable Actions, vars/secrets, Bing key registration, host webhook if needed.

### 4.6 Docs hygiene

- AEO-CHANGES, CHANGELOG, AGENT-GUIDE §6 pointer.
- Soften twin/AI language in §8.4 if any absolute claims remain.

---

## 5. Out of scope

- Implementing Glint CLI / Astro / migrate (Glint plan).
- One lockfile-agnostic “just works” workflow for all monorepos.
- Google Indexing API.
- IndexNow from `content.sh` on feature ship.
- Guarantees of crawl, ranking, or assistant availability.

---

## 6. Implementation sequence

| Step | Work | Done when |
|------|------|-----------|
| 1 | §8.5 rewritten with blockers B1–B6 + protocol 200/202/429/key rules | Spec reviewable |
| 2 | §8.4 twin canonical policy + evidence-labelled headers | Spec reviewable |
| 3 | Checklist + agent/skill prompts (no overclaims) | Agents aligned |
| 4 | `nextjs-indexnow.ts` example | Copy-paste helper |
| 5 | Adapter contract + example YAMLs (not universal executable) | Honest CI story |
| 6 | Cross-link Glint migrate + CLI | Clear ownership |
| 7 | AEO-CHANGES + CHANGELOG | Auditable |

Prefer merging **OpenStart standard** before or with Glint P0 so CLI language matches.

---

## 7. Success criteria

- Agents implement IndexNow without Bing marketing pages or false AI claims.
- Checklist forces: deploy signal, durable cursor, add/update/delete, keyLocation scoping.
- Templates are **adapters**, not a fake one-size runnable workflow.
- Glint vs non-Glint paths explicit.
- First enable does not mandate full historic sitemap submit.

---

## 8. Open questions

1. Default-recommend IndexNow for all public marketing sites, or discovery opt-in?
2. Cloudflare Crawler Hints as optional complement only?
3. Shared field names for adapter contract with Glint CLI flags?
4. Twin default: canonical-to-HTML vs optional noindex?

---

## 9. Decision log

| Decision | Choice | Why |
|----------|--------|-----|
| Layer | Standard + examples + adapter contract | Stack-agnostic |
| Change source | Content/deploy delta primary | Edits + deletes |
| RSS | Fallback net-new only | pubDate incomplete |
| First enable | No auto full historic | Avoid spam; plans aligned |
| State | Durable SHA/remote | Ephemeral CI fails |
| Live gate | Deploy/revision signal | Stable key ≠ new deploy |
| keyLocation | Root preferred; scoped for mounts | Protocol Option 1/2 |
| CI artifact | Adapter + examples | Not universal runnable YAML |
| HTTP 202 | Success (pending key check) | Protocol |
| Twin text/plain | Experiment, not hard law | One field report |
| Twin SEO | Canonical (or noindex) policy | Priority alone insufficient |
| IndexNow effects | Receipt only | No ChatGPT/training claims |
| Glint | Owns runtime + migrate | OpenStart owns rules |

---

## 10. Explicit non-claims (copy into §8.5)

> IndexNow notifies participating engines that URLs changed. A 200 or 202 response means the request was **received** (202: key validation may still be pending). It does **not** mean the URL was crawled, indexed, ranked, or made available inside any AI assistant. Sitemap discovery, robots policy, content quality, and engine-side systems remain separate.
