# VijayaTech Labs AI Visibility Framework v2

This document defines **two complementary standards** for all VijayaTech Labs projects:

1. **AEO Implementation Framework** — for visibility across AI assistants and answer engines broadly.
2. **Google AI Visibility Framework** — for eligibility and performance within Google Search AI features such as AI Overviews and AI Mode.

These standards overlap, but they are **not identical**.

---

## 1. Core principle

Do not treat AEO as a collection of hacks.

For Google, the baseline remains:
- helpful, reliable, people-first content,
- strong technical SEO,
- crawlability and indexability,
- good page experience,
- visible text aligned with structured data,
- high-quality images/video where relevant.

For broader AI visibility, add:
- machine-readable discovery assets,
- markdown twins or equivalent clean text surfaces,
- answer-first content formatting,
- analytics and monitoring for AI assistant referrals.

---

## 2. Two-framework model

### 2.1 AEO Implementation Framework

Use this when the goal is broader AI visibility across tools such as ChatGPT, Perplexity, Claude, Gemini, and similar systems.

Focus areas:
- llms.txt
- robots.txt crawler policy
- sitemap.xml and optional sitemap.md
- markdown twins for priority pages
- clean content negotiation / AI bot routing where appropriate
- structured data
- answer-first content structure
- GA4 AI referral tracking

### 2.2 Google AI Visibility Framework

Use this when the goal is to maximize visibility inside Google AI Overviews / AI Mode.

Focus areas:
- eligibility for Google Search snippets
- crawlability and indexability
- page experience
- useful, unique, non-commodity content
- textual accessibility of important content
- image/video support
- truthful structured data
- preview controls policy
- Search Console verification and diagnostics
- local business / Merchant Center freshness where relevant

### 2.3 OpenStart (sites) + Glint (blogs) — paired brands

| Product | Primary surface |
|---------|-----------------|
| **OpenStart** (this standard) | Websites, landing pages, product/marketing apps |
| **Glint** | Blogs and long-form content runtime |
| **Together** | Content handoff keeps product features and posts aligned; shared SEO + AI citation **eligibility** (not guarantees) |

**Paired-brand checklist** (when both repos exist):

- [ ] **Site (OpenStart):** crawlability, schema, robots, llms, landings answer-first
- [ ] **Blog (Glint):** `glint doctor`, twin headers, llms; upgrade via Glint `docs/UPGRADE.md` — do **not** re-implement the blog engine in the app
- [ ] **GSC** verified on the domain(s)
- [ ] **Bing Webmaster** verified (IndexNow / Bing matter for some AI-adjacent paths; Google does **not** use IndexNow)
- [ ] IndexNow configured on the stack that owns public URL deltas (often the blog)
- [ ] Content handoff configured (`CONTENT_DIR` / `CONTENT_REPO` → Glint inbox)
- [ ] No claims that headers or IndexNow alone guarantee citations

### 2.4 Commercial landing (“money page”) pattern

Priority commercial URLs (pricing, product, service, primary CTA pages) should:

1. **Answer first** — the core promise / answer in the first ~100 words of visible text (not only in a hero image).
2. **One clear H1** that matches the decision the page supports.
3. **Proof** — original data, product truth, customers, or how-to steps (not generic AI filler).
4. **FAQ only if visible** — `FAQPage` JSON-LD only for Q&A rendered on the page; prefer a dedicated `/faq` when the list is long (§7.5).
5. **Comparison tables** where buyers compare options (B2B) — keep claims truthful.
6. Prefer real routes over `/#anchors` for trust content that should be cited.

Eligibility for AI answers still depends on quality and third-party signals — this pattern only improves **structure and fetchability**.

---

## 3. Mandatory discovery questions for every project

Before making changes, the AI agent must ask and wait for answers.

### 3.1 Stack and deployment
- What framework is used? (Next.js App Router, Astro, WordPress, React SPA, static site, etc.)
- Where is the site hosted? (Vercel, Netlify, Cloudflare, VPS, cPanel, etc.)
- Is rendering SSR, SSG, CSR, ISR, or mixed?
- Is there any middleware, CDN edge logic, or reverse proxy?
- Is there CI/CD? If yes, where?

### 3.2 Analytics and webmaster tooling
- Is GA4 installed? If yes, what is the Measurement ID and installation method?
- Is Google Tag Manager used?
- Is Google Search Console verified?
- Is **Bing Webmaster Tools** verified? (Recommended for AI-adjacent discovery; pairs with IndexNow.)
- Is IndexNow planned or already live on this host?
- Are there other analytics tools in use (PostHog, Mixpanel, Plausible, Matomo)?
- Is AI referral measurement (e.g. GA4 `ai_referral_landing`) installed or intentionally skipped?

### 3.3 SEO and content systems
- Is there an existing robots.txt?
- Is there a sitemap.xml?
- Is canonical logic already implemented?
- Is JSON-LD schema already implemented?
- Is there a CMS or content source (MDX, CMS, WordPress, Sanity, Contentful, etc.)?

### 3.4 Business context
- What is the exact business model?
- What are the top 5-15 pages that matter commercially?
- What countries/cities matter most?
- What are the top customer questions this site should answer?
- Which competitors currently get cited in AI tools?

### 3.5 Constraints
- Any restrictions on allowing AI crawlers?
- Any legal/compliance issues?
- Any constraints on adding new URLs, routes, or files?
- Any sections that must remain private, gated, or noindexed?

The agent must summarize the answers in 5-10 bullets before implementation.

---

## 4. Implementation order: do this first

This order is mandatory. Do not start with markdown twins or llms.txt blindly.

### Phase 1 — Baseline SEO and eligibility
1. Verify Google Search Console exists; if not, ask the user to set it up.
2. Audit priority pages for:
   - HTTP 200 status
   - indexability
   - correct canonical tags
   - no accidental noindex
   - crawlability by Googlebot
   - visible textual main content
3. Verify robots.txt is not blocking important content.
4. Verify sitemap.xml exists and includes canonical priority URLs.
5. Check internal linking to priority pages.
6. Check heading hierarchy and obvious duplicate/thin content issues.

If these fail, stop and fix them before advanced AEO work.

### Phase 2 — Google AI visibility essentials
7. Improve page experience on key pages:
   - mobile readability
   - fast loading
   - clear distinction between main content and chrome
   - reduced clutter / intrusive overlays
8. Ensure important information exists in textual form, not only in JS widgets, images, or tabs.
9. Add or validate high-quality images and/or video where relevant.
10. Add or validate truthful structured data matching visible content.
11. Define preview controls policy:
   - whether any pages use noindex
   - whether any pages use nosnippet / data-nosnippet / max-snippet
   - ensure the policy is intentional, not accidental
12. For local business / ecommerce projects, verify Business Profile / Merchant Center freshness.

### Phase 3 — Broader AEO implementation
13. Create/update llms.txt.
14. Create/update robots.txt AI crawler policy.
15. Consider adding markdown twins for top-priority **public content** pages.
16. If the stack supports it and the **user approves**, implement stack-native twin
    routes (and optional edge content negotiation — human gate; see §8.4.4).
17. Optionally add `llms-full.txt` and/or sitemap.md for machine-readable discovery.
18. Add answer-first intros and FAQ sections to priority pages.
19. Set up GA4 AI referral measurement instructions.
20. Document everything in .ai/docs/AEO-CHANGES.md.
21. If the project has a **Glint blog**, keep blog AEO on Glint (`docs/AEO.md` /
    `docs/UPGRADE.md`); use OpenStart for the website/app and content handoff so
    product and posts stay aligned.

---

## 5. Hard rule: Google framework vs broader AEO framework

### 5.1 For Google AI visibility, do **not** assume these are required
The agent must explicitly know that for Google Search AI features, the following are **not required**:
- llms.txt
- markdown twins
- special AEO markup
- chunking content into tiny sections
- rewriting copy only for AI phrasing

These may still be used for broader AI visibility strategy, but they are not Google requirements.

### 5.2 For Google AI visibility, the real priorities are
- Search eligibility and snippet eligibility
- unique, non-commodity content
- crawlability and indexability
- good page experience
- text availability
- supporting images/video
- truthful structured data
- preview-control correctness

---

## 6. Required audits before coding

The AI agent must first perform and report these audits:

### 6.1 Technical audit
- robots.txt present? correct?
- sitemap.xml present? valid?
- canonical tags present on priority pages?
- status codes correct?
- any accidental redirects/canonical loops?
- any noindex tags or X-Robots-Tag headers?
- important content blocked behind client rendering?

### 6.2 Content audit
- Is the page useful and unique?
- Is the opening section a direct answer?
- Are headings clear and descriptive?
- Is the page commodity content or first-hand / expert content?
- Does the page include real evidence, examples, proof, or specifics?

### 6.3 Page experience audit
- Does the page render well on mobile?
- Is the main content visually dominant?
- Are popups/banners/interstitials intrusive?
- Are there heavy images/scripts causing poor load?
- Is the page readable without interaction tricks?

### 6.4 Media audit
- Are there meaningful images?
- Are alt texts useful?
- Are there captions or surrounding text that explain the media?
- Should this page include a diagram, screenshot, or short video?

### 6.5 Measurement audit
- Is GA4 installed?
- Is Search Console connected?
- Are conversions defined?
- Do we know how to attribute AI referral traffic?

---

## 7. Content standards the agent must enforce

### 7.1 Answer-first standard
Each priority page should begin with 1-2 paragraphs that clearly explain:
- what the company/product/service is,
- who it is for,
- what problem it solves,
- where relevant, location / market / pricing signal.

**Filtered listing pages (query-param or path-segment).** When `<title>`/metadata is
generated per filter — whether from query params (e.g. `generateMetadata` reading
`?city=` or `?brand=`) or from path segments (e.g. `/directory/cars/pune/koregaon-park`)
— the **visible H1 and answer-first intro must reflect the same filter**, not a
generic page title. A page whose metadata says "Cars in Pune" while the visible H1
says "All Cars" is misaligned: it weakens snippet eligibility and trust, and the
structured data no longer matches visible content. Drive the H1, intro, and metadata
from one source of truth for the active filter.

### 7.2 Non-commodity content standard
The agent must push the user for content that contains:
- first-hand experience,
- real examples,
- case-study specifics,
- strong point of view,
- distinctive process or methodology,
- original visuals where possible.

If the page is generic commodity content, the agent must explicitly label it weak.

### 7.3 FAQ and comparison standard
The agent may propose FAQ sections and comparison tables, but must not treat them as hacks.
They should exist only where they genuinely help users understand the offering.

### 7.4 Textual accessibility standard
Important facts must exist as text in the DOM and not only inside:
- images,
- sliders,
- accordions that fail without JS,
- client-only widgets,
- inaccessible visual components.

### 7.5 Standalone trust / about / faq pages
Answer engines cite **dedicated, indexable pages** more reliably than homepage
sections behind `/#anchors`. For queries like "how does X verify providers", "is X
affiliated with the government", or "is X legit", a fragment URL is a weak citation
target; a standalone page is a strong one.

When the homepage carries meaningful trust/about/FAQ content, the agent should
propose splitting it into dedicated routes backed by a **shared content module**
(single source of truth, rendered in both places):

- `marketing-content.ts` — FAQs, verification pillars, company facts.
- The homepage shows an **excerpt** and links to the full page (real route, not
  `/#faq`); footers link to the dedicated pages.

Minimal layout and schema mapping:

| Route | Content | JSON-LD `@type` |
|---|---|---|
| `/faq` | full FAQ list | `FAQPage` |
| `/about` | company story, mission, team | `AboutPage` |
| `/trust` | verification, safety, policies | `WebPage` |
| `/` (home) | FAQ **excerpt** + links | `WebSite` / `Organization` (existing) |

Rules: only mark up Q&A/claims that are **visible** on the page; link the dedicated
pages from real navigation/footer (not anchors); keep one content source feeding
both excerpt and full page. See `.ai/examples/nextjs-seo.ts` for `faqPage`,
`aboutPage`, and `webPage` builders.

---

## 8. Technical standards the agent must enforce

### 8.1 robots.txt standard
The agent must:
- preserve important existing rules,
- keep Googlebot access open to public pages unless the user instructs otherwise,
- explicitly review Google-Extended policy with the user,
- add sitemap reference,
- review AI crawler allowances for broader AEO strategy.

#### 8.1.1 AI crawler allow-list template (opt-in)
For a project that has decided it **wants** AI visibility on its public pages, the
agent may propose an explicit allow-list rather than relying on defaults. The
pattern is **allow-public / deny-private**: every crawler (including named AI bots)
gets the same private exclusions (`/admin`, `/dashboard`, auth/API routes) and is
welcomed elsewhere.

**Three owner postures** (align with Glint `aiCrawlers` language):

| Posture | Allow | Block |
|---------|-------|--------|
| **all** | Named AI bots + `*` | Private paths only |
| **retrieval-first** (recommended when owner wants **answers/citations** but not training scrapers) | User-action / search bots: ChatGPT-User, OAI-SearchBot, Perplexity-User, Claude-User, Claude-SearchBot, … | Training-oriented: GPTBot, CCBot, Google-Extended, Applebot-Extended, Bytespider, … |
| **none** | Classic search (Googlebot/Bingbot via `*`) | Named AI bots |

Decision guide before allowing:
- **Retrieval / user-action bots** — usually allow if the owner wants AI answers and citations.
- **Training crawlers** — allow only if the owner accepts training use.
- **Google-Extended** — generative AI opt-out; **does not** affect normal Googlebot Search. Decide deliberately.

See `.ai/examples/nextjs-robots.ts` for App Router `robots.ts` (includes retrieval vs training split comments).

### 8.2 sitemap standard
The agent must:
- ensure sitemap.xml lists canonical URLs,
- exclude junk pages,
- ensure freshness/update logic — prefer `<lastmod>` from content
  `updatedAt ?? publishedAt` (or last meaningful deploy) on priority URLs,
- include markdown twin URLs at **lower priority** when twins exist (§8.4.1),
- consider image/video sitemap support when relevant.

### 8.3 schema standard
The agent must:
- add only schema that matches visible content,
- use Organization / LocalBusiness where applicable,
- add Service / Product / SoftwareApplication / Article / FAQPage / HowTo as appropriate,
- set Organization `sameAs` (social/profile URLs) when real profiles exist,
- avoid fake reviews, fake FAQs, fake prices, or invisible content.

**Entity clarity:** strengthen Organization, Product/SoftwareApplication, Person
(authors), and AboutPage. Do **not** invent proprietary “entity map” files unless
the project already uses them — schema + sameAs + real pages are enough.

For Next.js App Router, see `.ai/examples/nextjs-seo.ts` for reference
`serializeJsonLd` + Organization / WebSite / BreadcrumbList / LocalBusiness /
Person / BlogPosting builders.

### 8.4 Markdown twins (optional infrastructure)

Markdown twins are optional broader-AEO infrastructure — **not** a Google requirement
and **not** tied to any third-party product. Prefer **stack-native** twin routes
(Next.js App Router, Astro endpoints, Glint `/raw/…`, etc.).

Only recommend twins when:
- the stack can support them cleanly,
- priority pages are content-heavy enough (landing pages, docs, marketing long-form),
- the owner wants broader AI assistant fetchability beyond Google.

**OpenStart vs Glint:**
- **Website / landing (OpenStart project):** implement twins via this standard + examples.
- **Blog (Glint):** use Glint’s built-in twins and headers (`markdownTwinResponse`);
  follow Glint `docs/AEO.md` / `docs/UPGRADE.md` — do not re-implement the blog
  engine in the app repo.
- **Paired app + blog:** both share this eligibility bar; content handoff keeps
  product releases and posts in sync.

If twins are not justified, implement the rest of the framework without forcing them.

#### 8.4.1 Markdown twin discovery (when twins exist)
A markdown twin only helps if crawlers can find it. When twins are implemented, the
agent must wire up all three discovery surfaces — listing a twin in `llms.txt` alone
is not enough:

1. **HTML alternate link** — every HTML page that has a twin must expose it:
   ```html
   <link rel="alternate" type="text/markdown" href="https://example.com/provider/acme/md">
   ```
   In Next.js App Router, emit this from `generateMetadata`. The alternate `href`
   must match the **actual twin route shape** (suffix for single dynamic segments;
   prefix for catch-all directory twins — see §8.4.2):

   *Single dynamic segment* (suffix twin):
   ```ts
   export async function generateMetadata({ params }): Promise<Metadata> {
     const pageUrl = `https://example.com/provider/${params.slug}`;
     return {
       alternates: {
         canonical: pageUrl,
         types: { 'text/markdown': `${pageUrl}/md` },
       },
     };
   }
   ```

   *Catch-all directory* (prefix twin — `/md/directory/...`, not `/directory/.../md`):
   ```ts
   export async function generateMetadata({ params }): Promise<Metadata> {
     const segments = (params.segments as string[]).join('/');
     const pageUrl = `https://example.com/directory/${segments}`;
     return {
       alternates: {
         canonical: pageUrl,
         types: { 'text/markdown': `https://example.com/md/directory/${segments}` },
       },
     };
   }
   ```
2. **sitemap.xml** — include twin URLs at a **lower priority** than their HTML
   counterparts so they are discoverable without competing with the canonical page
   (e.g. HTML `priority: 1.0`, twin `priority: 0.5`; omit `changefreq` on twins if unsure).
3. **llms.txt** — cross-reference the twins so AI-first crawlers find them directly.

#### 8.4.2 Next.js App Router routing constraint for twins
Next.js rejects a catch-all that is **not the last URL segment**, so twin routes
like `app/[[...segments]]/md/route.ts` or `app/[...segments]/md/route.ts` will not
build — the `/md` suffix cannot follow an optional or required catch-all.

- **Single dynamic segment** → suffix works: `app/provider/[slug]/md/route.ts`
  serves `/provider/acme/md`. ✅
- **Catch-all (directory) twins** → move `/md` to the front as a fixed prefix:
  `app/md/directory/[[...segments]]/route.ts` serves `/md/directory/foo/bar`
  instead of the invalid `/directory/foo/bar/md`. ✅

Keep the twin URL shape consistent with whatever the alternate link, sitemap, and
llms.txt advertise.

#### 8.4.3 Twin canonical/indexing policy and headers
To prevent twin markdown from competing with primary HTML in search engines:
- **Minimum:** twin response returns `Link: <html-canonical>; rel="canonical"`
  (HTTP header or equivalent) pointing at the HTML page.
- **Recommended:** `X-Robots-Tag` containing `noindex` when twins are for AI
  retrieval only (not a second indexable page).
- Maintain identical twin URL shapes across alternate links, sitemap, `llms.txt`,
  and IndexNow submissions.

##### Preferred twin response headers (align with Glint)

| Header | Preferred value |
|--------|-----------------|
| `Content-Type` | `text/markdown; charset=utf-8` |
| `Content-Disposition` | `inline` |
| `Link` | `<{htmlCanonical}>; rel="canonical"` |
| `X-Robots-Tag` | includes `noindex` (project policy may add `follow`) |
| `X-Markdown-Tokens` | integer estimate, e.g. `ceil(utf8Bytes / 4)` |
| `Vary` | includes `Accept` (add `User-Agent` if UA negotiation is used) |
| `X-AEO-Version` | e.g. `1.0` |
| `X-Content-Type-Options` | `nosniff` |

`Content-Type: text/plain` remains a **compatibility option** only (some clients
download unknown MIME types less often). Keep HTML alternate
`type="text/markdown"` either way. See `.ai/examples/nextjs-markdown-twin.ts`.

##### Static hosts and AI fetch lag (evidence-labelled)

| Practice | Status in framework |
|----------|---------------------|
| All public twins in sitemap (lower priority) | **Required** when twins exist |
| Preferred header set above | **Recommended** |
| Host `_headers` / `vercel.json` / Nginx for twin MIME (prerender may drop route headers) | **Recommended** on static hosts |
| IndexNow HTML+twin post-deploy | **Recommended** for Bing-family discovery speed |
| Expect assistant fetch lag | **Document** — not a deploy-day pass/fail |
| “IndexNow causes ChatGPT/training” | **Forbidden claim** — receipt only |

#### 8.4.4 Optional edge content negotiation (human-gated)

Same-URL negotiation (`Accept: text/markdown` **or** `text/plain` → twin/clean
text; optional AI bot UA; `406` when neither HTML nor markdown is acceptable)
requires edge/middleware. It is **not** required for strong SEO/AEO eligibility.

**Prefer platform-native first (still human-approved):**

1. **Cloudflare Markdown for Agents** — Accept → markdown at the edge ([docs](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/)).
2. Host-specific Transform Rules / middleware when native product is unavailable.
3. Custom Worker only when you need origin twin files + custom headers (e.g. paired Glint `/raw` paths).

- Agents **must not** deploy Workers, middleware, or CDN routes without
  **explicit human approval**.
- If approved: honor explicit `Accept: text/html` over bot UA; treat `*/*` as
  wildcard (not “wants HTML”); set `Vary` correctly; loop-safe origin fetches.
- Document platform choice in `AEO-CHANGES.md`.

#### 8.4.5 `llms.txt` and optional `llms-full.txt`

- **`llms.txt`:** recommended for public marketing/docs sites; intentionally skip
  for private apps or when there is no stable public URL set.
- **`llms-full.txt` (optional):** full markdown bodies of priority public pages
  for one-fetch AI eligibility. Apply a size guard (e.g. ~500KB total or top N
  newest pages). Link from `llms.txt`. Never include gated/member content.
- Eligibility only — not a citation guarantee.

#### 8.4.6 Article / long-form page metadata

For post-like or article landing pages (not every SPA route):
- Prefer Open Graph article protocol when dates/authors exist
  (`article:published_time`, `modified_time`, `author`, `tag`, `section`).
- Prefer `BlogPosting` / `Article` JSON-LD only when it matches **visible** content.
- Blog *collections* on Glint use Glint’s post templates; marketing pages use this
  section + `.ai/examples/nextjs-seo.ts`.

#### 8.4.7 Google Web Search Indexing API

Do **not** recommend the Google Web Search Indexing API for general website or
**BlogPosting** URLs. Google documents it for **JobPosting** / **BroadcastEvent**
only. For Google discovery use: Search Console sitemap + URL Inspection + quality
content. Use IndexNow for Bing/Yandex/Naver-style notify (§8.5).

---

### 8.5 IndexNow standard
IndexNow is a protocol that allows website owners to notify participating search
engines about recent URL changes (add, update, delete). Submit via
`https://api.indexnow.org/indexnow` (or an engine-specific endpoint). Shared
submissions may be distributed among participants. A successful call is a
**receipt**, not a crawl or ranking guarantee — see §8.5.5.

Reference helpers: `.ai/examples/nextjs-indexnow.ts`. CI contract:
`.ai/framework/templates/github/indexnow.ADAPTER.md`.

#### 8.5.1 keyLocation and ownership verification
The IndexNow protocol requires hosting a unique UTF-8 text key file on your host to verify domain ownership. The key must be between 8 and 128 characters and contain only characters `[A-Za-z0-9-]`.
- **Option 1: Root-level (`/{key}.txt`)** - Preferred. Verification covers the entire domain.
- **Option 2: Path-scoped (`/path/{key}.txt`)** - Allowed for mounted sites or subdirectories. Verification is scoped only to URLs matching that subdirectory path prefix. The key file location (`keyLocation`) must match the scope of URLs submitted.

#### 8.5.2 Timing & deployment gate
- **Deploy completion signal:** Submissions must run only AFTER the deploy completion signal is received (e.g., using a webhook, or `needs: deploy` step in CI/CD). Never run the submit step during build or pre-deployment phases.
- **Stable key URL returning 200** is a necessary condition, but not sufficient proof of a *new* deployment (as it may return the key from a previous deployment). A revision-specific deploy completion signal or version hash check is required.

#### 8.5.3 URL selection (order of preference)
When determining which URLs to submit to IndexNow, apply these strategies:
1. **Primary (Content/deploy delta):** Query the actual git commit diff, CMS webhooks, or dynamic publish event logs to compile the list of added, updated, and deleted URLs since the last successful deployment. This is the only strategy that correctly handles edits and deletes.
2. **Fallback (RSS/Atom):** Can be used for net-new items only when no deployment cursor exists, and the operator explicitly opts in. **Never** rely on RSS `pubDate` for edits/deletes.
3. **Bootstrap / full site:** A full sitemap submit is supported only via an explicit operator flag (e.g. `--bootstrap`); it must **never** be triggered automatically on the first enable.

#### 8.5.4 Submission and error handling
- **Batching:** Group URLs into batches of no more than **10,000** per request.
- **Twins:** When twin markdown routes exist, submit both the HTML URL and the twin URL on creation/update, and submit both on deletion.
- **Concurrency & Backoff:** Implement concurrency protection. Honor the `Retry-After` HTTP header if the engine returns a 429 status code.
- **Response handling:**
  - **200 OK** and **202 Accepted** must both be handled as successful receipts (where 202 means key validation or crawl queuing is pending). Do not treat 202 as a failure.
  - Retain submission logs for diagnostic verification.

#### 8.5.5 Explicit non-claims (copy verbatim in agent summaries)
> IndexNow notifies participating engines that URLs changed. A 200 or 202 response means the request was **received** (202: key validation may still be pending). It does **not** mean the URL was crawled, indexed, ranked, or made available inside any AI assistant. Sitemap discovery, robots policy, content quality, and engine-side systems remain separate.

---

## 9. Measurement framework

### 9.1 Google-focused measurement
The agent must recommend:
- Google Search Console verification,
- monitoring overall web search performance,
- comparing landing page behavior in GA4,
- tracking quality metrics, not just clicks.

### 9.2 GA4 quality metrics
The agent must ask which of these matter most:
- lead form submissions
- booked calls
- trial starts
- purchases
- engaged sessions
- average engagement time
- scroll depth
- assisted conversions

### 9.3 AI assistant traffic measurement
If GA4 exists, the agent should provide instructions for:
- AI referral channel grouping,
- source regex patterns,
- landing-page analysis,
- conversion analysis by AI referrals.

But the agent must state clearly: Google AI Overviews / AI Mode traffic is not separated into a special Search Console search type; it appears within regular web search reporting.

#### 9.3.1 Concrete implementation — `ai_referral_landing` event
For sites with GA4 (`gtag.js`), the assistants that send a real `document.referrer`
(ChatGPT, Perplexity, Claude, Copilot, etc. — *not* Google AI Overviews) can be
captured with a custom event:

1. On client-side landing, match `document.referrer`'s host against a source
   pattern list and, on a hit, fire:
   ```ts
   gtag('event', 'ai_referral_landing', {
     ai_source,            // 'chatgpt' | 'perplexity' | 'claude' | …
     page_path,            // location.pathname + search
     referrer,             // raw document.referrer
   });
   ```
2. In the GA4 UI: register `ai_source` as an event-scoped custom dimension, build a
   free-form exploration on the event, and optionally add an "AI Assistants" channel
   group.
3. Verify in GA4 **DebugView** before shipping.

See `.ai/examples/nextjs-analytics.ts` for a reference implementation (source
regex list, `detectAiSource`, `trackAiReferral`, client wiring, and the GA4 admin
+ DebugView checklist).

---

## 10. Required deliverables from the AI agent

The agent must not silently change everything. It must produce:

1. **Discovery summary**
2. **Audit report** with:
   - top SEO blockers
   - top Google AI visibility blockers
   - top broader AEO blockers
3. **Priority implementation plan**
4. **Proposed diffs/snippets** for:
   - robots.txt
   - llms.txt
   - sitemap setup
   - schema blocks
   - markdown routing (if applicable)
5. **Content rewrite proposals** for opening sections and FAQs
6. **Measurement setup instructions** for GA4 / Search Console
7. **.ai/docs/AEO-CHANGES.md** after implementation

---

## 11. Reusable prompts for AI agents

### Prompt A — Discovery first
```text
You are my AI visibility implementation agent for VijayaTech Labs.
Use `.ai/framework/aeo/AEO-FRAMEWORK.md` in this repository as your operating standard.
Do not start coding.
Ask every discovery question from Section 3, grouped clearly.
After I answer, summarize the project in 5-10 bullets and wait for approval.
```

### Prompt B — Dual audit
```text
Use `.ai/framework/aeo/AEO-FRAMEWORK.md`.
Audit this project against BOTH frameworks:
1. broader AEO implementation readiness
2. Google AI visibility readiness
Do not make changes yet.
Return:
- stack summary
- SEO blockers
- Google AI blockers
- broader AEO blockers
- priority-ordered action plan
- open questions
```

### Prompt C — Minimal high-impact plan
```text
Using `.ai/framework/aeo/AEO-FRAMEWORK.md`, propose the smallest high-impact implementation plan for this project.
Prioritize baseline eligibility first, then Google AI visibility, then broader AEO.
Do not implement until approved.
```

### Prompt D — Implement carefully
```text
Implement the approved plan using `.ai/framework/aeo/AEO-FRAMEWORK.md`.
Rules:
- keep changes minimal and framework-native
- show diffs/snippets for major files before finalizing
- do not force markdown twins or edge negotiation unless justified and approved
- use preferred twin headers (§8.4.3); stack-native routes only
- keep schema truthful
- on filtered listing pages, drive H1, answer-first intro, and metadata from one source of truth (§7.1)
- if you add markdown twins, wire all three discovery surfaces (HTML alternate link, sitemap.xml at lower priority, llms.txt) per §8.4.1; alternate href must match the actual twin route shape
- on Next.js App Router, never suffix /md after a catch-all — use /md/directory/[[...segments]] for directory twins (§8.4.2)
- if this is a Glint blog, follow Glint upgrade docs instead of re-implementing twins
- document every important change in .ai/docs/AEO-CHANGES.md
After implementation, give me a verification checklist.
```

### Prompt E — Content strengthening
```text
Using `.ai/framework/aeo/AEO-FRAMEWORK.md`, review the top priority pages.
Identify weak commodity content and propose stronger non-commodity rewrites.
Rewrite only the opening section first.
Also propose better headings, FAQs, proof elements, and media opportunities.
Do not edit files yet.
```

### Prompt F — Measurement setup
```text
Using `.ai/framework/aeo/AEO-FRAMEWORK.md`, inspect the analytics setup in this project.
Tell me whether GA4 appears installed, whether Search Console setup is referenced, and what information you still need.
Then provide exact next steps for:
- Search Console verification
- GA4 AI referral grouping
- quality/conversion measurement
Do not assume access to external accounts.
```

---

## 12. Final mandatory checklist

Before calling a project complete, the agent must confirm:

### SEO / Google eligibility
- [ ] Priority pages return 200 and are indexable.
- [ ] Googlebot is not accidentally blocked.
- [ ] sitemap.xml exists and is correct.
- [ ] canonical logic is correct.
- [ ] visible main content is accessible as text.
- [ ] on filtered listing pages (query-param or path-segment), the visible H1 and answer-first intro match the per-filter metadata, not a generic title (see §7.1).
- [ ] page experience issues on key pages were reviewed.
- [ ] structured data matches visible content.
- [ ] preview-control policy was reviewed intentionally.
- [ ] Search Console setup was checked or requested.

### Broader AEO
- [ ] llms.txt created or intentionally skipped.
- [ ] llms-full.txt considered (optional) or intentionally skipped — §8.4.5.
- [ ] robots.txt AI crawler policy reviewed (owner decision).
- [ ] markdown twins created or intentionally skipped.
- [ ] twin discovery wired where twins exist (HTML `alternates.types` link + sitemap.xml at lower priority + llms.txt) — see §8.4.1.
- [ ] twin preferred headers + duplicate policy (canonical Link, noindex policy) — §8.4.3; static-host headers if needed.
- [ ] edge content negotiation approved by human **or** intentionally skipped — §8.4.4.
- [ ] Google Indexing API **not** used for BlogPosting/general pages — §8.4.7.
- [ ] sitemap lastmod considered on priority URLs — §8.2.
- [ ] If Glint blog: blog AEO via Glint docs; site/app via OpenStart.
- [ ] IndexNow integrated or intentionally skipped — see §8.5:
  - [ ] valid key + live key file; keyLocation matches submitted URL prefixes (root or path-scoped).
  - [ ] submit runs only after deploy completion signal for this revision.
  - [ ] URL delta uses durable cursor (adds + updates + deletes); no auto full historic on first enable.
  - [ ] 200/202 treated as receipt; 429 backoff; batches ≤ 10_000; twins paired when present.
- [ ] answer-first improvements proposed.
- [ ] FAQ/comparison structure proposed where helpful.

### Measurement
- [ ] GA4 presence checked.
- [ ] AI referral measurement guidance prepared.
- [ ] conversion-quality metrics identified.
- [ ] .ai/docs/AEO-CHANGES.md added/updated.

This checklist is mandatory for every VijayaTech Labs project.