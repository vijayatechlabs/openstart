# Content pipeline

Briefs sourced from shipped, user-facing features — the raw material for blog
posts, release notes, and PR / announcements. A content agent (in the marketing
repo) turns these into posts following the AEO framework.

Status flow: **idea → drafted → published.**

<!-- Link this app to its blog/content project — set ONE (leave the other as TODO):
     • Content repo  → GitHub mode: each brief becomes an issue via `gh`
     • Content path  → Local mode:  each brief is written to <path>/CONTENT-INBOX.md
     You can also set CONTENT_REPO / CONTENT_DIR as env vars instead. -->
**Content repo:** TODO: owner/blog-repo
**Content path:** TODO: ../your-blog

Run `bash .ai/framework/content.sh "<what shipped>"` (or `/content` in Claude Code)
when a user-facing feature ships. See `.ai/framework/CONTENT-HANDOFF.md` for the
full pipeline and what counts as brief-worthy.

---

<!-- Briefs are appended below by content.sh -->
