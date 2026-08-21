import { SITE_URL } from '@/data/site';

/**
 * Per-page BreadcrumbList structured data. Rendered by individual sub-pages
 * (not the root layout — breadcrumbs are inherently page-specific, so a
 * single global copy in JsonLd.tsx would emit the same trail on every page).
 *
 * `items` should NOT include "Home" — it's prepended automatically.
 */
export default function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const trail = [{ name: 'Home', path: '/' }, ...items];

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}

/** Same escaping as components/JsonLd.tsx (see that file for why). */
function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\u003c')
    .replace(/>/g, '\u003e')
    .replace(/&/g, '\u0026')
    // U+2028 / U+2029 are valid JSON but illegal raw in JS string literals.
    .replace(/\u2028/g, '\u2028')
    .replace(/\u2029/g, '\u2029');
}
