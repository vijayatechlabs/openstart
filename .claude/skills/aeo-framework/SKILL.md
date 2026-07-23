---
name: aeo-framework
description: Use when implementing or auditing AEO (Answer Engine Optimization) and Google AI visibility — SEO, llms.txt, robots.txt, sitemaps, schema/JSON-LD, markdown twins, IndexNow, AI crawler routing, or GA4/Search Console measurement — for a website, landing page, or web app (OpenStart). For Glint blogs, prefer Glint docs.
---

# AEO Framework Skill

The full governing standard is **`.ai/framework/aeo/AEO-FRAMEWORK.md`** — read it before
acting. Reusable prompts are in `.ai/framework/aeo/AEO-PROMPTS.md`; the completion
checklist is in `.ai/framework/aeo/AEO-CHECKLIST.md`. Record all changes in
`.ai/docs/AEO-CHANGES.md`.

## Product pairing

| Product | Use for |
|---------|---------|
| **OpenStart** (this skill) | Websites, landing pages, product/marketing apps |
| **Glint** | Blogs and long-form content runtime |
| **Together** | App + blog: site AEO here; blog via Glint; content handoff keeps them in sync |

Shared goal: **SEO eligibility + AI citation eligibility** (not ranking guarantees).

## When to use
Use this skill when the user wants:
- AEO or SEO setup for a new or existing **site/landing/app** project.
- llms.txt, robots.txt, sitemap, schema, markdown twins, IndexNow, or AI crawler routing.
- Google Search AI visibility checks.
- GA4 AI referral tracking guidance.
- A repository audit before implementation.

If the repo is a **Glint blog**, open Glint `docs/AEO.md` / `docs/UPGRADE.md` and
the Glint AEO skill path instead of re-building twins in OpenStart examples.

## Operating rules
1. Ask discovery questions first (include: is there a paired Glint blog?).
2. Summarize the stack, analytics, SEO, business, and constraints.
3. Audit crawlability, indexability, canonical logic, schema, page experience, and text accessibility.
4. Separate Google AI visibility from broader AEO.
5. Recommend llms.txt and markdown twins only when the stack and goals justify them.
6. Use **stack-native** twin routes; preferred headers §8.4.3; no third-party AEO product requirement.
7. Edge content negotiation only after **explicit human approval**.
8. Do not invent schema, FAQs, prices, or claims.
9. Do not recommend Google Indexing API for BlogPosting/general pages.
10. Show diffs/snippets before finalizing major changes.
11. Document changes in AEO-CHANGES.md.

## Required output order
1. Discovery summary.
2. SEO blockers.
3. Google AI blockers.
4. Broader AEO blockers.
5. Prioritized implementation plan.
6. Proposed file changes.
7. Measurement setup instructions.

## Core files to inspect
- robots.txt
- sitemap.xml
- llms.txt / llms-full.txt
- canonical tags
- JSON-LD schema
- priority page templates
- twin routes + host header config (if any)
- IndexNow key file + post-deploy submit path (if enabled)
- GA4 setup
- Search Console setup

## Default implementation priorities
1. Fix crawlability and indexability.
2. Fix page experience and content quality (money pages answer-first — §2.4).
3. Add truthful structured data (+ sameAs entities).
4. Add llms.txt (short tour guide) and markdown twins if appropriate.
5. Prefer platform-native markdown negotiation when on Cloudflare; custom edge only with human approval.
6. Add IndexNow only after baseline SEO and a real deploy-completion signal (§8.5); verify Bing WT.
7. Add AI referral measurement (or document skip).

## Reminder
For Google AI visibility, llms.txt and markdown twins are not required. They are optional for broader AEO.
Eligibility ≠ rankings or guaranteed AI citations.
