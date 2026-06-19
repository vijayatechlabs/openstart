# OpenStart Feedback Pipeline

How consumer projects improve the framework **without editing `.ai/framework/`
directly**. The framework is the single source of truth; many projects (run by
different agents and humans) consume it; feedback flows *in*, fixes flow *out*.

## The rule (non-negotiable)

> **Projects never modify `.ai/framework/` to patch a gap.** No hand-editing the
> reusable standard inside a consumer repo. If something is missing or broken,
> **file feedback** — the maintainer improves the framework.

This rule is stated in `AGENT-GUIDE.md §8` and `DOC-RULES.md Rule 3` so every
agent (Claude Code, Gemini/AntiGravity, Codex, Cursor) respects it automatically.

## The loop

```
  PROJECT (agent or human)
  hits a gap / bug / idea while using the framework
        │
        │  bash .ai/framework/feedback.sh "…" --type enhancement --area onboard
        │  (Claude Code: /feedback "…" --type enhancement --area onboard)
        ▼
  .ai/docs/FRAMEWORK-FEEDBACK.md (local log)  +  ready-to-file GitHub issue text
        │
        │  human or agent files the issue (confirm first — external write)
        ▼
  GitHub Issues — github.com/vijayatechlabs/openstart/issues   ← the queue
        │  (structured via the "OpenStart feedback" issue form)
        ▼
  MAINTAINER triages → branch → improve .ai/framework/ → PR → merge → tag
        │
        ▼
  PROJECTS pull the update  (bash .ai/framework/sync.sh)
```

## Capturing feedback (from a project)

```bash
# bash directly (any agent, offline-safe):
bash .ai/framework/feedback.sh "onboard should detect monorepos" --type enhancement --area onboard
bash .ai/framework/feedback.sh "AGENT-GUIDE missing auth pattern" --type docs --area agent-guide

# Claude Code:
/feedback "onboard should detect monorepos" --type enhancement --area onboard
```

This appends a structured entry to `.ai/docs/FRAMEWORK-FEEDBACK.md` **and** prints
a GitHub issue (title / body / labels) ready to paste at
`github.com/vijayatechlabs/openstart/issues/new`, or a `gh issue create` one-liner.

**The required action is filing the GitHub issue** — that is the canonical,
triageable queue. The local `FRAMEWORK-FEEDBACK.md` log is an **optional**
convenience for offline/draft capture; it is not a second system of record.

### Upstream-only mode (skip the local log)
Projects that always file directly to GitHub can opt out of the local log:

```bash
touch .ai/FEEDBACK_UPSTREAM_ONLY      # marker file
echo ".ai/docs/FRAMEWORK-FEEDBACK.md" >> .gitignore   # optional
```

With the marker present, `feedback.sh` skips the local append (and still prints the
issue text), and `sync.sh` will not re-seed `FRAMEWORK-FEEDBACK.md`. Record the
choice in `PROJECT-CONTEXT.md` so it survives onboarding.

## Fields

| Field | Values |
|---|---|
| `--type` | `bug` · `enhancement` · `aeo` · `dx` · `docs` (default: `enhancement`) |
| `--area` | `onboard` · `sync` · `aeo` · `agent-guide` · `doc-rules` · `general` (or any feature name) |
| `--dir` | project root (default: cwd) |

## Triage (maintainer)

- **Labels:** `feedback` + one of `bug` / `enhancement` / `aeo` / `dx` / `docs`.
- **Priority:** framework-correctness and AEO/SEO-affecting items over DX nice-to-haves.
- Implement on a branch → PR → merge to `main` → tag a version.
- Close the issue referencing the commit; projects pull on their own cadence.

## Roles

| Who | Does | Never |
|---|---|---|
| **Projects** (any consumer) | use the framework, run `feedback.sh` | edit `.ai/framework/` |
| **Maintainer** | triage issues, improve framework, release | hand-patch consumer repos |

## AI agent instructions

When a user asks you to submit feedback, report a bug, or request a feature for
the **OpenStart framework** itself:

1. Run `bash .ai/framework/feedback.sh "<message>" [--type …] [--area …]`
   (or `/feedback` in Claude Code) to get the issue text (and a local log entry
   unless the project is in upstream-only mode).
2. **Show the issue text to the user. Do not run `gh issue create` automatically.**
   Ask the user to confirm before filing — it is an external write (see
   `AGENT-GUIDE.md §9` guardrails).
3. If the user confirms, run the printed `gh issue create -R vijayatechlabs/openstart …`
   one-liner and report the returned issue URL. **Filing the issue is the required
   step; the local log is optional** — do not block on it, and skip it entirely when
   `.ai/FEEDBACK_UPSTREAM_ONLY` is present.

Override the target repo via `FEEDBACK_REPO=<owner/name>` env var if needed.

## Why not let projects patch the framework?

One framework, many consumers. If each project edits `.ai/framework/` locally, you
get N divergent standards and lose the "improve once, every project benefits"
property. Feedback-in / fixes-out keeps a single, improving source of truth.
