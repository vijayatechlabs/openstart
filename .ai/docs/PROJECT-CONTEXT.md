# Project Context

## Overview
**OpenStart** is VijayaTech’s agent-first project framework for **websites, landing pages, and product apps** (language- and stack-agnostic). It ships operating instructions, engineering standards, project doc templates, and an **AEO/SEO standard** + examples.

## Client / business context
Maintained by VijayaTech Labs for internal brands and external consumers. Pairs with **Glint** (blogs / long-form content) so product sites and content can share SEO/AI eligibility goals and stay in sync via content handoff.

## Current scope
- Reusable `.ai/framework/` standard (AGENT-GUIDE, ONBOARD, AEO, sync)
- Living docs under `.ai/docs/` for this meta-repo
- Stack examples (Next.js SEO, robots, analytics, IndexNow, markdown twins)
- Claude Code skill + commands (`/onboard`, `/feedback`, `/content`, AEO skill)

## Not in scope
- Blog/content runtime (owned by **Glint**)
- Required CDN Workers for content negotiation (optional, human-gated per project)
- Guarantees of rankings or AI citations

## Key workflows
- Onboard/sync framework into consumer repos (`sync.sh`, `/onboard`)
- AEO audit/implement via skill + AEO-FRAMEWORK
- Content handoff from shipped features → blog brief (pairs with Glint blogs)
- Framework feedback upstream

## Constraints
- Framework changes must remain stack-agnostic
- VERSION must match latest CHANGELOG tag (pre-push hook)
- Never claim IndexNow/headers cause rankings or training ingestion

## Important notes
- Framework version: see `.ai/framework/VERSION` (currently **1.4.0**)
- AEO plan: `.ai/docs/plans/aeo-uplift.md`
