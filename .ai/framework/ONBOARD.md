# ONBOARD — Adopt or update OpenStart in any project

> The single, state-aware flow for bringing a project onto the framework.
> Same flow, checklist, and gate regardless of who runs it or what stage the
> project is at. In Claude Code this is the `/onboard` command; other agents
> (Gemini/AntiGravity, Codex) follow this file directly.

**Run this as a pipeline with exactly one human gate:**

```
Discover → Plan → ⟨HUMAN APPROVES⟩ → Apply → Verify
```

You make all mechanical decisions automatically. The human approves **once** —
the plan, before anything is written. Surface only genuinely ambiguous choices,
each with a recommended default.

## Hard rules for this flow (non-negotiable)
- **Writes are scoped to `.ai/`, `.claude/commands`, `.claude/skills`, and the
  root agent stubs. Never touch application code (`src/`, `apps/`, …).**
- **Work on a branch** (`chore/onboard-openstart`). **Do not commit or push** —
  leave a clean branch + diff for the human (per AGENT-GUIDE §8).
- **Never invent facts.** Unknown → a clearly marked `TODO:`.
- The script does the mechanics; you do the judgment. Don't hand-copy files.

---

## Phase 0 · Preflight (automatic)
1. Confirm this is a git repo; if the tree is dirty, tell the user and suggest
   committing first (the script also warns).
2. Create/switch to branch `chore/onboard-openstart`.
3. Note the pinned framework ref (default: latest release tag).

## Phase 1 · Discover (automatic, READ-ONLY)
Build a **Project Profile** — never write in this phase:
- Languages, package manager, frameworks, runtime.
- Build / dev / test / lint / typecheck / format / security commands (read
  `package.json`, `pyproject.toml`, `Makefile`, CI configs, lockfiles).
- App structure and **project shape** (landing / blog / app / monorepo — see
  AGENT-GUIDE §5).
- Existing meta: `CLAUDE.md`/`AGENTS.md`/`GEMINI.md`, `README`, any docs folders,
  an existing `.ai/`.
- Web surface present? → AEO applies (AGENT-GUIDE §6).
- Sensitive surfaces (auth, payments, PII) — record **names only**, never values.
- Detected state: `scaffold` (empty) · `adopt` (brownfield) · `update` (already
  has `.ai/framework`).

## Phase 2 · Plan → THE ONE HUMAN GATE
Preview the mechanics, then present a single **Onboarding Plan** and stop:
```
bash .ai/framework/sync.sh --dry-run     # or the bootstrap path for brownfield
```
The plan must contain:
1. **Project Profile** (what you found).
2. **Detected state** + framework version (`old → new`).
3. **File-action table** from the dry-run: `MIRROR`/`UPDATE` (framework-owned),
   `CREATE`/`SKIP` (docs, fill-if-missing), `CONFLICT` (a stub with custom
   content — will be preserved).
4. **Content reconciliation map**: which existing content (README, old CLAUDE.md,
   stray docs) maps into which `.ai/docs/*` file.
5. **The 2–3 ambiguous decisions**, each with a recommended default, e.g.:
   - Monorepo layout vs single app?
   - Project shape (landing / blog / app / monorepo)?
   - Is AEO/SEO in scope?
6. **"Won't touch"** statement: no app code; scoped to `.ai/` + stubs.

→ **Wait for explicit approval.** The user tweaks only the flagged decisions.

## Phase 3 · Apply (only after approval)
1. **Mechanics** — run the installer (drops `--dry-run`):
   ```
   bash .ai/framework/sync.sh
   ```
   It overwrites framework-owned files, seeds missing docs, and preserves any
   real stub (saving the OpenStart version as `*.openstart`).
2. **Reconcile (judgment)** — per `DOC-RULES.md`:
   - Fold existing `README`/`CLAUDE.md` content into `.ai/docs/PROJECT-CONTEXT.md`
     (and other docs by topic). Replace a preserved root stub with the redirect
     stub once its custom instructions are safely moved.
   - Populate `.ai/docs/STACK.md` from the discovered commands.
   - Fill `PROJECT-CONTEXT`, `CURRENT-STATUS`, `GOALS`, `TASKS`, `STAKEHOLDERS`
     from what Discover found; `TODO:` anything unknown.
   - Seed `.ai/docs/CHANGELOG.md` with a dated "Onboarded to OpenStart vX" entry.
3. Apply the approved decisions from the Plan (e.g. chosen project shape).

## Phase 4 · Verify (automatic)
Run the Definition of Done (AGENT-GUIDE §9) against the change:
- `git diff --name-only` shows **only** `.ai/`, `.claude/`, and stubs changed —
  no app code. If not, stop and report.
- `.ai/docs/STACK.md` commands resolve; doc cross-links resolve.
- Print a summary: what changed, the reconciliation done, and **every remaining
  `TODO:`** the human must resolve.
- Leave the branch ready. **Do not commit/push** — tell the user to review
  `git diff` and open a PR / commit.

---

## Bootstrapping a brownfield project (no `.ai/framework` yet)
The installer lives in the framework, so fetch it first, then run it against the
project's working directory:
```
git clone --depth 1 https://github.com/vijayatechlabs/openstart.git /tmp/openstart
cd /path/to/your/project
bash /tmp/openstart/.ai/framework/sync.sh --dry-run   # Phase 2 preview
bash /tmp/openstart/.ai/framework/sync.sh             # Phase 3 mechanics
```
Pin a release with `FRAMEWORK_REF=v1.0.0`. Updates later are just
`bash .ai/framework/sync.sh` from the project root.
