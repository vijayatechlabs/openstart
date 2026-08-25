# OpenStart

**OpenStart is an agent-first project framework** for **websites, landing pages,
and product apps** that **requires exact human approval before a write** — a
reusable, **language- and framework-agnostic** starting point for mixed
human + AI teams (Claude Code, Google AntiGravity / Gemini, Codex, Cursor, …).

**Pair with [Glint](https://github.com/vijayatechlabs/glint) for blogs and long-form
content.** OpenStart owns site/app operating standards and AEO for marketing
surfaces; Glint owns the content runtime. Together they keep website, app, and
content aligned (including content handoff) and target better **SEO** and **AI
citation eligibility** — not ranking guarantees.

Use it as a GitHub template or run one command in an existing repo, and you get,
from minute one:

- a **single set of operating instructions** every AI agent reads,
- baked-in **engineering standards** (security, mobile-first, modern web,
  commenting, lean code, architecture),
- portable **guardrails** + a **Definition of Done** every change follows,
- a **standard set of project docs** (context, goals, status, tasks, changelog,
  decisions, risks, stakeholders, data log),
- a built-in **AEO / SEO standard** (shared eligibility bar with Glint blogs),
- one **onboarding flow** that discovers a project, plans, and (on your approval)
  wires everything in, and
- **exact approval before writes** — sandbox + browser step-up; an MCP agent
  identity is not an approval.

Works for Next.js, Astro, plain static sites, Python services — anything — on
Vercel, Netlify, Cloudflare, or a self-hosted VPS.

Built and maintained by [VijayaTech Labs](https://vijaytech.in). MIT licensed.

## Quick start

**New project** — click **Use this template** on GitHub, or:
```
gh repo create my-app --template vijayatechlabs/openstart
```

**Existing project** — bootstrap, then onboard:
```
git clone --depth 1 https://github.com/vijayatechlabs/openstart.git /tmp/openstart
cd /path/to/your/project
bash /tmp/openstart/.ai/framework/sync.sh --dry-run   # preview, writes nothing
bash /tmp/openstart/.ai/framework/sync.sh             # apply
```

Then run **`/onboard`** (Claude Code; `/init-project` is an alias) or follow
`.ai/framework/ONBOARD.md` (any other agent).

## How onboarding works — one flow for new *and* existing projects

A single state-aware pipeline that **detects** whether the project is brand-new,
an existing codebase, or already on the framework, and adapts:

```
Discover → Plan → ⟨you approve once⟩ → Apply → Verify
```

The agent makes every mechanical decision; you approve **one** plan (file actions
+ the 2–3 real choices). Writes are scoped to `.ai/` + the agent stubs, on a
branch, **never touching your application code**. From then on, every agent
session reads `.ai/docs/` for context and updates it as work happens.

## How "one file for all agents" works

Each agent auto-loads a different filename. Here they're all **thin stubs that
redirect to one canonical file**, so you maintain a single source of truth:

```
CLAUDE.md   ─┐
AGENTS.md   ─┼──►  .ai/framework/AGENT-GUIDE.md   (edit this one)
GEMINI.md   ─┘
```

## Why `.ai/` and not the repo root

All framework/meta is consolidated under one **`.ai/`** umbrella so it never
tangles with real application code. The only meta files at the repo root are the
three agent stubs and this README — everything those tools *require* to be at root.
Your `src/`, `apps/`, `packages/`, etc. live at the root alongside them.

## Layout

```
.
├── README.md / LICENSE
├── CLAUDE.md / AGENTS.md / GEMINI.md   ← thin stubs → .ai/framework/AGENT-GUIDE.md
├── .claude/
│   ├── commands/                       ← /onboard (+ /init-project alias)
│   └── skills/aeo-framework/SKILL.md   ← invokable AEO skill (Claude Code)
├── .ai/                      ← all framework + project meta (kept out of code)
│   ├── framework/              ← the reusable standard (edit-once source of truth)
│   │   ├── AGENT-GUIDE.md        ← canonical instructions for ALL agents
│   │   ├── ONBOARD.md            ← the adopt/scaffold/update flow (all agents)
│   │   ├── sync.sh               ← installer/updater (mechanical half of /onboard)
│   │   ├── DOC-RULES.md          ← which doc to write where
│   │   └── aeo/                  ← AEO/SEO framework, prompts, checklist
│   ├── docs/                   ← per-project living docs (filled during onboarding)
│   │   ├── PROJECT-CONTEXT · STACK · GOALS · CURRENT-STATUS · TASKS · NEXT-ACTIONS
│   │   ├── CHANGELOG · DECISIONS · RISKS · STAKEHOLDERS · AEO-CHANGES · DATA-LOG
│   │   └── data/                ← datasets / exports / research dumps
│   └── examples/               ← a worked sample (delete in your own project)
└── (your code: src/ | apps/ | packages/ | …)
```

## Keeping projects up to date

The framework is versioned (`.ai/framework/VERSION`, git tags). To pull the latest
standard into a project that already uses it:
```
bash .ai/framework/sync.sh --dry-run                 # preview
bash .ai/framework/sync.sh                            # latest
FRAMEWORK_REF=v1.0.0 bash .ai/framework/sync.sh       # pin to a release
```
It updates only the **reusable standard** (`.ai/framework/`, `.claude/commands/`,
`.claude/skills/`, the agent stubs) and **never touches** your `.ai/docs/`,
`.ai/examples/`, `.claude/settings*.json`, or your code. Review `git diff`, commit.

## Alternatives & limitations

**OpenStart is not `create-next-app`, not the AGENTS.md format, and not a coding
agent.** It is an operating standard for mixed human + AI teams that **requires
exact human approval before a write**. Use it *with* Next.js, Astro, or a static
site — not instead of them.

| If you need… | Use this | OpenStart’s job |
|---|---|---|
| A Next.js app scaffold | [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) (`--agents-md` is **default**: it drops `AGENTS.md` and `CLAUDE.md`) | That CLI is the Next.js starter. It does not install this framework’s approval gate, sandbox rule, Definition of Done, or AEO standard. You can run OpenStart’s `sync.sh` **on top of** a Next.js repo. |
| A file agents already know to read | [`AGENTS.md`](https://agents.md/) (open format: a README for agents; no required fields) | OpenStart already ships thin `AGENTS.md` / `CLAUDE.md` / `GEMINI.md` stubs that redirect to one canonical `.ai/framework/AGENT-GUIDE.md`. The format is the filename; OpenStart is the contract inside it. |
| A one-shot project template | [Cookiecutter](https://cookiecutter.readthedocs.io/en/stable/) | Cookiecutter generates a tree from a template. It has no live onboard flow, no write-approval, and no AEO bar. |
| A site or blog runtime | [Astro](https://docs.astro.build/en/getting-started/) (`npm create astro@latest`) or [Glint](https://github.com/vijayatechlabs/glint) | OpenStart is not a web framework and does not include a blog engine. Pair Glint for long-form; Astro remains a valid site framework *under* OpenStart. |

**Limitations (read these before you adopt it):**

- **Not a runtime.** You still pick Next.js, Astro, static files, or a Python service.
- **Not a coding agent.** Claude Code, Cursor, Codex, and Gemini still do the work. OpenStart tells them how to operate.
- **Writes are slower on purpose.** Sensitive writes return `needs_approval` plus a browser step-up. An MCP agent-identity token, ID-JAG grant, Tasks (SEP-2663), or `subscriptions/listen` is **not** an approval.
- **A sandbox is not a control plane.** Docker `sbx` / isolated VMs contain execution; they do not auto-merge and they do not replace the human in the loop.
- **MIT licensed, no SaaS plan.** There is no hosted OpenStart product and no dedicated marketing site — the public definitional URL is this GitHub template.
- **Unattended coding agents on a production host are out of policy.** Isolated VMs are not a substitute for that rule.

## Contributing

OpenStart is intentionally opinionated and lean. Issues and PRs are welcome —
please keep changes framework-agnostic and favor folding into existing files over
adding new ones. See `.ai/framework/AGENT-GUIDE.md` for the conventions the
framework holds itself to.

## License

[MIT](./LICENSE) © VijayaTech Labs.
