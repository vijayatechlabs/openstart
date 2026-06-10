---
description: Turn a shipped user-facing feature into a queued blog/PR content brief for the linked blog/content project
---

You are running the **OpenStart content handoff** for the current project.

**Follow `.ai/framework/CONTENT-HANDOFF.md` exactly.** It is the canonical
description of the ship → blog pipeline.

## When to run

Only for **user-facing / marketable** changes — a new feature, a notable
improvement, a launch. Skip internal refactors, infra, and most bug fixes (those
go in `CHANGELOG.md` only). This is step 5 of the Definition of Done
(`AGENT-GUIDE.md §10`).

## Steps

1. **Run the capture script** with what shipped and any angle the user gave:
   ```bash
   bash .ai/framework/content.sh "<what shipped>" [--audience "<who>"] [--angle "<hook>"] [--keyword "<seo term>"]
   ```
   If the user didn't specify audience/angle/keyword, infer sensible values from
   the change and pass them — but never invent a feature that didn't ship.

2. **Show the output** — the local brief path, where it was delivered, and the brief
   text — so the user can review.

3. **Ask before any external write.** In **Local mode** the brief is just written to
   the blog's `CONTENT-INBOX.md` — no confirmation needed. In **GitHub mode**, do NOT
   run `gh issue create` automatically (external write, `AGENT-GUIDE.md §9`). Ask:
   > "Shall I file this brief as a `content` issue on `<blog-repo>`?"

4. **If confirmed (GitHub mode)**, run the `gh issue create` one-liner that
   `content.sh` printed and report the returned issue URL.

## Notes

- The blog target is configured **once in `.ai/docs/CONTENT-PIPELINE.md`**:
  `**Content path:** ../blog` (Local) or `**Content repo:** owner/blog` (GitHub).
  The `CONTENT_DIR` / `CONTENT_REPO` env vars override it for one-offs. If neither is
  set, tell the user how to set the line; the brief is still logged locally.
- The brief is a seed — the actual post is written in the blog/content project
  following the AEO framework.
