/**
 * Central image sources.
 *
 * These are royalty-free stock photos hotlinked from the Unsplash CDN so the
 * site looks finished right now. To use your own assets, drop files in
 * /public/images and replace the URLs below with local paths, e.g.
 *   hero: '/images/hero.jpg'
 * (Local images are faster and remove the third-party dependency.)
 *
 * The `w`/`q` query params ask Unsplash for a sensibly sized, compressed image;
 * next/image then optimizes further.
 */

const unsplash = (id: string, w = 1600, q = 70) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const images = {
  // Security guard in a navy uniform on duty in a premium corporate lobby.
  hero: '/images/hero.jpg',
  heroVideo: '/images/hero.mp4',
  heroAlt:
    'Uniformed Samarth Security guard on duty in a corporate building lobby in Maharashtra',
  owner: '/images/owner.png',
  ownerAlt: 'Akash Shubhangi Birudev Gadade — Founder & Managing Director of Samarth Security (Gadade Group)',
  parents: '/images/parents.png',
  parentsAlt: 'Birudev Janappa Gadade & Shubhangi Birudev Gadade — Founding Pillars & Inspiration of Gadade Group',
  bni: '/images/bni.png',
  bniAlt: 'Akash Shubhangi Birudev Gadade receiving official BNI (Business Network International) membership',
  serviceImages: {
    // NOTE: hotlinked Unsplash photos can be deleted by their author at any
    // time — the previous ID here started returning 404. Before launch, download
    // these into /public/images/services/ and reference them locally so the site
    // never depends on a third party staying up. See README → "Swapping in real images".
    'Security Services': '/images/services/security-services.jpg',
    'Gunman Services': '/images/services/gunman-services.jpg',
    'Bouncer Services': '/images/services/bouncer-services.jpg',
    'Housekeeping Services': '/images/services/housekeeping-services.jpg',
    'Sweeper Services': '/images/services/sweeper-services.jpg',
    'Office Boy Services': '/images/services/office-boy-services.jpg',
    'Tech & Non-Tech Staff': '/images/services/tech-staff.jpg',
    'Labour Services': '/images/services/labour-services.jpg',
    'Support Services': '/images/services/office-boy-services.jpg',
    'Manpower Services': '/images/services/labour-services.jpg',
  } as Record<string, string>,
};
