# Image assets

Most of this folder is now real content (logo, owner/founder photos, certificate
scans, service photos) rather than placeholders.

## Open Graph / social share images

`og-image.png` (home + every page that doesn't override it) and
`og-image-clients.png` (`/clients` only) are **generated, not hand-designed** —
composed from an SVG template embedding the real logo, then rasterized to PNG
with `sharp`. They're checked in as static files rather than generated at
request/build time via `next/og`'s `ImageResponse`, because that approach hit a
`TypeError: Invalid URL` bug in `next/dist/compiled/@vercel/og` on this
project's Windows dev machine during `next build` — regardless of the `runtime`
export, since Next's static prerendering always goes through the Node-compiled
path at build time. Shipping real static files sidesteps that entirely and
works identically regardless of the build platform.

**To regenerate them** (e.g. after a stat changes in `data/clients.ts`, or the
logo is replaced): the generation script isn't checked into the repo since it's
a one-off tool, not app code. Recreate it as a Node script that:

1. Reads `public/images/samarth_logo.jpg`, base64-encodes it.
2. Builds a 1200×630 SVG string (navy gradient background `#002451→#00183A`,
   accent `#C8202F`, the embedded logo via `<image>`, `Arial, sans-serif`
   bold/uppercase text — a system font, not a custom one, so it renders
   identically everywhere without a font-loading dependency).
3. Rasterizes with `sharp(Buffer.from(svg)).png().toFile(...)`.

`npm install --no-save sharp` first if it isn't already available locally —
it's not a project dependency, just a one-off tool for this task.

## Everything else

| File                                    | Used by                |
| ---------------------------------------- | ----------------------- |
| `samarth_logo.jpg`                       | `components/Logo.tsx`, header/footer, OG images, JSON-LD |
| `gadage_logo.jpg`                        | favicon / apple-touch-icon (`app/layout.tsx`) |
| `owner.png`, `parents.png`, `bni.png`    | `components/LeadershipCarousel.tsx` |
| `psara_license.jpg`, `iso_9001.jpg`, `epf_certificate_*.jpg`, `esic_certificate_*.jpg`, `gst_certificate_*.jpg`, `msme_certificate_*.jpg` | `components/Compliance.tsx` lightbox |
| `services/*`                             | Services cards |
| `hero.jpg`, `hero.mp4`                   | Hero background |

Keep alt text intact when swapping any of these — it's already written for SEO.
Optimize/compress new images before adding them (e.g. Squoosh) for fast Core
Web Vitals.
