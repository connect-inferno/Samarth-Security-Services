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

export const clients: Client[] = [
  { name: 'Central GST Office', sector: 'Government & Public Sector', city: 'Jaysingpur & Ichalkaranji', note: 'Statutory guarding & premises security' },
  { name: 'Ghodawat Bungalow', sector: 'VIP Residence & Estate', city: 'Jaysingpur', note: '24/7 manned VIP guarding' },
  { name: 'K-Gidwani Group', sector: 'Corporate & Business Group', city: 'Sangli', note: 'Corporate facility management & security' },
  { name: 'Rajdhani Group', sector: 'Industrial & Commercial', city: 'Kupwad', note: 'Industrial area guarding & gate control' },
  { name: 'Patwardhan Bungalow', sector: 'Heritage & Executive Estate', city: 'Miraj', note: 'Estate security & access supervision' },
  { name: 'Varad Stone Crushers', sector: 'Industrial & Infrastructure', city: 'Boregaon', note: 'Plant security & heavy machinery protection' },
  { name: 'Delta Laboratory', sector: 'Healthcare & Diagnostics', city: 'Sangli', note: 'Facility housekeeping & front-desk security' },
  { name: 'Manan Construction', sector: 'Real Estate & Infrastructure', city: 'Jaysingpur', note: 'Site security & material custody' },
  { name: 'Vyankatesh Society', sector: 'Residential Housing Society', city: 'Dhamani', note: 'Society security & maintenance staff' },
  { name: 'Khade Sir Bungalow', sector: 'VIP Residence', city: 'Sangli', note: 'Round-the-clock residential security' },
  { name: 'Majati Jewellers', sector: 'Retail & Luxury Showroom', city: 'Miraj', note: 'Armed security & retail loss prevention' },
];

/** 3 curated rows for the animated homepage strips */
export const clientRows = {
  row1: [
    { name: 'Central GST Office', sector: 'Government & Public Sector', city: 'Jaysingpur & Ichalkaranji' },
    { name: 'K-Gidwani Group', sector: 'Corporate & Business', city: 'Sangli' },
    { name: 'Rajdhani Group', sector: 'Industrial & Commercial', city: 'Kupwad' },
    { name: 'Manan Construction', sector: 'Real Estate & Construction', city: 'Jaysingpur' },
    { name: 'Delta Laboratory', sector: 'Healthcare & Diagnostics', city: 'Sangli' },
    { name: 'Majati Jewellers', sector: 'Retail & Luxury Showroom', city: 'Miraj' },
  ],
  row2: [
    { name: 'Varad Stone Crushers', sector: 'Industrial & Infrastructure', city: 'Boregaon' },
    { name: 'Ghodawat Bungalow', sector: 'VIP Residence & Estate', city: 'Jaysingpur' },
    { name: 'Vyankatesh Society', sector: 'Residential Housing Society', city: 'Dhamani' },
    { name: 'Patwardhan Bungalow', sector: 'Heritage & Executive Estate', city: 'Miraj' },
    { name: 'Khade Sir Bungalow', sector: 'VIP Residence', city: 'Sangli' },
    { name: 'Central GST Office', sector: 'Government & Public Sector', city: 'Jaysingpur & Ichalkaranji' },
  ],
  row3: [
    { name: 'Ghodawat Bungalow', sector: 'VIP Residence & Estate', city: 'Jaysingpur' },
    { name: 'Rajdhani Group', sector: 'Industrial & Commercial', city: 'Kupwad' },
    { name: 'Majati Jewellers', sector: 'Retail & Luxury Showroom', city: 'Miraj' },
    { name: 'Varad Stone Crushers', sector: 'Industrial & Mining', city: 'Boregaon' },
    { name: 'Manan Construction', sector: 'Real Estate & Construction', city: 'Jaysingpur' },
    { name: 'Vyankatesh Society', sector: 'Residential Society', city: 'Dhamani' },
    { name: 'K-Gidwani Group', sector: 'Corporate Group', city: 'Sangli' },
    { name: 'Patwardhan Bungalow', sector: 'Heritage Estate', city: 'Miraj' },
  ],
};

/** Headline numbers for trust proof. */
export const clientStats = [
  { value: '150+', label: 'Active Clients' },
  { value: '10+', label: 'Cities Served' },
  { value: '300+', label: 'Sites Secured' },
  { value: '98%', label: 'Client Retention' },
];

/** Testimonials across sectors and Maharashtra cities. */
export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company?: string;
  city?: string;
  sector?: string;
  rating?: number;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'Samarth Security has provided exceptional guarding and night-patrolling services for our manufacturing plant. Their field officers and supervisors maintain military-grade discipline and zero absenteeism.',
    author: 'Rajesh Patil',
    role: 'Plant & Operations Head',
    company: 'Engineering & Manufacturing Plant',
    city: 'Kolhapur',
    sector: 'Industrial & Manufacturing',
    rating: 5,
  },
  {
    quote:
      'We deployed Samarth Security guards and facility housekeeping across our large residential campus in Pune. The guards are punctual, alert, courteous, and their escalation matrix resolves issues rapidly.',
    author: 'Sunil Deshmukh',
    role: 'Managing Committee Secretary',
    company: 'Premium Residential Society',
    city: 'Pune',
    sector: 'Housing Societies',
    rating: 5,
  },
  {
    quote:
      'Finding a fully PSARA, EPF, and ESIC compliant security and housekeeping partner was our top priority. Samarth Security delivers 100% statutory transparency, disciplined manpower, and professional reporting.',
    author: 'Amitabh Kulkarni',
    role: 'Senior Facility Director',
    company: 'Corporate Business Park',
    city: 'Mumbai',
    sector: 'Corporate & IT Parks',
    rating: 5,
  },
  {
    quote:
      'Their round-the-clock supervision and quick response in Sangli have been unmatched. Whenever we require additional trained security or housekeeping staff, they coordinate and deploy seamlessly.',
    author: 'Mahesh Jadhav',
    role: 'Commercial Operations Manager',
    company: 'Retail & Multiplex Complex',
    city: 'Sangli',
    sector: 'Retail & Commercial',
    rating: 5,
  },
];
