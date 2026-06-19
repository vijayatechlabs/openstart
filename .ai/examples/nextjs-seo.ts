/**
 * nextjs-seo.ts — reference JSON-LD builders for Next.js App Router.
 *
 * Illustration only (per `.ai/examples/README.md`). Copy into your project
 * (e.g. `lib/seo.ts`), wire to real data, and delete the fields you cannot
 * fill truthfully. Schema must match visible content — never emit fake
 * reviews, prices, ratings, or fields you do not actually render
 * (AEO-FRAMEWORK §8.3).
 *
 * Render the output inside a page/layout:
 *
 *   <script
 *     type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: serializeJsonLd(organization({ ... })) }}
 *   />
 */

/** Set `metadataBase` in root `layout.tsx`; use env for absolute schema URLs. */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';
}

/**
 * Serialize a JSON-LD object for a <script type="application/ld+json"> tag.
 * Escapes `<` to avoid breaking out of the script element with `</script>`
 * or HTML-comment sequences embedded in data.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/** Absolute URL helper — schema `@id`/`url` values should be absolute. */
function abs(path = '/'): string {
  return new URL(path, getSiteUrl()).toString();
}

type Organization = {
  name: string;
  url?: string;
  /** Path or absolute URL to the logo. */
  logo?: string;
  /** Social / canonical profile URLs (sameAs). */
  sameAs?: string[];
};

export function organization(org: Organization) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${abs('/')}#organization`,
    name: org.name,
    url: org.url ?? abs('/'),
    ...(org.logo && { logo: abs(org.logo) }),
    ...(org.sameAs?.length && { sameAs: org.sameAs }),
  };
}

type WebSite = {
  name: string;
  url?: string;
  /** Provide only if a real on-site search endpoint exists. */
  searchUrlTemplate?: string; // e.g. `${SITE_URL}/search?q={search_term_string}`
};

export function website(site: WebSite) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${abs('/')}#website`,
    name: site.name,
    url: site.url ?? abs('/'),
    publisher: { '@id': `${abs('/')}#organization` },
    ...(site.searchUrlTemplate && {
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: site.searchUrlTemplate,
        },
        'query-input': 'required name=search_term_string',
      },
    }),
  };
}

type Crumb = { name: string; path: string };

/** Pass breadcrumb items in order, root first. */
export function breadcrumbList(items: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

type LocalBusiness = {
  name: string;
  /** Schema.org subtype, e.g. 'Restaurant', 'Store'. Defaults to LocalBusiness. */
  type?: string;
  /** Page path for per-entity JSON-LD (e.g. '/provider/acme'). Required on entity pages. */
  path: string;
  url?: string;
  telephone?: string;
  image?: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode: string;
    addressCountry: string; // ISO 3166-1 alpha-2, e.g. 'IN'
  };
  geo?: { latitude: number; longitude: number };
  /** ISO 8601 opening hours, e.g. ['Mo-Fr 09:00-18:00']. */
  openingHours?: string[];
};

export function localBusiness(biz: LocalBusiness) {
  return {
    '@context': 'https://schema.org',
    '@type': biz.type ?? 'LocalBusiness',
    '@id': `${abs(biz.path)}#localbusiness`,
    name: biz.name,
    url: biz.url ?? abs(biz.path),
    ...(biz.telephone && { telephone: biz.telephone }),
    ...(biz.image && { image: abs(biz.image) }),
    address: { '@type': 'PostalAddress', ...biz.address },
    ...(biz.geo && {
      geo: { '@type': 'GeoCoordinates', ...biz.geo },
    }),
    ...(biz.openingHours?.length && { openingHours: biz.openingHours }),
  };
}

type Faq = { question: string; answer: string };

/**
 * FAQPage — use on a dedicated `/faq` page (§7.5). Only include Q&A that is
 * also visible on the page; never emit hidden or invented FAQs.
 */
export function faqPage(faqs: Faq[], path = '/faq') {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${abs(path)}#faqpage`,
    url: abs(path),
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

type AboutPage = { name: string; path?: string; description?: string };

/** AboutPage — use on a dedicated `/about` page; link the publisher org. */
export function aboutPage(page: AboutPage) {
  const path = page.path ?? '/about';
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${abs(path)}#aboutpage`,
    url: abs(path),
    name: page.name,
    ...(page.description && { description: page.description }),
    publisher: { '@id': `${abs('/')}#organization` },
  };
}

type WebPage = { name: string; path: string; description?: string };

/** Generic WebPage — use for trust/policy pages such as `/trust` (§7.5). */
export function webPage(page: WebPage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${abs(page.path)}#webpage`,
    url: abs(page.path),
    name: page.name,
    ...(page.description && { description: page.description }),
    isPartOf: { '@id': `${abs('/')}#website` },
  };
}
