# OpenStart Content Handoff (ship → blog)

How shipped, user-facing features become blog / PR content **without losing the
marketing angle**. The twin of the feedback pipeline: feedback flows *in* to the
framework; product news flows *out* to the marketing repo.

When an agent ships a feature it has the most context it will ever have about
what changed and why it matters. That is the moment to capture the angle — not
weeks later when the marketing team asks "what shipped recently?".

## The rule

> When a change is **user-facing or marketable**, log a content brief as part of
> the Definition of Done (`AGENT-GUIDE.md §10`). Internal-only changes (refactors,
> infra, most bug fixes) are skipped — they belong in `CHANGELOG.md` only.

`CHANGELOG.md` records the **fact**; the content pipeline records the **story**.
A change can warrant one, the other, or both.

## The loop

```
  APP / SITE REPO (OpenStart) ships a user-facing feature
        │
        │  bash .ai/framework/content.sh "…" --audience "…" --angle "…" --keyword "…"
        │  (Claude Code: /content "…")
        ▼
  .ai/docs/CONTENT-PIPELINE.md (local record)  +  the brief, delivered one of two ways:
        │
        ├─ LOCAL mode  → appended to  <blog>/CONTENT-INBOX.md   (sibling folder on disk)
        └─ GITHUB mode → a `content`-labeled issue on  github.com/<blog-repo>/issues
        ▼
  BLOG / CONTENT REPO (e.g. a Glint blog) — agent or human drafts the post
  following the AEO framework
        │
        ▼
  Published blog post / release note / announcement
```

OpenStart runs the **app/site**; a companion project — often a **Glint** blog —
runs the **content** (e.g. `naam` → `naam-blog`, `vijayatech-marketing` →
`vijayatech-blog`). This handoff keeps the blog in sync with what the app ships.

## What counts as a brief-worthy change

| Log a brief | Skip |
|---|---|
| New feature or capability | Internal refactor |
| Notable UX / performance improvement users feel | Infra / CI / build tooling |
| New integration or partnership | Dependency bumps |
| Launch, milestone, pricing/plan change | Most bug fixes (unless painful/public) |

## Capturing a brief (from the product repo)

```bash
bash .ai/framework/content.sh "Bulk CSV import for vehicle listings" \
  --audience "fleet managers" \
  --angle "list 500 cars in one upload instead of one-by-one" \
  --keyword "bulk vehicle listing upload"

# Claude Code:
/content "Bulk CSV import for vehicle listings" --audience "fleet managers"
```

This appends a brief to `.ai/docs/CONTENT-PIPELINE.md` (local, offline-safe) **and**
delivers it to the blog — locally or via GitHub (see below). The brief is a seed,
not a finished post; the blog's content agent writes the real thing.

## Linking the app to its blog (set it once, in the docs)

Each brief needs a destination: the blog/content project. **Configure it once in
`.ai/docs/CONTENT-PIPELINE.md`** by filling ONE line in the header. That line is
committed with the app, so every agent and teammate inherits the link — no shell
setup, nothing to remember per session.

| Mode | Fill this line in `CONTENT-PIPELINE.md` | Effect |
|---|---|---|
| **Local** (blog folder on disk) | `**Content path:** ../naam-blog` | Appends the brief to `<blog>/CONTENT-INBOX.md` |
| **GitHub** (blog is a remote repo) | `**Content repo:** owner/naam-blog` | Prints a `gh issue create` one-liner (filed on confirm) |

You only need **one**. Leave the other as its `TODO:` placeholder — placeholders are
ignored. If neither is set, the brief is still logged locally and printed for manual
use. (Filling both is allowed if you want the brief in the local inbox *and* as a
GitHub issue.)

> **Why a committed line, not `export`?** A shell `export` is transient — it dies
> with the session and no teammate or fresh agent sees it. The committed line is the
> source of truth. The `CONTENT_DIR` / `CONTENT_REPO` env vars still work and
> **override** the doc line, but treat those as a one-off escape hatch (a quick test,
> CI), not the normal way to configure the project.

### Choosing a mode

- **Local** when the blog is cloned next to the app and the same person/agent works
  across both — fastest, offline, no `gh` needed. You commit & push the blog repo
  yourself afterward.
- **GitHub** when the blog is a separate repo owned by a content team, or you don't
  keep it checked out — the brief lands as a triageable issue in their backlog.

### Scenario A — the blog is already a local folder

```
# app and blog as siblings:
#   parent/
#   ├── naam/        ← OpenStart app
#   └── naam-blog/   ← Glint blog
```
In `naam/.ai/docs/CONTENT-PIPELINE.md`, set:
```
**Content path:** ../naam-blog
```
Then `bash .ai/framework/content.sh "…"` writes `../naam-blog/CONTENT-INBOX.md`.

### Scenario B — the blog lives on GitHub

**Option 1 — clone it once, then use Local mode** (recommended if you'll work in it):
```bash
git clone https://github.com/vijayatechlabs/naam-blog.git ../naam-blog
```
…then set `**Content path:** ../naam-blog` in `CONTENT-PIPELINE.md` (as in Scenario A).

**Option 2 — never clone it; file straight to its GitHub backlog:**
```bash
gh auth login                            # one-time; needs write access to the blog repo
```
…then set `**Content repo:** vijayatechlabs/naam-blog` in `CONTENT-PIPELINE.md`.
`content.sh` prints a `gh issue create` line; run it (on confirm) to file the brief.

## Setting up the blog (receiving) side

- **GitHub mode:** copy `.ai/framework/templates/content-brief.yml` into the blog
  repo as `.github/ISSUE_TEMPLATE/content-brief.yml` and add a `content` label, so
  incoming briefs arrive structured.
- **Local mode:** nothing to install — `content.sh` creates `CONTENT-INBOX.md` on
  first use. The blog agent reads it and drafts posts.
- **Either way**, writing posts follows `.ai/framework/aeo/AEO-FRAMEWORK.md` (or the
  `aeo-framework` skill) — discovery first, baseline SEO before advanced tactics,
  never invent claims. If the blog runs on **Glint**, the brief becomes a post
  through Glint's normal authoring flow.

## Roles

| Who | Does | Never |
|---|---|---|
| **App/site repo** (OpenStart) | ships features, runs `content.sh` to queue briefs | write final marketing copy inline |
| **Blog/content repo** (e.g. Glint) | turns briefs into posts via AEO | invent features that didn't ship |

## Why a queue, not auto-publish

Decouple engineering cadence from publishing cadence. Auto-generating a post on
every ship fills the blog with robotic "we changed X" noise. A queued brief lets
a content agent batch, prioritise, and shape real stories — while the angle is
still captured at the moment it was freshest.
