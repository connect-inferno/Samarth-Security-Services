import { SITE_URL, company, contact, seo } from '@/data/site';
import { branches } from '@/data/branches';

/**
 * schema.org structured data: an Organization/SecurityService for the company,
 * plus one LocalBusiness entry per branch (helps local search ranking).
 * Rendered as <script type="application/ld+json"> in the document head/body.
 */
export default function JsonLd() {
  const sameAs = [contact.instagram, SITE_URL];
  const areaServed = branches.map((b) => ({ '@type': 'City', name: b.city }));

  const organization = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'SecurityService'],
    '@id': `${SITE_URL}/#organization`,
    name: company.name,
    legalName: company.legalName,
    parentOrganization: { '@type': 'Organization', name: company.parent },
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}${seo.ogImage}`,
    description: seo.description,
    telephone: contact.phone,
    email: contact.email,
    foundingDate: company.foundingDate,
    founder: { '@type': 'Person', name: company.founder },
    sameAs,
    areaServed,
    slogan: company.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: branches[0].street,
      addressLocality: branches[0].city,
      addressRegion: branches[0].region,
      postalCode: branches[0].postalCode,
      addressCountry: 'IN',
    },
  };

  // One LocalBusiness per branch.
  const localBusinesses = branches.map((b) => ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#branch-${b.city.toLowerCase()}`,
    name: `${company.name} — ${b.city}`,
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    url: `${SITE_URL}/#branches`,
    telephone: contact.phone,
    email: contact.email,
    image: `${SITE_URL}${seo.ogImage}`,
    priceRange: '₹₹',
    areaServed: { '@type': 'City', name: b.city },
    address: {
      '@type': 'PostalAddress',
      streetAddress: b.street,
      addressLocality: b.locality,
      addressRegion: b.region,
      postalCode: b.postalCode,
      addressCountry: 'IN',
    },
  }));

  const graph = [organization, ...localBusinesses];

  return (
    <script
      type="application/ld+json"
      // The data is static and trusted, but we still escape the characters that
      // could terminate the <script> block early. That keeps this safe even if
      // someone later pastes markup into a branch address or company name.
      dangerouslySetInnerHTML={{ __html: safeJsonLd(graph) }}
    />
  );
}

/** JSON-stringify, neutralising sequences that can break out of a <script>. */
function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\u003c')
    .replace(/>/g, '\u003e')
    .replace(/&/g, '\u0026')
    // U+2028 / U+2029 are valid JSON but illegal raw in JS string literals.
    .replace(/\u2028/g, '\u2028')
    .replace(/\u2029/g, '\u2029');
}
