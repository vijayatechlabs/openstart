#!/usr/bin/env bash
#
# OpenStart framework installer / updater — the mechanical half of `/onboard`.
# Brings the reusable framework into THIS project (cwd), safely, on any project
# at any stage. It only edits the working tree; it never commits — review the
# git diff and commit yourself.
#
#   bash .ai/framework/sync.sh                 # update an onboarded project
#   bash .ai/framework/sync.sh --dry-run       # preview actions, write nothing
#   FRAMEWORK_REF=v1.0.0 bash .ai/framework/sync.sh   # pin to a release
#
# Brownfield bootstrap (project has no .ai/framework yet):
#   git clone --depth 1 https://github.com/vijayatechlabs/openstart.git /tmp/os
#   cd /path/to/your/project
#   bash /tmp/os/.ai/framework/sync.sh --dry-run   # then run without --dry-run
#
# WHY two file classes:
#   - Framework-owned (.ai/framework, .claude/commands|skills, agent stubs) are
#     the standard → overwritten/updated.
#   - Project-owned (.ai/docs/*, your code) → created only if missing, never
#     clobbered. A root stub with real custom content is preserved, not replaced.
#
set -euo pipefail

REPO="${FRAMEWORK_REPO:-https://github.com/vijayatechlabs/openstart.git}"
REF="${FRAMEWORK_REF:-main}"
DRY=0
STUB_MARKER=".ai/framework/AGENT-GUIDE.md"   # present in every OpenStart stub

for arg in "$@"; do
  case "$arg" in
    --dry-run|--plan) DRY=1 ;;
    -h|--help) sed -n '2,30p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "Unknown option: $arg (use --dry-run)"; exit 2 ;;
  esac
done

say()  { printf '%s\n' "$*"; }
act()  { # act <TAG> <path> <reason>
  printf '  %-9s %-34s %s\n' "$1" "$2" "${3:-}"
}

# ---- Detect project state (informational; file rules are identical) ----------
if [ -d ".ai/framework" ]; then
  STATE="update"
elif [ -e package.json ] || [ -e pyproject.toml ] || [ -d src ] || \
     [ -n "$(ls -A 2>/dev/null | grep -vE '^(\.git|\.DS_Store)$' || true)" ]; then
  STATE="adopt (brownfield)"
else
  STATE="scaffold (greenfield)"
fi

# ---- Safety net: everything is recoverable only if it's in git ---------------
if git rev-parse --git-dir >/dev/null 2>&1; then
  if [ -n "$(git status --porcelain 2>/dev/null || true)" ]; then
    say "⚠  Working tree is dirty. Recommended: commit/stash first so this run is"
    say "   easy to review and revert. Continuing (git is your undo)."
  fi
else
  say "⚠  Not a git repository — there is no safety net. Commit/back up before applying."
fi

# ---- Fetch the framework at REF into a temp dir ------------------------------
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT
say "→ Fetching $REPO ($REF)…"
git clone --depth 1 --branch "$REF" "$REPO" "$tmp" >/dev/null 2>&1 \
  || { git clone --depth 1 "$REPO" "$tmp" >/dev/null 2>&1 && git -C "$tmp" checkout "$REF" >/dev/null 2>&1; } \
  || { say "✗ Could not fetch $REPO at $REF"; exit 1; }

old="$(cat .ai/framework/VERSION 2>/dev/null || echo none)"
new="$(cat "$tmp/.ai/framework/VERSION" 2>/dev/null || echo unknown)"

say ""
say "Mode: $STATE     Framework: $old → $new     $([ $DRY -eq 1 ] && echo '(DRY-RUN — no writes)')"
say ""

# ---- 1. Framework-owned: mirror (overwrite) ----------------------------------
say "Framework-owned (overwrite):"
act MIRROR ".ai/framework/" "exact mirror of the standard"
act UPDATE ".claude/commands/" "additive (keeps your own)"
act UPDATE ".claude/skills/" "additive (keeps your own)"
if [ $DRY -eq 1 ]; then
  rsync -a --delete -ni "$tmp/.ai/framework/" ".ai/framework/" 2>/dev/null | sed 's/^/      /' || true
else
  mkdir -p .ai/framework .claude/commands .claude/skills
  rsync -a --delete "$tmp/.ai/framework/" ".ai/framework/"
  rsync -a "$tmp/.claude/commands/" ".claude/commands/"
  rsync -a "$tmp/.claude/skills/"   ".claude/skills/"
fi

# ---- 2. Project-owned docs: fill-if-missing ----------------------------------
say ""
say "Project docs (.ai/docs/ — created only if missing):"
while IFS= read -r src; do
  rel="${src#"$tmp"/}"
  if [ -e "$rel" ]; then
    act SKIP "$rel" "exists — left as-is"
  else
    act CREATE "$rel" "template seeded"
    if [ $DRY -eq 0 ]; then mkdir -p "$(dirname "$rel")"; cp "$src" "$rel"; fi
  fi
done < <(find "$tmp/.ai/docs" -type f 2>/dev/null)

# ---- 3. Agent stubs: never clobber real custom content -----------------------
say ""
say "Agent stubs (root):"
for s in CLAUDE AGENTS GEMINI; do
  src="$tmp/$s.md"; dest="$s.md"
  [ -e "$src" ] || continue
  if [ ! -e "$dest" ]; then
    act CREATE "$dest" "redirect stub"
    [ $DRY -eq 0 ] && cp "$src" "$dest"
  elif grep -q "$STUB_MARKER" "$dest" 2>/dev/null; then
    act UPDATE "$dest" "already an OpenStart stub"
    [ $DRY -eq 0 ] && cp "$src" "$dest"
  else
    act CONFLICT "$dest" "has custom content → NOT overwritten"
    [ $DRY -eq 0 ] && cp "$src" "$dest.openstart"
    CONFLICTS=1
  fi
done

# ---- Summary -----------------------------------------------------------------
say ""
if [ $DRY -eq 1 ]; then
  say "Dry-run complete. Re-run without --dry-run to apply."
else
  say "✓ Applied. Framework $old → $new"
  say "  Untouched: .ai/docs/ existing files · .ai/examples/ · .claude/settings*.json · your code"
  say "  Tip: found a gap in the framework? Run /feedback (Claude Code) or"
  say "       bash .ai/framework/feedback.sh \"…\" to log it and get a ready-to-file issue."
  if [ "${CONFLICTS:-0}" = "1" ]; then
    say ""
    say "⚠  RECONCILE: a stub with custom content was kept. Its OpenStart version is"
    say "   saved alongside as *.openstart. Fold the custom instructions into"
    say "   .ai/docs/PROJECT-CONTEXT.md, then replace the stub. (/onboard does this.)"
  fi
  say ""
  say "  Next: review 'git diff', then commit."
fi
