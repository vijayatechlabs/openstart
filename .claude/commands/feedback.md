---
description: Record a framework improvement and prepare a GitHub issue for vijayatechlabs/openstart
---

You are running the **OpenStart feedback flow** for the current project.

**Follow `.ai/framework/FEEDBACK.md` exactly.** It is the canonical description of
the feedback pipeline.

## Steps

1. **Run the capture script** with the user's message, type, and area:
   ```bash
   bash .ai/framework/feedback.sh "<message>" [--type enhancement] [--area onboard]
   ```
   Pass any `--type` or `--area` flags the user provided. If not provided, omit
   them (the script defaults to `enhancement` / `general`).

2. **Show the output** — the local log path and the full issue text — so the user
   can review both before anything goes to GitHub.

3. **Ask for confirmation before filing.** Do NOT run `gh issue create`
   automatically. External writes require explicit user confirmation (see
   `AGENT-GUIDE.md §9` guardrails). Ask:
   > "Shall I file this as a GitHub issue on `vijayatechlabs/openstart`?"

4. **If confirmed**, run the `gh issue create` one-liner that `feedback.sh` printed
   and report the returned issue URL.

## Non-negotiable rules

- Never edit `.ai/framework/` files to patch a framework gap — file feedback instead.
- The local log (`.ai/docs/FRAMEWORK-FEEDBACK.md`) is always written first; GitHub
  filing is secondary and requires confirmation.
- If `feedback.sh` exits non-zero (empty message, missing file), report the error
  and ask the user to supply the missing information.
