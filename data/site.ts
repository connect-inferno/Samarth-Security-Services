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
  : 'https://www.samarthsecurity.in'; // fallback — set NEXT_PUBLIC_SITE_URL in Vercel env vars

export const company = {
  name: 'Samarth Security',
  legalName: 'Samarth Security (Gadade Group)',
  parent: 'Gadade Group',
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
 * Navigation used by the header and footer.
 * Hrefs are root-relative (`/#about`) so they work from sub-pages like
 * /clients as well as from the home page itself.
 */
export const navLinks = [
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Compliance', href: '/#compliance' },
  { label: 'Reviews', href: '/#testimonials' },
  { label: 'Clients', href: '/clients' },
  { label: 'Branches', href: '/#branches' },
  { label: 'Contact', href: '/#contact' },
];

export const seo = {
  title:
    'Samarth Security | PSARA Licensed Security & Housekeeping Services in Maharashtra',
  description:
    'Samarth Security (Gadade Group) is a PSARA-licensed security, housekeeping & manpower agency in Maharashtra. EPF, ESIC, GST & Shop Act compliant. Trained guards & facility staff across Sangli, Mumbai, Pune, Ahilyanagar, Kolhapur, Solapur, Dharashiv & Satara.',
  ogImage: '/images/og-image.jpg', // TODO: replace with a real 1200×630 OG image
};
