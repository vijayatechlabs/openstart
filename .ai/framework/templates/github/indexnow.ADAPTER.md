# GitHub Actions IndexNow Adapter Contract

Stack-agnostic **interface** for IndexNow in CI/CD. OpenStart does **not** ship one
runnable workflow for every package manager and host. Materialize a
stack-appropriate workflow (or use Glint’s engine output) that satisfies this contract.

See examples:

- `indexnow.next.example.yml` — Next.js / custom Node (project must own submit script)
- `indexnow.glint.yml.example` — Glint sites (`glint indexnow`, not `migrate`)

## Workflow inputs & environment

| Field | Type | Description |
|-------|------|-------------|
| `site_url` | string | Production origin (e.g. `https://example.com`) |
| `indexnow_key` | string | 8–128 chars `[A-Za-z0-9-]`. Public by design (also in key file); store as repo var or secret for config |
| `key_location` | string | Absolute URL of key file (root or path-scoped) |
| `prev_deploy_sha` | string | Durable cursor: last **successfully notified** deploy SHA |
| `current_sha` | string | This deploy’s Git SHA |
| `deploy_signal` | — | Proof **this** revision is live (not merely that a stable key URL returns 200) |

## Required steps

1. **Gate on deploy completion** for `current_sha` (`needs: [deploy]`, deploy webhook, `repository_dispatch`, host status API, or revision marker). Do not run on bare `push` without a live-revision check.
2. **Confirm key is live** at `key_location` (secondary check). Key file itself must have been emitted at **build** time into the deploy artifact — that is not this job’s job to “write into dist.”
3. **Compute URL delta** for adds/updates/**deletes** between `prev_deploy_sha` and `current_sha` (git/content/CMS). RSS `pubDate` is fallback for net-new only, never sole strategy.
4. **Expand twin routes** when twins exist (same shape as alternate / sitemap / llms.txt).
5. **URL verification gate**
   - Add/update: expect HTTP **200** on canonical host
   - Delete/redirect: **301 / 404 / 410** allowed
6. **Submit** to `https://api.indexnow.org/indexnow` in batches of ≤ **10_000**; all URLs must match `host`.
7. **Handle responses**
   - **200** and **202** = accepted receipt (202 = key validation may be pending)
   - **429** = honor `Retry-After`, then retry
8. **Advance durable cursor** to `current_sha` only after accepted receipt for the run.
9. **Retain artifacts** — submitted URL list + status codes.

## Host matrix (deploy signal)

| Host | Typical signal |
|------|----------------|
| GH Actions deploys site | Same workflow: `needs: [deploy]` then IndexNow |
| Coolify | Post-deploy command **or** webhook → `repository_dispatch` with `sha` (one path only) |
| Cloudflare Pages (git-connected) | Deploy hook / status API + revision check |
| Vercel / Netlify | Deploy webhook with commit SHA |

## Forbidden

- Sole reliance on RSS/Atom `pubDate` for edits/deletes
- Cursor only in ephemeral runner filesystem (e.g. uncommitted `.glint/` on GHA)
- Treating stable key-file **200** alone as proof of a **new** deploy
- Claiming crawl, index, ranking, or AI-assistant availability from 200/202
- Confusing one-time **scaffold/migrate** with every-deploy **submit**

## Glint vs non-Glint

| Stack | One-time setup | Every successful production deploy |
|-------|----------------|-------------------------------------|
| **Glint** | `glint migrate indexnow` (when engine ships it) | `glint indexnow --since-sha … --sha …` |
| **Next / other** | Copy helpers + project script + key in `public/` | Project script / webhook after deploy signal |
