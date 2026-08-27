/**
 * Global site constants: contact details, links, SEO defaults.
 * Edit values here — they flow through every component and the metadata/JSON-LD.
 */

/**
 * Canonical production origin — used for canonical URLs, Open Graph, the
 * sitemap, robots.txt and JSON-LD.
 *
 * Set `NEXT_PUBLIC_SITE_URL` in your host's environment (Vercel → Settings →
 * Environment Variables) so preview and production deploys each advertise the
 * right origin; the literal below is the fallback for local development.
 *
 * Note: this is a NEXT_PUBLIC_ value and is therefore embedded in the client
 * bundle. That is fine — it is not a secret. Never put API keys or tokens in a
 * NEXT_PUBLIC_ variable.
 */
const _siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? '').trim();
export const SITE_URL = (_siteUrl && _siteUrl !== '/')
  ? _siteUrl.replace(/\/$/, '')
  : 'https://samarthsecurityservices.gadadegroup.in'; // fallback — set NEXT_PUBLIC_SITE_URL in Vercel env vars

/**
 * The Gadade Group's own corporate site. Samarth Security is one of its
 * divisions (this site lives on a subdomain of it: samarthsecurityservices.gadadegroup.in).
 *
 * Used to link the two sites together — a real footer link for genuine
 * PageRank/trust flow, plus the JSON-LD `parentOrganization`/`sameAs` fields
 * so search engines understand the relationship structurally, not just
 * visually. See README → "SEO across the two Gadade Group domains" for the
 * full picture, including the steps only doable outside this repo (Search
 * Console, a reciprocal link from gadadegroup.in's own site).
 */
export const PARENT_SITE_URL = 'https://www.gadadegroup.in';

export const company = {
  name: 'Samarth Security',
  legalName: 'Samarth Security (Gadade Group)',
  parent: 'Gadade Group',
  parentUrl: PARENT_SITE_URL,
  founder: 'Akash Shubhangi Birudev Gadade',
  established: '14 June 2020',
  foundingDate: '2020-06-14',
  tagline: 'Integrity · Teamwork · Attitude · Performance · Passion',
  shortTagline: 'Trusted Security, Housekeeping & Manpower Services',
};

export const contact = {
  phone: '+919960099953',
  phoneDisplay: '+91 99600 99953',
  whatsapp: '919960099953',
  email: 'samarthmultiservices1100@gmail.com',
  instagram: 'https://instagram.com/gadade_group',
  instagramHandle: '@gadade_group',
};

/** Prefilled WhatsApp links. */
export const whatsappQuote = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
  "Hi, I'd like a quote for security/housekeeping services",
)}`;

export const whatsappGreeting = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
  'Hi Samarth Security, I have an enquiry.',
)}`;

export const whatsappForService = (service: string) =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    `Hi Samarth Security, I'd like to enquire about ${service}.`,
  )}`;

export const telHref = `tel:${contact.phone}`;
export const mailHref = `mailto:${contact.email}`;

/**
 * Primary navigation used in the header.
 * Streamlined to core destinations for a clean, modern navbar.
 */
export const navLinks = [
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Clients', href: '/clients' },
  { label: 'Contact', href: '/#contact' },
];

/**
 * Extended navigation used by the footer for comprehensive site exploration.
 */
export const footerNavLinks = [
  { label: 'Services', href: '/#services' },
  { label: 'About Us', href: '/#about' },
  { label: 'Compliance & PSARA', href: '/#compliance' },
  { label: 'Client Reviews', href: '/#testimonials' },
  { label: 'Our Clients', href: '/clients' },
  { label: 'Branches', href: '/#branches' },
  { label: 'Contact Us', href: '/#contact' },
];

export const seo = {
  title:
    'Samarth Security | PSARA Licensed Security & Housekeeping Services in Maharashtra',
  description:
    'Samarth Security (Gadade Group) is a PSARA-licensed security, housekeeping & manpower agency in Maharashtra. EPF, ESIC, GST & Shop Act compliant. Trained guards & facility staff across Sangli, Mumbai, Pune, Ahilyanagar, Kolhapur, Solapur, Dharashiv & Satara.',
  // Real 1200×630 PNGs, checked into the repo (see public/images/README.md
  // for how they were generated and how to regenerate them).
  ogImage: '/images/og-image.png',
};
