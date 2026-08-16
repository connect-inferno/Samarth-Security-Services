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
  serviceImages: {
    // NOTE: hotlinked Unsplash photos can be deleted by their author at any
    // time — the previous ID here started returning 404. Before launch, download
    // these into /public/images/services/ and reference them locally so the site
    // never depends on a third party staying up. See README → "Swapping in real images".
    'Security Services': unsplash('photo-1521791136064-7986c2920216', 1000, 80),
    'Gunman Services': unsplash('photo-1582139329536-e7284fece509', 1000, 80),
    'Bouncer Services': unsplash('photo-1571019613454-1cb2f99b2d8b', 1000, 80),
    'Housekeeping Services': unsplash('photo-1581578731548-c64695cc6952', 1000, 80),
    'Sweeper Services': unsplash('photo-1527515637462-cff94eecc1ac', 1000, 80),
    'Office Boy Services': unsplash('photo-1507003211169-0a1dd7228f2d', 1000, 80),
    'Tech & Non-Tech Staff': unsplash('photo-1581092160607-ee22621dd758', 1000, 80),
    'Labour Services': unsplash('photo-1586528116311-ad8dd3c8310d', 1000, 80),
    'Support Services': unsplash('photo-1497215728101-856f4ea42174', 1000, 80),
    'Manpower Services': unsplash('photo-1522071820081-009f0129c71c', 1000, 80),
  } as Record<string, string>,
};
