# DOC-RULES — Where to Write What

Canonical project documentation lives **only** in `.ai/docs/`. This table is the
authority for which file each kind of information belongs in. When in doubt,
match the row, don't create a new file.

| What you want to record | File |
|---|---|
| New feature, fix, or change (with date) | `.ai/docs/CHANGELOG.md` |
| Current working state, phase, blockers | `.ai/docs/CURRENT-STATUS.md` |
| Architectural or product decisions (with rationale) | `.ai/docs/DECISIONS.md` |
| Task list (now / next / later / blocked) | `.ai/docs/TASKS.md` |
| Known risks, gotchas, hidden assumptions | `.ai/docs/RISKS.md` |
| Immediate next actions / priorities | `.ai/docs/NEXT-ACTIONS.md` |
| Goals, objectives, success criteria | `.ai/docs/GOALS.md` |
| People: roles, owners, contacts | `.ai/docs/STAKEHOLDERS.md` |
| Background, scope, constraints | `.ai/docs/PROJECT-CONTEXT.md` |
| Stack + build/test/lint/security commands | `.ai/docs/STACK.md` |
| Data sources, exports, provenance, sensitivity | `.ai/docs/DATA-LOG.md` |
| Actual data files / datasets / exports | `.ai/docs/data/` |
| AEO / SEO work performed | `.ai/docs/AEO-CHANGES.md` |
| Framework feedback (local log of gaps to file upstream) | `.ai/docs/FRAMEWORK-FEEDBACK.md` |
| Blog/PR content briefs from shipped user-facing features | `.ai/docs/CONTENT-PIPELINE.md` |

## Rules

1. **Only `.ai/docs/` holds project docs.** Don't scatter status/notes elsewhere.
2. **Never write project docs into `.claude/`.** That folder is reserved for
   Claude Code's settings, skills, and commands.
3. **`.ai/framework/` is read-only reference**, not a place to log project state. It
   holds the reusable standard (this template). Update it only to improve the
   framework itself, not to record a specific project's progress. If the framework
   itself is missing or broken, don't edit it here — run the feedback flow
   (`bash .ai/framework/feedback.sh "…"`) and file it upstream. See
   `.ai/framework/FEEDBACK.md`.
4. **Update docs at the end of every session.** Minimum: `CHANGELOG.md`,
   `CURRENT-STATUS.md`, `TASKS.md`.
5. **Decisions are append-only.** Don't rewrite history in `DECISIONS.md`; add a
   new dated entry that supersedes the old one.
6. **Dates are absolute.** Write `2026-05-30`, never "today" or "last week".
7. **Don't invent facts.** If you don't know, ask or leave a `TODO:` marker.

## CHANGELOG format

```
## [Unreleased]
### Added
- <thing> — 2026-05-30
### Changed
- <thing> — 2026-05-30
### Fixed
- <thing> — 2026-05-30
```

## DECISIONS format

```
## YYYY-MM-DD — <decision title>
**Decision:** <what was decided>
**Why:** <reasoning / constraints / alternatives rejected>
**Owner:** <who>
**Supersedes:** <prior decision, if any>
```
