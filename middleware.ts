import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SITE_URL, PARENT_SITE_URL } from '@/data/site';

/**
 * Per-host canonical URLs.
 *
 * This site is a single static build served on TWO domains — the Samarth
 * Security subdomain (SITE_URL) and the Gadade Group parent domain
 * (PARENT_SITE_URL) — both showing the same content, both meant to be
 * independently indexable by Google (that's a deliberate choice, not an
 * accident: see the comment in app/layout.tsx for the full reasoning).
 *
 * A static `<link rel="canonical">` baked into the HTML at build time can
 * only ever point at ONE of those two domains, no matter which one actually
 * served the request — which is exactly what was suppressing the parent
 * domain from search results before (its canonical always pointed away, to
 * the subdomain). Middleware runs per-request even for statically-generated
 * pages, so it can set the *correct*, host-specific canonical via the HTTP
 * `Link` header — a real, Google-documented alternative to the HTML tag
 * (https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls#rel-canonical-header-method).
 * Deliberately no HTML canonical is set anywhere in the app, so this header
 * is the one and only canonical signal — no risk of the two contradicting
 * each other.
 */

const originForHost = (host: string): string => {
  const bareHost = host.split(':')[0].toLowerCase(); // strip a dev-server port
  if (bareHost === 'gadadegroup.in' || bareHost === 'www.gadadegroup.in') {
    return PARENT_SITE_URL;
  }
  return SITE_URL;
};

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const host = request.headers.get('host');
  if (!host) return response;

  const origin = originForHost(host);
  // Canonical intentionally excludes the query string (?utm_source=... etc.)
  // — those are tracking variants of the same page, not different pages.
  const canonicalUrl = `${origin}${request.nextUrl.pathname}`;

  response.headers.set('Link', `<${canonicalUrl}>; rel="canonical"`);
  return response;
}

export const config = {
  // Every page route, but not static assets / Next internals — there's no
  // meaningful "canonical" for a font file or a build chunk.
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/|fonts/|.*\\.(?:png|jpg|jpeg|svg|webp|avif|ico|mp4|webmanifest|xml|txt)$).*)',
  ],
};
