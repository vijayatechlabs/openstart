# Prompts

## 1. Discovery prompt
You are my AEO implementation agent for VijayaTech Labs.
Use `.ai/framework/aeo/AEO-FRAMEWORK.md` as the operating standard.
Do not start coding.
Ask all discovery questions first, grouped by:
- stack and deployment
- analytics and webmaster tools
- SEO and content systems
- business context
- constraints
After I answer, summarize in 5-10 bullets and wait for approval.

## 2. Audit prompt
Use `.ai/framework/aeo/AEO-FRAMEWORK.md`.
Audit this project against both:
- broader AEO implementation readiness
- Google AI visibility readiness
Return:
- stack summary
- SEO blockers
- Google AI blockers
- broader AEO blockers
- priority plan
- open questions
Do not change files yet.

## 3. Implementation prompt
Using `.ai/framework/aeo/AEO-FRAMEWORK.md`, implement the approved plan.
Rules:
- keep changes minimal and framework-native
- show diffs/snippets before finalizing major files
- do not force Dualmark unless justified
- keep schema truthful
- on filtered listing pages (query-param or path-segment), drive H1, answer-first
  intro, and metadata from one source of truth (§7.1)
- if you add markdown twins, wire all three discovery surfaces (HTML alternate
  link, sitemap.xml at lower priority, llms.txt) per §8.4.1; alternate href must
  match the actual twin route shape (suffix `/md` vs prefix `/md/directory/...`)
- on Next.js App Router, never suffix `/md` after a catch-all — `[[...segments]]/md`
  won't build; use `/md/directory/[[...segments]]` for directory twins and
  `/provider/[slug]/md` for single dynamic segments (§8.4.2)
- document work in `.ai/docs/AEO-CHANGES.md`
After changes, provide a verification checklist.

## 4. Content prompt
Using `.ai/framework/aeo/AEO-FRAMEWORK.md`, review the top pages.
Identify weak commodity content and propose stronger answer-first rewrites.
Include headings, FAQ ideas, proof points, and media opportunities.
Do not edit files yet.

## 5. Measurement prompt
Using `.ai/framework/aeo/AEO-FRAMEWORK.md`, inspect analytics setup.
Tell me whether GA4 and Search Console appear installed or referenced.
Then provide exact next steps for AI referral measurement and conversion-quality tracking.