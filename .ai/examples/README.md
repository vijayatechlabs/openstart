# Examples

A worked sample of what `.ai/docs/` looks like **after** onboarding, so you can
see the target before running `/onboard`. Fictional project — illustration only.

---

## `PROJECT-CONTEXT.md` (filled)

> **What:** Acme Notes — a markdown note-taking web app with offline sync.
> **Problem:** existing note apps lock your data in proprietary formats.
> **In scope (now):** web app (editor, sync, search), public marketing page.
> **Not in scope:** mobile apps, team/collaboration features (later).
> **Constraints:** solo founder; ship MVP in 6 weeks; budget for one paid API.
> **Phase:** Build.

## `STACK.md` (filled)

> **Stack:** TypeScript · Astro (marketing) + React (app) · pnpm · Node 22 ·
> SQLite/Turso · deployed on Cloudflare.
>
> | Purpose | Command |
> |---|---|
> | Install | `pnpm install` |
> | Dev | `pnpm dev` |
> | Build | `pnpm build` |
> | Test | `pnpm test` |
> | Lint | `pnpm lint` |
> | Type-check | `pnpm typecheck` |

## `CURRENT-STATUS.md` (filled)

> **Phase:** Build · **Updated:** 2026-06-05
> **Done:** auth, editor, local persistence.
> **In progress:** Turso sync, conflict resolution.
> **Blocked:** none.

---

## `nextjs-seo.ts` (reference code)

Copy-paste-ready JSON-LD builders for Next.js App Router — `serializeJsonLd`
plus `organization`, `website`, `breadcrumbList`, and `localBusiness`. Drop into
`lib/seo.ts`, wire to real data, and keep schema truthful and aligned with
visible content (see `framework/aeo/AEO-FRAMEWORK.md` §8.3).

---

Delete this folder in your own project — it ships only as a reference in the
template.
