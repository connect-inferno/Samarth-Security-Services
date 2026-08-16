/**
 * Branch / coverage data. Add, remove, or edit branches here — the Branches
 * section, the Footer, and the per-branch LocalBusiness JSON-LD all read from
 * this single list.
 */

export type Branch = {
  city: string;
  label?: string; // e.g. "Registered / Head Office"
  isHeadOffice?: boolean;
  street: string;
  locality: string;
  region: string; // state
  postalCode: string;
  /** Optional Google Maps query used for links (defaults to full address). */
  mapQuery?: string;
  /**
   * Approximate coordinates, used only to plot the branch on the Maharashtra
   * map graphic. City/taluka-level accuracy is fine here — refine them from
   * Google Maps (right-click a pin → the lat,lng at the top of the menu) if you
   * want the dots to sit exactly on each office.
   */
  coords: { lat: number; lng: number };
};

export const branches: Branch[] = [
  {
    city: 'Sangli',
    label: 'Registered / Head Office',
    isHeadOffice: true,
    street: 'S.No. 247 A1, Shop No. 38-2, 100 Ft Rd., Sanjay Nagar',
    locality: 'Sangli',
    region: 'Maharashtra',
    postalCode: '416416',
    coords: { lat: 16.8524, lng: 74.5815 },
  },
  {
    city: 'Mumbai',
    street: 'Mhada Colony, Mulund (East)',
    locality: 'Mumbai',
    region: 'Maharashtra',
    postalCode: '400081',
    coords: { lat: 19.1726, lng: 72.9565 },
  },
  {
    city: 'Pune',
    street: '48, Rahatni Phata, Pimpri Chinchwad',
    locality: 'Pune',
    region: 'Maharashtra',
    postalCode: '411017',
    coords: { lat: 18.6011, lng: 73.7641 },
  },
  {
    city: 'Ahilyanagar',
    street: 'A/P. Barabhai Wasti, Tanpure Wadi Road, Tal- Rahuri',
    locality: 'Dist- Ahilyanagar',
    region: 'Maharashtra',
    postalCode: '413705',
    coords: { lat: 19.3925, lng: 74.6497 },
  },
  {
    city: 'Kolhapur',
    street: '1215, Sangamnagar, Khotwadi, Tal- Hatkanangle',
    locality: 'Dist- Kolhapur',
    region: 'Maharashtra',
    postalCode: '416121',
    coords: { lat: 16.7800, lng: 74.4400 },
  },
  {
    city: 'Solapur',
    street: 'Anakdhal Toll Plaza, Sangola',
    locality: 'Dist- Solapur',
    region: 'Maharashtra',
    postalCode: '413412',
    coords: { lat: 17.4386, lng: 75.1926 },
  },
  {
    city: 'Dharashiv',
    street: 'Saramkundi Phata, Yashwandi, Tal- Washi',
    locality: 'Dist- Dharashiv',
    region: 'Maharashtra',
    postalCode: '413503',
    coords: { lat: 18.3400, lng: 75.9800 },
  },
  {
    city: 'Satara',
    street: 'Amar Laxmi Sadan, Amar Laxmi Stop, Sambhaji Nagar, Kodoli',
    locality: 'Satara',
    region: 'Maharashtra',
    postalCode: '415004',
    coords: { lat: 17.6805, lng: 74.0183 },
  },
];

/** Cities we serve, used in copy and SEO. */
export const serviceCities = branches.map((b) => b.city);

/** Human-friendly single-line address. */
export function fullAddress(b: Branch): string {
  return `${b.street}, ${b.locality}, ${b.region} – ${b.postalCode}`;
}

/** Google Maps link for a branch — opens directions/search for that office. */
export function mapsHref(b: Branch): string {
  const q = b.mapQuery ?? `Samarth Security, ${fullAddress(b)}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}
