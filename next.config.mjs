/**
 * Content Security Policy.
 *
 * ── A NOTE ON `'unsafe-inline'` FOR SCRIPTS ──────────────────────────────
 * Next.js injects inline bootstrap/hydration scripts, and we inline the
 * JSON-LD block, so a policy without `'unsafe-inline'` would break the site.
 * Removing it properly requires nonce-based CSP generated per request in
 * middleware — which opts every page out of static rendering. For a static
 * marketing site with no user accounts, no sessions and no user-generated
 * content, that trade is usually not worth it, so we keep pages static and
 * lock down every *other* directive instead.
 *
 * If you later add logins, payments or any user-submitted content that gets
 * rendered back, switch to the nonce approach:
 * https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
 */
const isDev = process.env.NODE_ENV !== 'production';

const cspDirectives = [
  // Nothing is allowed unless a directive below explicitly permits it.
  "default-src 'self'",
  // See the note above regarding 'unsafe-inline'.
  //
  // 'unsafe-eval' is added in DEVELOPMENT ONLY: the Next.js dev server compiles
  // modules with eval-based source maps and React Fast Refresh, so a policy
  // without it throws `EvalError` during hydration — which silently breaks any
  // client component (animations stop mid-entrance, handlers never bind).
  // It is never emitted in a production build.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  // Tailwind + Framer Motion write inline styles.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com https://*.tile.openstreetmap.org https://unpkg.com",
  "font-src 'self' data:",
  // Only the Google Maps embed may be framed in.
  'frame-src https://www.google.com',
  // No XHR/fetch/WebSocket destinations beyond our own origin.
  // Dev also needs the Fast Refresh WebSocket; not emitted in production.
  `connect-src 'self' https://*.tile.openstreetmap.org${isDev ? ' ws: wss:' : ''}`,
  // Legacy plugin vectors.
  "object-src 'none'",
  // Stops an injected <base> tag from re-pointing every relative URL.
  "base-uri 'self'",
  // The contact form only ever posts to our own origin (it uses mailto:).
  "form-action 'self'",
  // Modern replacement for X-Frame-Options; blocks clickjacking.
  "frame-ancestors 'none'",
  // Forces http:// subresources to be fetched over https.
  'upgrade-insecure-requests',
].join('; ');

/** Applied to every response. */
const securityHeaders = [
  { key: 'Content-Security-Policy', value: cspDirectives },
  // Tells browsers to use HTTPS for the next 2 years, subdomains included.
  // Only takes effect over HTTPS, so it is inert during local development.
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Stops browsers MIME-sniffing a response into something executable.
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Belt-and-braces clickjacking protection for older browsers.
  { key: 'X-Frame-Options', value: 'DENY' },
  // Send the full URL same-origin, only the origin cross-origin, never to http.
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Drop access to hardware/APIs the site never uses.
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), interest-cohort=()',
  },
  // Isolate our browsing context group from cross-origin popups.
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Don't advertise the framework version to attackers scanning for known CVEs.
  poweredByHeader: false,

  // Strip `console.log` from production bundles (keeps console.error/warn).
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  images: {
    // When you deploy to Vercel, image optimization works automatically.
    // If you want a fully static export (`output: 'export'`), uncomment the
    // `output` line below AND set `unoptimized: true` here (static hosts can't
    // run the Next.js image optimizer).
    // unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    // Allow the stock/demo photos we hotlink from Unsplash's CDN.
    // For production you may prefer to download these into /public/images and
    // reference them locally (faster, no third-party dependency).
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
    // Stop an attacker from using our optimizer to serve arbitrary SVG (SVGs
    // can contain scripts); rasterise-only is the safe default.
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    minimumCacheTTL: 60,
  },

  async headers() {
    return [
      {
        // Every route, including static assets.
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },

  // Uncomment for a static/SSG export (see README "Static export"):
  // NOTE: `headers()` does NOT apply to `output: 'export'` — a static host
  // serves files directly, so you must configure these headers on the host
  // (Netlify _headers, Cloudflare Rules, nginx add_header, etc.).
  // output: 'export',
};

export default nextConfig;
