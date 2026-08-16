/**
 * Clients served.
 *
 * ── HOW TO EDIT ──────────────────────────────────────────────────────────
 * Add/remove entries in `clients` below. Each one renders a logo card on the
 * /clients page. Until you have real logos, `logo` can stay undefined and a
 * clean monogram placeholder is shown instead.
 *
 * To add a real logo: drop the file in /public/images/clients/ and set
 *   logo: '/images/clients/acme.png'
 * Keep logos on a transparent or white background, roughly 400×200.
 *
 * `sectors` drives the filter/grouping headings on the page.
 */

export type Client = {
  name: string;
  sector: string;
  city?: string;
  /** Optional path to a real logo file in /public/images/clients/ */
  logo?: string;
  /** Optional one-line note on the engagement. */
  note?: string;
};

/** Sector buckets, in display order. */
export const sectors = [
  'Corporate & IT Parks',
  'Industrial & Manufacturing',
  'Housing Societies',
  'Retail & Hospitality',
  'Healthcare & Education',
] as const;

/**
 * [PLACEHOLDER DATA] — replace these with your real client names.
 * Tip: get written permission before publishing a client's name or logo.
 */
export const clients: Client[] = [
  { name: '[Client Name 1]', sector: 'Corporate & IT Parks', city: 'Pune', note: 'Manned guarding & housekeeping' },
  { name: '[Client Name 2]', sector: 'Corporate & IT Parks', city: 'Mumbai', note: 'Gate & area security' },
  { name: '[Client Name 3]', sector: 'Corporate & IT Parks', city: 'Sangli' },
  { name: '[Client Name 4]', sector: 'Industrial & Manufacturing', city: 'Kolhapur', note: 'Round-the-clock plant security' },
  { name: '[Client Name 5]', sector: 'Industrial & Manufacturing', city: 'Satara' },
  { name: '[Client Name 6]', sector: 'Industrial & Manufacturing', city: 'Solapur', note: 'Skilled & unskilled manpower' },
  { name: '[Client Name 7]', sector: 'Housing Societies', city: 'Pune', note: 'Society security & upkeep' },
  { name: '[Client Name 8]', sector: 'Housing Societies', city: 'Mumbai' },
  { name: '[Client Name 9]', sector: 'Retail & Hospitality', city: 'Kolhapur', note: 'Mall & multiplex security' },
  { name: '[Client Name 10]', sector: 'Retail & Hospitality', city: 'Ahilyanagar' },
  { name: '[Client Name 11]', sector: 'Healthcare & Education', city: 'Dharashiv', note: 'Campus security & housekeeping' },
  { name: '[Client Name 12]', sector: 'Healthcare & Education', city: 'Sangli' },
];

/** Headline numbers for the clients page. */
export const clientStats = [
  { value: '150+', label: 'Active Clients' },
  { value: '10+', label: 'Cities Served' },
  { value: '300+', label: 'Sites Secured' },
  { value: '98%', label: 'Client Retention' },
];

/** Testimonials. Replace with real, attributable quotes (with permission). */
export type Testimonial = { quote: string; author: string; role: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      '[PLACEHOLDER] Add a real client testimonial here — a sentence or two about response time, guard discipline or supervision quality works best.',
    author: '[Client Contact Name]',
    role: '[Designation, Company]',
  },
  {
    quote:
      '[PLACEHOLDER] A second testimonial, ideally from a different sector (housing society, factory or corporate office).',
    author: '[Client Contact Name]',
    role: '[Designation, Company]',
  },
  {
    quote:
      '[PLACEHOLDER] A third testimonial. Keep these short — two sentences reads better than a paragraph.',
    author: '[Client Contact Name]',
    role: '[Designation, Company]',
  },
];
