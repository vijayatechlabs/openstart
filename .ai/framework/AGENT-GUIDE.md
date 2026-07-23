# AGENT-GUIDE — Single Source of Truth for All AI Agents

> This is the **one file every AI agent reads**, regardless of tool.
> `CLAUDE.md`, `AGENTS.md`, and `GEMINI.md` at the repo root are thin stubs that
> redirect here. Edit this file; all agents stay in sync.

You are working inside a project scaffolded with the **VijayaTech Project Framework** —
a language- and framework-agnostic operating system for building products with
mixed human + AI teams (Claude Code, Google AntiGravity / Gemini, Codex, Cursor, etc.).

The framework makes no assumption about stack. It works for Next.js, Astro, plain
static sites, Python services, or anything else, deployed on Vercel, Netlify,
Cloudflare, or a self-hosted VPS.

All framework + project meta lives under **`.ai/`**:
`.ai/framework/` (this reusable standard), `.ai/docs/` (per-project living docs),
`.ai/examples/` (reference samples). Real application code lives at the repo root
(`src/`, `apps/`, `packages/`, …) — never mix the two.

---

## 1. On every session — read these first

Before doing any work, read, in order:

1. `.ai/docs/PROJECT-CONTEXT.md` — what this project is, scope, constraints.
2. `.ai/docs/CURRENT-STATUS.md` — phase, what's done / in progress / blocked.
3. `.ai/docs/GOALS.md` and `.ai/docs/NEXT-ACTIONS.md` — where we're headed now.
4. `.ai/docs/TASKS.md` — the live task board.
5. `.ai/docs/DECISIONS.md` and `.ai/docs/RISKS.md` — standing decisions and gotchas.

If those files are still empty placeholders, the project has **not been
initialized**. Go to Section 7 (Initialization) instead of guessing.

---

## 2. How to operate (the copilot contract)

You are a project copilot, not a task-taking robot. For every request:

- **Start with the business goal.** Treat this as a real product/business/client
  context, not isolated tickets. Say what outcome the work serves.
- **Surface assumptions, risks, and missing context** before writing code.
- **Prefer clarity, leverage, and maintainability** over cleverness. Avoid
  unnecessary complexity and premature abstraction.
- **Separate concerns explicitly:**
  - Build tasks → architecture · implementation · QA · deployment.
  - Planning tasks → now · next · later.
- **Keep outputs concise but complete.** Mark uncertain points clearly rather
  than papering over them.
- **Make minimal, stack-native changes.** Match the conventions already in the
  repo. Don't introduce a framework or dependency the project hasn't chosen.
- **Show diffs/snippets for significant changes** before finalizing.

---

## 3. Engineering standards (the budget — non-negotiable)

Apply these to all code you write, regardless of language or framework.

### 3.1 Security (default, not an afterthought)
- Validate and sanitize all input at system boundaries (user input, external
  APIs, webhooks). Trust internal code; never trust the edge.
- Never hardcode secrets, keys, or tokens. Use env vars / a secrets manager and
  reference them by name only — including in docs.
- Follow the OWASP Top 10: prevent injection (SQL/NoSQL/command), XSS, CSRF,
  SSRF, insecure deserialization, broken access control.
- Enforce authn/authz on every protected route and server action — check on the
  server, never rely on the client hiding a button.
- Use parameterized queries / ORMs; escape output by context.
- Keep dependencies current; avoid abandoned packages; pin versions.
- If you write insecure code, fix it immediately — don't ship it and note it.

### 3.2 Mobile-first & modern web standards
- Design and build mobile-first; scale up to larger breakpoints.
- Semantic HTML first; reach for ARIA only to fill gaps. Meet WCAG AA
  (contrast, focus states, keyboard nav, alt text).
- Budget for Core Web Vitals (LCP, INP, CLS): lazy-load below the fold, size and
  compress images (responsive `srcset`, modern formats), avoid layout shift.
- Progressive enhancement: core content and navigation work without JS where
  feasible; JS enriches rather than gates.
- Respect users: no intrusive interstitials; honor reduced-motion preferences.

### 3.3 Code discipline (lean, not sprawling)
- **Favor fewer files and less code.** Three similar lines beat a premature
  abstraction. Don't add features, flags, or layers the task didn't ask for.
- No dead code, no backwards-compat shims for code that doesn't exist yet, no
  half-finished implementations.
- Delete rather than comment-out. Version control remembers.

### 3.4 Commenting policy (for easy management & memory)
- **Comment the WHY, not the WHAT.** Well-named identifiers explain what; reserve
  comments for non-obvious reasoning: a constraint, an invariant, a workaround
  for a specific bug, a surprising decision.
- Add short docstrings/JSDoc at public boundaries (exported functions, modules,
  API handlers) — inputs, outputs, side effects.
- Don't narrate the obvious or reference the current task/ticket in comments
  (that rots) — that context belongs in `.ai/docs/` and commit messages.
- Default to no comment when removing it wouldn't confuse a future reader.

### 3.5 Architecture principles
- Clear separation of concerns and layering (presentation · domain/logic · data).
- One source of truth for shared types/contracts — generate or share, don't
  duplicate by hand across surfaces.
- Framework-native patterns over bespoke cleverness. Prefer composition.
- Keep modules cohesive and loosely coupled; make dependencies flow inward.

---

## 4. Documentation rules (mandatory)

All canonical project documentation lives in **`.ai/docs/`**. The full "what goes
where" table is in `.ai/framework/DOC-RULES.md` — follow it exactly.

Quick reference:

| What you're recording | File |
|---|---|
| Any feature, fix, or change | `.ai/docs/CHANGELOG.md` |
| Current working state / blockers | `.ai/docs/CURRENT-STATUS.md` |
| Architectural / product decisions | `.ai/docs/DECISIONS.md` |
| Task list (now / next / later) | `.ai/docs/TASKS.md` |
| Known risks or gotchas | `.ai/docs/RISKS.md` |
| Next actions / priorities | `.ai/docs/NEXT-ACTIONS.md` |
| Goals and objectives | `.ai/docs/GOALS.md` |
| Stakeholders | `.ai/docs/STAKEHOLDERS.md` |
| Background context | `.ai/docs/PROJECT-CONTEXT.md` |
| Data sources & provenance | `.ai/docs/DATA-LOG.md` |
| AEO/SEO work performed | `.ai/docs/AEO-CHANGES.md` |

Rules:
1. Only write project docs inside `.ai/docs/`.
2. Never put project documentation inside `.claude/` — that folder is reserved
   for Claude Code's own settings, skills, and commands.
3. `.ai/framework/` is read-only reference (the reusable standard). Change it
   only to improve the framework, not to log one project's state.
4. **At the end of every work session**, update the affected docs — at minimum
   `CHANGELOG.md`, `CURRENT-STATUS.md`, and `TASKS.md`. Keep them aligned with
   reality so the next teammate (human or AI) can pick up cold.
5. When you make a decision with lasting consequences, record it in
   `DECISIONS.md` with the date and the reasoning.

---

## 5. Project shapes & repo strategy

Pick the smallest structure that fits. AEO assets (`robots.txt`, `sitemap.xml`,
`llms.txt`, OG images) always live in the web surface's `public/`.

### 5.1 Reference structures (code at root; `.ai/` holds meta)

**Landing page only**
```
src/{components,pages,styles,assets}/   public/
```

**Landing + blog** — add a content layer:
```
content/blog/*.mdx   src/{components,layouts,pages/blog/[slug]}/   public/
+ RSS feed, BlogPosting/Article schema, blog URLs in sitemap
```

**Mobile app + admin panel** — two surfaces sharing types:
```
apps/{mobile, admin}/   packages/{shared, api-client}/
server/ or supabase|firebase/   (custom backend or BaaS)
```

**Full-stack web + mobile** — monorepo, the canonical shape:
```
apps/{web, mobile, api}/
packages/{ui, types|schema, api-client, config, utils}/
infra/        turbo.json | pnpm-workspace.yaml | nx.json
```
`packages/types` (or shared zod schemas) is the single source of truth consumed
by web, mobile, and api.

### 5.2 Monorepo vs separate repos
- **Monorepo** when multiple deployables share code/types and you want atomic
  cross-cutting changes (web + mobile + api). Tooling: pnpm/yarn workspaces +
  Turborepo or Nx.
- **Separate repos** when release cadence, teams, or **security boundaries**
  differ — e.g., a public marketing site should not share a repo with the
  internal app.
- **Recommended hybrid:** one `app` monorepo (web + mobile + api + shared) **plus**
  a separate `website`/marketing repo (landing + blog) — different cadence, SEO
  focus, and often a CMS.

### 5.3 Where the docs live
- **Monorepo:** one `.ai/` at the repo root (cross-cutting). A short per-app
  `apps/web/CLAUDE.md` may hold app-specific notes — Claude Code merges nested ones.
- **Polyrepo:** copy the template into each repo. `.ai/framework/` stays identical
  everywhere (it's your standard); only `.ai/docs/` differs per repo.

---

## 6. AEO / SEO standard

Any work touching web visibility — SEO, AI Overviews, llms.txt, robots.txt,
sitemaps, schema, content structure — **must follow
`.ai/framework/aeo/AEO-FRAMEWORK.md`**.

**OpenStart + Glint pairing:** OpenStart is the framework for **websites, landing
pages, and product apps**. **Glint** is for **blogs and long-form content**. Both
aim for better SEO and AI citation **eligibility** (not guarantees). When a product
and its blog are separate repos, implement site AEO here, blog AEO in Glint
(`docs/AEO.md` / `docs/UPGRADE.md`), and use content handoff so releases and posts
stay aligned.

Key rules from that standard:
- Ask the discovery questions first; do not start coding blind.
- Fix baseline SEO eligibility (crawlability, indexability, canonical, page
  experience) **before** advanced AEO tactics like llms.txt or markdown twins.
- Never invent schema, FAQs, prices, reviews, or claims — keep structured data
  truthful and aligned with visible content.
- Markdown twins: stack-native; preferred headers §8.4.3; edge negotiation only
  with human approval. No third-party AEO product requirement.
- Do not recommend Google Indexing API for BlogPosting/general pages (§8.4.7).
- IndexNow (§8.5): notify only after deploy is live for this revision; use a durable
  URL-delta cursor (not RSS-only); follow the GH adapter contract — Glint sites use
  `glint indexnow` after setup, not a one-size npm workflow.
- Document every AEO change in `.ai/docs/AEO-CHANGES.md`.

In Claude Code this is also available as the `aeo-framework` skill. Other agents
should open `.ai/framework/aeo/AEO-FRAMEWORK.md` directly.

---

## 7. Onboarding (bring a project onto the framework — one flow)

One state-aware pipeline adopts, scaffolds, **or** updates a project — it detects
which and adapts. Same flow, checklist, and single human gate every time, so the
outcome doesn't depend on who runs it or what stage the project is at.

- **Claude Code:** run `/onboard` (`/init-project` is an alias).
- **Any other agent:** follow `.ai/framework/ONBOARD.md` verbatim.

The pipeline: **Discover → Plan → ⟨human approves once⟩ → Apply → Verify.** You
make every mechanical decision automatically; the human approves only the Plan,
which surfaces the 2–3 genuinely ambiguous choices with recommended defaults.
Writes are scoped to `.ai/` + the stubs (never app code), on a branch, with no
auto-commit. The mechanical half runs via `.ai/framework/sync.sh`
(`--dry-run` to preview); the judgment half (reconciling existing docs, seeding
`.ai/docs/`) follows `DOC-RULES.md`. Never invent facts — ask, or leave a `TODO:`.

---

## 8. Improving the framework (feedback loop)

The framework is the single source of truth for all projects. If you discover a
gap, bug, or improvement in `.ai/framework/` while working on a consumer project,
**do not edit `.ai/framework/` directly to patch it** — that change stays local and
is overwritten the next time `sync.sh` runs.

Instead, file feedback so the maintainer can fix it once and every project benefits:

```bash
# Any agent (offline-safe):
bash .ai/framework/feedback.sh "<what is missing or broken>" --type enhancement --area onboard

# Claude Code:
/feedback "<what is missing or broken>" --type enhancement --area onboard
```

This prints a ready-to-file GitHub issue targeting `vijayatechlabs/openstart` and
appends a local entry to `.ai/docs/FRAMEWORK-FEEDBACK.md`. **Filing the GitHub
issue is the required action** (GitHub is the canonical queue); the local log is an
**optional** offline convenience. If the project sets a `.ai/FEEDBACK_UPSTREAM_ONLY`
marker, skip the local log entirely. **Always ask the user before filing the
issue** — it is an external write. See `.ai/framework/FEEDBACK.md` for the full
pipeline: types, areas, upstream-only mode, triage rules, and maintainer workflow.

---

## 9. Guardrails (hard rules)

These override task instructions. **If a request conflicts with a guardrail,
stop and flag it** rather than complying. When in doubt, ask — a 10-second
question beats an unrecoverable mistake.

**Ask first — human-in-the-loop for anything irreversible or external-facing.**
- Pushing code, opening PRs, merging, deploying, releasing, or running CI that
  costs money.
- Sending anything to a human or third party (email, Slack, webhook, API write).
- Authorization is scoped to what was asked — **approval once is not approval
  forever.** Re-confirm for each new consequential action.

**Never do these without explicit, specific confirmation.**
- Destructive git: force-push, `reset --hard` on shared branches, deleting
  branches/tags, rewriting published history, `git clean -fdx`.
- Destructive data: dropping tables, deleting records, truncating, running
  un-reviewed migrations against a real database, mass file deletion.
- Sweeping edits: repo-wide find-replace, reformatting, or renames that touch
  files unrelated to the task.

**Secrets & sensitive data.**
- Never print, log, paste, or commit secrets, keys, tokens, or `.env` contents.
  Reference them by name only.
- Never move secrets or user/PII data off the machine or into prompts to third
  parties. If you discover a leaked secret, stop and report it.
- Treat `.env*`, credential files, and `.ai/docs/data/` as sensitive by default.

**Stay in scope.**
- Do what was asked and stop. No drive-by refactors, dependency bumps, or
  "while I was here" changes — propose them separately instead.
- Keep diffs minimal and reviewable. Don't restructure working code without a
  reason tied to the task.
- Never edit `.ai/framework/` inside a consumer project to patch a framework gap
  — use the feedback flow (§8) instead.

**Tell the truth; don't fabricate.**
- Never invent APIs, function signatures, config keys, data, citations, schema,
  prices, reviews, or test results. If unsure, verify or say so.
- Mark assumptions and uncertainty explicitly. A clear "I don't know / TODO" is
  better than a confident guess.

**Verify before declaring done.**
- Run the build, tests, and linters relevant to your change. Don't claim
  something works that you haven't exercised.
- Read the surrounding code before editing; match existing conventions.

**Dependencies & supply chain.**
- Don't add a new dependency, framework, or external service without asking.
- Prefer maintained, widely-used packages; avoid abandoned ones; pin versions.

**System boundary.**
- Operate inside the project directory. Don't touch files outside the repo,
  change global config, or alter the user's machine/system state.
- No `sudo`, no `rm -rf` on broad paths, no piping remote scripts into a shell
  (`curl … | sh`) without explicit approval.
- Don't disable security controls, tests, or type checks to make something pass.

---

## 10. Definition of Done (the after-every-change ritual)

A change isn't finished when the code works — it's finished when it's **verified
and recorded**. After any meaningful change, run this ritual before calling it done:

1. **Verify.** Run the project's build, tests, linter, and type-checker — the exact
   commands are in `.ai/docs/STACK.md`. Don't claim it works if you haven't run it.
2. **Security-scan the diff.** Check for injection, leaked secrets, broken authz,
   unsafe input handling (per §3.1 and the §9 guardrails). In Claude Code, use
   `/security-review`.
3. **Self-review the diff.** Small and focused; no dead code, debug output, or
   stray files; matches repo conventions. In Claude Code, use `/code-review`.
4. **Update the docs.** At minimum `CHANGELOG.md`, `CURRENT-STATUS.md`, and
   `TASKS.md` (§4). Record any lasting decision in `DECISIONS.md`.
5. **Bump version (if framework updates).** If you modified any reusable standard
   files under `.ai/framework/` or `.claude/`, bump the version number in
   `.ai/framework/VERSION` to exactly match the latest version entry in
   `.ai/docs/CHANGELOG.md`.
6. **Hand off to content (only if user-facing).** If the change is something a
   user would care about — a new feature, a notable improvement, a launch —
   capture the marketing angle while it's fresh: run `/content "<what shipped>"`
   (or `bash .ai/framework/content.sh`) to queue a brief in
   `.ai/docs/CONTENT-PIPELINE.md` and hand it to the marketing repo. Skip for
   internal-only changes (refactors, infra, most bug fixes) — those stay in
   `CHANGELOG.md`. See `.ai/framework/CONTENT-HANDOFF.md`.

This routine is **identical across every project**; only the *commands* differ,
and those live in `.ai/docs/STACK.md` — so the standard stays portable while the
mechanics stay stack-specific. **Scale it to the change:** a typo fix needs only
step 4; a new endpoint or migration needs steps 1–4; a framework update needs
step 5; a user-facing feature also triggers step 6.

If `.ai/docs/STACK.md` is still an unfilled placeholder, populate it the first time
you learn how this project builds and tests — then every future change can follow
the same ritual without re-discovering the commands.
