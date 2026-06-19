#!/usr/bin/env bash
#
# OpenStart feedback — the capture end of the framework feedback pipeline.
# Consumer projects never edit .ai/framework/ directly; they run this to
# record a structured note. It:
#   1. appends an entry to .ai/docs/FRAMEWORK-FEEDBACK.md (always works offline), and
#   2. prints a ready-to-file GitHub issue (+ a `gh` one-liner) for the framework repo.
# The maintainer triages the issues and improves .ai/framework/; projects pull
# the fix via sync.sh and every consumer benefits.
#
# Usage:
#   bash .ai/framework/feedback.sh "<what is missing or broken>" [--type enhancement] [--area onboard]
#   bash .ai/framework/feedback.sh --help
#
# Options:
#   --type   bug | enhancement | aeo | dx | docs  (default: enhancement)
#   --area   which part of the framework (e.g. onboard, sync, aeo, docs, agent-guide)
#   --dir    project root directory (default: cwd)
#
# Target repo (override with FEEDBACK_REPO env var):
#   vijayatechlabs/openstart
#
set -euo pipefail

REPO="${FEEDBACK_REPO:-vijayatechlabs/openstart}"
TYPES="bug enhancement aeo dx docs"

for arg in "$@"; do
  case "$arg" in
    -h|--help) awk '/^set -euo pipefail/{exit} /^# /{sub(/^# ?/,""); print}' "$0"; exit 0 ;;
  esac
done

say()  { printf '%s\n' "$*"; }

# ---- Parse args ---------------------------------------------------------------
message=""
type_val="enhancement"
area="general"
dir="$(pwd)"

i=1
while [ $i -le $# ]; do
  arg="${!i}"
  case "$arg" in
    --type)  i=$((i+1)); type_val="${!i}" ;;
    --area)  i=$((i+1)); area="${!i}" ;;
    --dir)   i=$((i+1)); dir="${!i}" ;;
    --*)     say "Unknown option: $arg"; exit 2 ;;
    *)       message="${message:+$message }$arg" ;;
  esac
  i=$((i+1))
done

if [ -z "$message" ]; then
  say 'Usage: bash .ai/framework/feedback.sh "<what is missing or broken>" [--type enhancement] [--area onboard]'
  say "  --type: $TYPES"
  exit 1
fi

# Validate type; fall back to enhancement if unknown
valid=0
for t in $TYPES; do [ "$t" = "$type_val" ] && valid=1 && break; done
[ $valid -eq 0 ] && type_val="enhancement"

# ---- Detect framework version -------------------------------------------------
version="unknown"
version_file=""
# Walk up from cwd looking for .ai/framework/VERSION
d="$dir"
for _ in 1 2 3 4 5 6 7 8; do
  if [ -f "$d/.ai/framework/VERSION" ]; then
    version_file="$d/.ai/framework/VERSION"
    break
  fi
  parent="$(dirname "$d")"
  [ "$parent" = "$d" ] && break
  d="$parent"
done

if [ -n "$version_file" ]; then
  ver="$(cat "$version_file" | tr -d '[:space:]')"
  sha="$(git rev-parse --short HEAD 2>/dev/null || true)"
  version="v${ver}${sha:+ ($sha)}"
fi

# ---- Detect project name -------------------------------------------------------
project="unknown"
if [ -f "$dir/package.json" ]; then
  # Extract "name" field without jq dependency
  name="$(grep -m1 '"name"' "$dir/package.json" 2>/dev/null | sed 's/.*"name"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/' || true)"
  [ -n "$name" ] && project="$name"
elif [ -f "$dir/pyproject.toml" ]; then
  name="$(grep -m1 '^name' "$dir/pyproject.toml" 2>/dev/null | sed 's/name[[:space:]]*=[[:space:]]*"\([^"]*\)".*/\1/' || true)"
  [ -n "$name" ] && project="$name"
fi
if [ "$project" = "unknown" ]; then
  # Fall back to git remote basename, then directory name
  remote="$(git remote get-url origin 2>/dev/null || true)"
  if [ -n "$remote" ]; then
    project="$(basename "$remote" .git)"
  else
    project="$(basename "$(cd "$dir" && pwd)")"
  fi
fi

# ---- Build the entry -----------------------------------------------------------
date="$(date +%Y-%m-%d)"
short="${message:0:70}"
[ "${#message}" -gt 70 ] && short="${short}…"

log="$dir/.ai/docs/FRAMEWORK-FEEDBACK.md"

# Projects that file directly upstream can opt out of the local log by creating
# an empty marker file: .ai/FEEDBACK_UPSTREAM_ONLY (GitHub is the canonical queue).
upstream_only=0
[ -f "$dir/.ai/FEEDBACK_UPSTREAM_ONLY" ] && upstream_only=1

# ---- 1. Append to local log (skipped in upstream-only mode) -------------------
if [ $upstream_only -eq 0 ]; then
  if [ ! -f "$log" ]; then
    mkdir -p "$dir/.ai/docs"
    printf '# OpenStart framework feedback (from %s)\n\nEntries to file as issues on %s.\n' \
      "$project" "$REPO" > "$log"
  fi

  printf '\n## [%s] %s: %s\n- **Project:** %s\n- **Framework:** %s\n- **Area:** %s\n- **Feedback:** %s\n- **Status:** open\n' \
    "$date" "$type_val" "$short" "$project" "$version" "$area" "$message" >> "$log"
fi

# ---- 2. Print the issue -------------------------------------------------------
title="[feedback] ${type_val}: ${short}"
body="**Project:** ${project}
**Framework version:** ${version}
**Area:** ${area}

**What's missing or broken**
${message}

**Proposed change**
_(maintainer to fill)_"

say ""
if [ $upstream_only -eq 0 ]; then
  say "✓ logged to $log"
else
  say "✓ upstream-only mode (.ai/FEEDBACK_UPSTREAM_ONLY) — local log skipped"
fi
say ""
say "File it on the framework queue → https://github.com/${REPO}/issues/new"
say ""
say "Title: $title"
say ""
say "$body"
say ""
# Produce a safe quoted one-liner using a heredoc-friendly approach
title_esc="$(printf '%s' "$title" | sed 's/"/\\"/g')"
body_esc="$(printf '%s' "$body" | sed 's/"/\\"/g')"
say "Or with gh:"
say "  gh issue create -R ${REPO} \\"
say "    -t \"${title_esc}\" \\"
say "    -l \"feedback,${type_val}\" \\"
say "    -b \"${body_esc}\""
say ""
