---
description: Alias of /onboard — set up / adopt / update the OpenStart framework in this project
---

`/init-project` is now an alias of **`/onboard`**, the single state-aware flow
that handles a fresh, brownfield, or already-onboarded project (it detects which
and adapts — greenfield is just the "scaffold" branch of the same pipeline).

**Run `/onboard`**, or follow `.ai/framework/ONBOARD.md` directly.

For a brand-new/empty project the flow's Discover phase finds little, so it goes
straight to interviewing you and seeding `.ai/docs/` — the same behavior this
command used to have, now part of one unified pipeline.
