# Samarth Security — Marketing Website

Single-page marketing site for **Samarth Security** (a division of **Gadade Group**), a
PSARA-licensed security, housekeeping & manpower services company in Maharashtra.

Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS**, with **Framer Motion**
for subtle scroll-in animations. SEO is a first-class feature (metadata, Open Graph/Twitter
cards, JSON-LD `Organization` + per-branch `LocalBusiness`, sitemap, robots, semantic HTML).

---

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint (next/core-web-vitals)
```

---

## Project structure

```
app/
  layout.tsx        # fonts (next/font), SEO metadata, OG/Twitter, JSON-LD injection
  page.tsx          # home page — assembles all sections in order
  clients/page.tsx  # /clients page (metadata + layout)
  privacy-policy/page.tsx  # /privacy-policy
  terms/page.tsx           # /terms
  globals.css       # Tailwind + design tokens (buttons, cards, sections, type)
  sitemap.ts        # auto-generated /sitemap.xml
  robots.ts         # auto-generated /robots.txt
components/          # one component per section + shared helpers
  Header, Hero, TrustBar, About, Services, Operations, Compliance,
  Branches, WhyChooseUs, Social, Contact, Footer, FloatingWhatsApp
  ClientsPage       # the whole /clients page body
  LegalPage         # shared layout for Privacy Policy / Terms
  MaharashtraMap    # inline SVG coverage map (no image or API key needed)
  Logo, Reveal (animation), ImagePlaceholder, JsonLd, icons
data/
  site.ts           # phone/WhatsApp/email/links, nav, SEO defaults ← contact info here
  content.ts        # ALL home-page copy (edit text without touching JSX)
  branches.ts       # the 8 branch addresses (drives Branches, Footer & JSON-LD)
  clients.ts        # client roster, sectors, stats & testimonials  ← /clients data
  legal.ts          # Privacy Policy + Terms copy  ← legal pages
  images.ts         # image URLs (stock photos today, your files later)
public/images/       # drop real logo, photos & certificate scans here
```

**To edit text:** change `data/content.ts`.
**To change phone / WhatsApp / email / Instagram:** change `data/site.ts`.
**To edit the clients page:** change `data/clients.ts`.

---

## Design system

The look is driven by a few tokens in `tailwind.config.ts` + `app/globals.css`:

| Token | Value | Used for |
| ----- | ----- | -------- |
| `primary` | `#002451` | navy — headings, footer, dark sections |
| `primary-dark` | `#00183A` | footer, overlays |
| `secondary` | `#7C0202` | maroon — CTA bands |
| `accent` | `#C8202F` | red — buttons, eyebrows, highlights |
| `soft` | `#F2F4F7` | alternating section background |
| `muted` | `#5A6B85` | body/secondary text |
| `shadow-soft` / `shadow-lift` | wide, low-opacity | card rest / hover |

Conventions worth keeping if you extend the site:

- **Sharp corners** (no border radius) on cards, buttons and images.
- **Big, tightly-tracked headings** — use the `.display` and `.section-title` classes
  (Manrope, uppercase, `letter-spacing: -0.04/-0.05em`).
- **Generous section padding** (`.section` = 80→128px) — the whitespace is what makes
  it feel premium.
- Helper classes: `.btn` / `.btn-primary` / `.btn-outline`, `.card` + `.card-hover`,
  `.eyebrow`, `.lede`, `.rule`.

> **Note:** hover-lift styling must go on a plain element *inside* a `<Reveal>`, never on
> `<Reveal>` itself — Framer Motion writes an inline `transform` that would override a
> CSS `:hover` transform.

---

## Swapping in real images

Every image is currently a **labeled placeholder** (`components/ImagePlaceholder.tsx`) at the
correct aspect ratio, with the final **alt text already written**. To use a real image:

1. Add the file under `public/images/…` (see `public/images/README.md` for the list & sizes).
2. In the relevant component, replace the `<ImagePlaceholder … />` with `next/image` — each
   placeholder has a comment showing the exact snippet, e.g.:

   ```tsx
   import Image from 'next/image';

   <Image
     src="/images/services/security.jpg"
     alt="PSARA licensed security guard on duty at a Pune corporate office"
     width={1000}
     height={625}
     className="h-full w-full object-cover"
     // add `priority` only for above-the-fold images
   />
   ```

   Always keep `width`/`height` (or `fill` on a sized parent) to avoid layout shift, and keep
   the existing `alt` text — it's SEO-tuned.

- **Logo:** `components/Logo.tsx` (add `public/images/logo.png`).
- **Certificates:** `components/Compliance.tsx` — the card thumbnail *and* the lightbox.
- **Maharashtra map:** already a real inline SVG (`components/MaharashtraMap.tsx`) — see below.
- **OG share image:** add `public/images/og-image.jpg` (1200×630); it's already referenced.

---

## Updating branch data

Edit the array in `data/branches.ts`. Each entry automatically updates:
the **Branches** section cards, the **Footer** address list, and the **per-branch
LocalBusiness JSON-LD**. Add or remove branches freely.

---

## Filling in real numbers

Search the project for `[PLACEHOLDER]` and replace every hit with real, verified figures:

- `data/content.ts` → `hero.stats` (the strip at the base of the hero)
- `data/content.ts` → `whyChooseUs.stats`
- `data/clients.ts` → `clientStats`

## The Clients page (`/clients`)

Everything on this page comes from `data/clients.ts`:

- `clients` — the roster. Each entry has `name`, `sector`, optional `city`, `note` and `logo`.
  Until you add a `logo` path, a clean monogram placeholder is drawn from the name.
  To use a real logo, drop the file in `public/images/clients/` and set
  `logo: '/images/clients/acme.png'` (transparent or white background, ~400×200).
- `sectors` — the grouping headings, in display order.
- `clientStats` — the four headline numbers.
- `testimonials` — quotes shown lower down.

The current names, notes and testimonials are **placeholders**. Get written permission from a
client before publishing their name or logo.

---

## Wiring up the contact form

The form in `components/Contact.tsx` currently opens the visitor's email client via `mailto:`
to `samarthmultiservices1100@gmail.com` — zero backend needed. To capture submissions instead,
see the comment block at the top of that file (Formspree or Resend + an API route).

---

## SEO checklist (already implemented)

- ✅ Exactly one `<h1>` (hero); correct `h2`/`h3`/`h4` hierarchy throughout.
- ✅ Unique `<title>` + meta description (mentions PSARA/EPF/ESIC/GST/Shop Act + all cities).
- ✅ Open Graph + Twitter card tags with a placeholder OG image.
- ✅ JSON-LD `Organization`/`SecurityService` + one `LocalBusiness` per branch, with
  `areaServed` covering all 8 cities.
- ✅ Descriptive, keyword-aware `alt` text on every image slot.
- ✅ Auto-generated `sitemap.xml` and `robots.txt`.
- ✅ Semantic HTML5 landmarks (`header`/`nav`/`main`/`section`/`footer`), accessible
  buttons/links, visible focus states.
- ✅ `next/font` (Inter + Manrope, 2 weights each), lazy-loaded map & below-the-fold images,
  fixed image dimensions to avoid layout shift.
- ✅ Mobile-first responsive layout, verified at 360 / 375 / 768 / 1024 / 1280 / 1536 / 1920 px;
  the container scales up to 1660px so wide monitors aren't left with dead space.

> After deploying, set your real domain in `data/site.ts` (`SITE_URL`) so canonical URLs,
> sitemap, robots and JSON-LD all point to production.

---

## Deploying to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import it at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects Next.js.
3. Deploy. Image optimization and everything else work out of the box.
4. Set `SITE_URL` in `data/site.ts` to your production domain and redeploy.

### Static export (optional)

For a fully static host (Netlify, GitHub Pages, S3, any CDN):

1. In `next.config.mjs`, uncomment `output: 'export'` **and** `images: { unoptimized: true }`.
2. Run `npm run build` → static files are emitted to `out/`.

Note: static export disables the Next.js image optimizer, so pre-compress your images.

---

© Samarth Security — Gadade Group.


---

## The Maharashtra branch map

`components/MaharashtraMap.tsx` draws the coverage map as **inline SVG** — no image
file, no Google Maps API key, sharp at any size, and it recolours with the theme.

Branch dots are plotted from the real `coords` (lat/lng) in `data/branches.ts` using an
equirectangular projection, so their positions relative to one another are correct. Add a
branch there and the dot appears automatically.

**Adjusting it**

- *Move a dot precisely* — in Google Maps, right-click the office; the first item in the
  menu is `lat, lng`. Paste those into that branch's `coords`.
- *Stop labels colliding* — set the city in `LABEL_ANCHORS` to `'top' | 'bottom' | 'left'
  | 'right'`. Unlisted cities default to `'top'`.

**Making the outline survey-accurate.** The built-in `OUTLINE_POINTS` is a hand-simplified
border — recognisably Maharashtra, but not precise. To replace it:

1. Download the state boundary as GeoJSON — [Datameet maps](https://github.com/datameet/maps)
   has India state files; GADM and Natural Earth also work.
2. Open [mapshaper.org](https://mapshaper.org), drop the file in, run `-simplify 5%`,
   then export as SVG.
3. Copy the `<path d="…">` string into `MAHARASHTRA_OUTLINE` and set `VIEWBOX` to match
   the exported file.
4. Set `BOUNDS` to the new path's lon/lat extent — the projection handles the dots.

Prefer a flat image instead (a designer's map or a screenshot)? Drop it in
`public/images/` and swap `<MaharashtraMap />` for `next/image` in `components/Branches.tsx`.

---

## Legal pages

`/privacy-policy` and `/terms` are generated from `data/legal.ts` by a shared
`LegalPage` component (page header, sticky on-page contents, numbered sections,
contact block). They're linked in the footer and listed in `sitemap.xml`.

> ⚠️ **These are starting templates, not legal advice.** They're written for an
> India-based PSARA-licensed firm and cover the usual ground, but a lawyer should
> review them — especially the liability, PSARA and DPDP Act sections. Every spot
> needing your input is marked **`[REVIEW]`**; search the file for it.

To add a third document (e.g. a Disclaimer or Refund Policy):

1. Add a `LegalDoc` object to `data/legal.ts` and include it in the `legalDocs` array
   (that array drives both the footer links and the sitemap).
2. Create `app/<slug>/page.tsx` copying `app/terms/page.tsx`, swapping the imported doc.


---

## Production hardening

### Security headers

Set in `next.config.mjs` via `headers()`, applied to every response:

| Header | Value | Protects against |
| ------ | ----- | ---------------- |
| `Content-Security-Policy` | see below | XSS, data exfiltration, clickjacking |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | SSL stripping / downgrade |
| `X-Content-Type-Options` | `nosniff` | MIME-sniffing a response into script |
| `X-Frame-Options` | `DENY` | clickjacking (legacy browsers) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | URL leakage to third parties |
| `Permissions-Policy` | camera/mic/geo/payment etc. all `()` | unwanted hardware/API access |
| `Cross-Origin-Opener-Policy` | `same-origin` | cross-origin popup tampering |

`poweredByHeader: false` also removes `X-Powered-By`, so the framework version
isn't advertised to vulnerability scanners.

**The CSP relaxes two directives in development only.** The Next.js dev server
compiles modules with eval-based source maps and talks to Fast Refresh over a
WebSocket, so the dev policy adds `'unsafe-eval'` to `script-src` and `ws: wss:`
to `connect-src`. Without them hydration throws `EvalError` and **every client
component silently breaks** — animations freeze mid-entrance (leaving elements
stuck at `opacity: 0`), and event handlers never bind. Neither value is emitted in
a production build; confirm with:

```bash
curl -sI https://your-domain.com | grep -i content-security-policy
```

**The CSP keeps `'unsafe-inline'` for scripts.** Next.js injects inline hydration
scripts and the JSON-LD block is inline, so a policy without it breaks the site.
Removing it properly needs per-request nonces from middleware, which opts every
page out of static rendering — a bad trade for a marketing site with no logins,
no sessions and no user-generated content. Every *other* directive is locked
down (`default-src 'self'`, `object-src 'none'`, `base-uri 'self'`,
`frame-ancestors 'none'`, `connect-src 'self'`, `frame-src` limited to the Google
Maps embed). **If you ever add authentication, payments, or render user-submitted
content, switch to the nonce approach** — see the comment at the top of
`next.config.mjs` for the link.

> ⚠️ `headers()` does **not** apply to `output: 'export'`. If you switch to a
> static export, replicate these on the host (Netlify `_headers`, Cloudflare
> Rules, `nginx add_header`, Apache `Header set`).

### Error handling

- `app/not-found.tsx` — branded 404, returns a real 404 status and is `noindex`.
- `app/error.tsx` — route error boundary. Deliberately does **not** print
  `error.message` (it can leak internals); it shows the safe `digest` id instead.
  Wire your error tracker into the `useEffect` there.
- `app/global-error.tsx` — catches failures in the root layout itself, so it
  renders its own `<html>`/`<body>` with inline styles only.

### Form abuse

The contact form has per-field `maxLength` caps (also clamped in state), an
off-screen honeypot field that silently drops bot submissions, and CR/LF
stripping on anything that reaches the `mailto:` subject line.

> When you move the form to a real backend, **re-validate every field on the
> server** — client-side limits are a UX affordance, not a security control — and
> add rate limiting plus a CAPTCHA or similar.

### Environment variables

Copy `.env.example` → `.env.local` for local dev, and set the same values in
your host's dashboard for production.

`NEXT_PUBLIC_SITE_URL` overrides the canonical origin, so preview deploys don't
advertise the production domain. **Anything prefixed `NEXT_PUBLIC_` is inlined
into the browser bundle and is public** — never use that prefix for API keys.

`.gitignore` blocks `.env` and `.env.*` (with `.env.example` explicitly allowed);
the previous `.env*.local` rule alone would have let a bare `.env` be committed.

### Dependency audit

```bash
npm audit --omit=dev
```

Run this before every release. See the note in the launch checklist below about
the current Next.js advisories.

### Accessibility

A "Skip to content" link is the first focusable element on every page, targeting
`<main id="main">`. It is visually hidden until focused.

---

## Pre-launch checklist

- [ ] **Upgrade Next.js.** `npm audit` reports 2 high-severity advisories against
      the pinned `next@14.2.35`, and 14.2.35 is the end of the 14.2 line — there is
      no patch within 14.x. Neither issue is exploitable here (the Server Function
      advisory needs `"use server"`, and this app has no server actions, API routes
      or middleware; the PostCSS ones are build-time only, processing our own CSS).
      But staying on an unpatched line means no future fixes, so plan the upgrade:
      `npm i next@15` and retest, or `npm audit fix --force` to jump to 16.
- [ ] **Self-host the stock photos.** `data/images.ts` hotlinks Unsplash. One photo
      ID already 404'd and had to be replaced — authors can delete images at any
      time. Download them into `public/images/services/` before launch, then you can
      also drop `images.unsplash.com` from `remotePatterns` and the CSP `img-src`.
- [ ] Replace every `[PLACEHOLDER]` (hero stats, why-us stats, client stats).
- [ ] Replace the placeholder client names/testimonials, with written permission.
- [ ] Fill in every `[REVIEW]` in `data/legal.ts` and have a lawyer read both docs.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real domain.
- [ ] Add the real logo, certificate scans and `og-image.jpg`.
- [ ] Verify headers on the deployed URL: <https://securityheaders.com>.
- [ ] Run Lighthouse against production for a final performance/a11y pass.
