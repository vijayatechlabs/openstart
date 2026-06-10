#!/usr/bin/env bash
#
# OpenStart content handoff — turn a shipped, user-facing feature into a queued
# blog/PR content brief. The twin of feedback.sh: feedback flows IN to the
# framework; product news flows OUT to the marketing repo.
#
# When a user-facing feature ships, run this to:
#   1. append a brief to .ai/docs/CONTENT-PIPELINE.md (local record, offline-safe), and
#   2. print a ready-to-file GitHub issue (+ a `gh` one-liner) for the MARKETING repo,
#      where a content agent turns it into a post following the AEO framework.
#
# Usage:
#   bash .ai/framework/content.sh "<what shipped>" [--audience "<who>"] [--angle "<hook>"] [--keyword "<seo term>"]
#   bash .ai/framework/content.sh --help
#
# Options:
#   --audience  who the post is for (e.g. "fleet managers")
#   --angle     the hook / why it matters to them
#   --keyword   target search keyword for AEO/SEO
#   --dir       project root directory (default: cwd)
#
# Content target — where briefs go. Set it ONCE (committed, so every agent and
# teammate inherits it) in .ai/docs/CONTENT-PIPELINE.md via ONE of:
#   • Local  mode:  **Content path:** ../your-blog    → writes <path>/CONTENT-INBOX.md
#   • GitHub mode:  **Content repo:** owner/blog-repo  → prints a `gh issue create` line
# For a one-off, the CONTENT_DIR / CONTENT_REPO env vars override the doc line.
# Pairs an OpenStart app/site with its blog (e.g. a Glint blog: naam → naam-blog).
#
set -euo pipefail

for arg in "$@"; do
  case "$arg" in
    -h|--help) awk '/^set -euo pipefail/{exit} /^# /{sub(/^# ?/,""); print}' "$0"; exit 0 ;;
  esac
done

say() { printf '%s\n' "$*"; }

# ---- Parse args ---------------------------------------------------------------
message=""
audience="general"
angle=""
keyword=""
dir="$(pwd)"

i=1
while [ $i -le $# ]; do
  arg="${!i}"
  case "$arg" in
    --audience) i=$((i+1)); audience="${!i}" ;;
    --angle)    i=$((i+1)); angle="${!i}" ;;
    --keyword)  i=$((i+1)); keyword="${!i}" ;;
    --dir)      i=$((i+1)); dir="${!i}" ;;
    --*)        say "Unknown option: $arg"; exit 2 ;;
    *)          message="${message:+$message }$arg" ;;
  esac
  i=$((i+1))
done

if [ -z "$message" ]; then
  say 'Usage: bash .ai/framework/content.sh "<what shipped>" [--audience "<who>"] [--angle "<hook>"] [--keyword "<seo term>"]'
  exit 1
fi

log="$dir/.ai/docs/CONTENT-PIPELINE.md"

# ---- Resolve content target (GitHub repo and/or local path) -------------------
repo="${CONTENT_REPO:-}"
tdir="${CONTENT_DIR:-}"
if [ -f "$log" ]; then
  if [ -z "$repo" ]; then
    repo="$(grep -m1 -E '\*\*(Content|Marketing) repo:\*\*' "$log" 2>/dev/null | sed -E 's/.*\*\*(Content|Marketing) repo:\*\*[[:space:]]*//; s/[[:space:]]*$//' || true)"
  fi
  if [ -z "$tdir" ]; then
    tdir="$(grep -m1 '\*\*Content path:\*\*' "$log" 2>/dev/null | sed 's/.*\*\*Content path:\*\*[[:space:]]*//; s/[[:space:]]*$//' || true)"
  fi
fi
# Treat unfilled placeholders as unset.
case "$repo" in TODO*|*" "*|"") repo="" ;; */*) : ;; *) repo="" ;; esac
case "$tdir" in TODO*|"") tdir="" ;; esac
# Expand a leading ~ in the local path.
case "$tdir" in "~"/*) tdir="$HOME/${tdir#"~"/}" ;; esac

# ---- Detect project name (same approach as feedback.sh) -----------------------
project="unknown"
if [ -f "$dir/package.json" ]; then
  name="$(grep -m1 '"name"' "$dir/package.json" 2>/dev/null | sed 's/.*"name"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/' || true)"
  [ -n "$name" ] && project="$name"
elif [ -f "$dir/pyproject.toml" ]; then
  name="$(grep -m1 '^name' "$dir/pyproject.toml" 2>/dev/null | sed 's/name[[:space:]]*=[[:space:]]*"\([^"]*\)".*/\1/' || true)"
  [ -n "$name" ] && project="$name"
fi
if [ "$project" = "unknown" ]; then
  remote="$(git remote get-url origin 2>/dev/null || true)"
  if [ -n "$remote" ]; then project="$(basename "$remote" .git)"; else project="$(basename "$(cd "$dir" && pwd)")"; fi
fi

date="$(date +%Y-%m-%d)"
short="${message:0:70}"
[ "${#message}" -gt 70 ] && short="${short}…"

# ---- 1. Append to local pipeline ----------------------------------------------
if [ ! -f "$log" ]; then
  mkdir -p "$dir/.ai/docs"
  printf '# Content pipeline (from %s)\n\nBriefs sourced from shipped, user-facing features. The blog/content project\nturns these into posts following the AEO framework.\nStatus flow: idea → drafted → published.\n\n<!-- Link this app to its blog/content project — set ONE: -->\n**Content repo:** %s\n**Content path:** %s\n' \
    "$project" "${repo:-TODO: owner/blog-repo}" "${tdir:-TODO: ../your-blog}" > "$log"
fi

printf '\n## [%s] %s\n- **Feature:** %s\n- **Audience:** %s\n- **Angle:** %s\n- **Keyword:** %s\n- **Source:** %s\n- **Status:** idea\n' \
  "$date" "$short" "$message" "$audience" "${angle:-TODO}" "${keyword:-TODO}" "$project" >> "$log"

# ---- 2. Print the issue -------------------------------------------------------
title="[content] $short"
body="**Feature:** ${message}
**Audience:** ${audience}
**Angle:** ${angle:-_(fill in the hook)_}
**Target keyword:** ${keyword:-_(pick one)_}
**Source project:** ${project}

Draft the post following \`.ai/framework/aeo/AEO-FRAMEWORK.md\` (or the aeo-framework skill). Keep every claim truthful to what actually shipped."

say ""
say "✓ logged to $log"

# ---- 2a. Local mode: hand the brief to a sibling blog/content project ---------
if [ -n "$tdir" ]; then
  if [ -d "$tdir" ]; then
    inbox="$tdir/CONTENT-INBOX.md"
    if [ ! -f "$inbox" ]; then
      printf '# Content inbox\n\nBriefs handed over from product/app projects. Turn each into a post.\nStatus flow: new → drafted → published.\n' > "$inbox"
    fi
    printf '\n## [%s] %s\n- **Feature:** %s\n- **Audience:** %s\n- **Angle:** %s\n- **Keyword:** %s\n- **Source:** %s\n- **Status:** new\n' \
      "$date" "$short" "$message" "$audience" "${angle:-TODO}" "${keyword:-TODO}" "$project" >> "$inbox"
    say "✓ handed to $inbox"
  else
    say "⚠  Content path not found: $tdir"
    say "   Clone the blog project there first, or fix CONTENT_DIR / the '**Content path:**' line."
  fi
fi

# ---- 2b. Print the brief (and a gh one-liner in GitHub mode) ------------------
say ""
say "Title: $title"
say ""
say "$body"
say ""
if [ -n "$repo" ]; then
  title_esc="$(printf '%s' "$title" | sed 's/"/\\"/g')"
  body_esc="$(printf '%s' "$body" | sed 's/"/\\"/g')"
  say "File on the content queue → https://github.com/${repo}/issues/new"
  say ""
  say "Or with gh:"
  say "  gh issue create -R ${repo} \\"
  say "    -t \"${title_esc}\" \\"
  say "    -l \"content\" \\"
  say "    -b \"${body_esc}\""
  say ""
elif [ -z "$tdir" ]; then
  say "No content target set. Link this app to its blog in"
  say "  $log — fill ONE line:"
  say "  • **Content path:** ../your-blog      (Local  — writes <path>/CONTENT-INBOX.md)"
  say "  • **Content repo:** owner/blog-repo    (GitHub — files a brief as an issue)"
  say "  (or set CONTENT_DIR / CONTENT_REPO for a one-off override)"
  say ""
fi
