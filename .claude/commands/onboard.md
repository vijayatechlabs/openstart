---
description: Adopt or update the OpenStart framework in this project (discover → plan → review → apply)
---

You are running the **OpenStart onboarding flow** for the current project.

**Follow `.ai/framework/ONBOARD.md` exactly.** It is the canonical, state-aware
pipeline: `Discover → Plan → ⟨human approves⟩ → Apply → Verify`.

Non-negotiable for this run:
- Make all mechanical decisions yourself; ask the human **once** — to approve the
  Plan (Phase 2) — surfacing only the 2–3 genuinely ambiguous choices with a
  recommended default each.
- **Writes are scoped to `.ai/`, `.claude/commands`, `.claude/skills`, and the
  root agent stubs. Never touch application code.**
- Work on branch `chore/onboard-openstart`. **Do not commit or push** — leave a
  clean diff for the human to review.
- Never invent facts; mark unknowns as `TODO:`.
- Use `.ai/framework/sync.sh --dry-run` for the Phase 2 preview and
  `.ai/framework/sync.sh` for the Phase 3 mechanics — don't hand-copy files.

If `.ai/framework/` doesn't exist yet (brownfield), bootstrap per the
"Bootstrapping a brownfield project" section of `.ai/framework/ONBOARD.md`.

Start at Phase 0 now.
