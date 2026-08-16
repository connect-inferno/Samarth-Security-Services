'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { contact, telHref } from '@/data/site';

/**
 * Route-level error boundary. Catches render/data errors in any page below it
 * so visitors get a branded recovery screen instead of a blank white page.
 *
 * Note: `error.message` is deliberately NOT shown. In production Next.js
 * replaces it with a generic string anyway, and printing raw error text can
 * leak internals. The `digest` is a safe, server-correlatable id.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Hook your error tracker in here (Sentry, Highlight, etc.).
    console.error('Unhandled application error:', error.digest ?? error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center bg-primary py-24 text-white">
      <div className="container-content">
        <div className="max-w-2xl">
          <span className="rule" />
          <span className="eyebrow-light">Something went wrong</span>
          <h1 className="display text-[2.25rem] text-white sm:text-5xl">
            We hit an unexpected error.
          </h1>
          <p className="mt-6 max-w-lg leading-relaxed text-white/70">
            Sorry about that. Try again — if it keeps happening, call us on{' '}
            {contact.phoneDisplay} and we&apos;ll help you directly.
          </p>

          {error.digest && (
            <p className="mt-6 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/40">
              Reference — {error.digest}
            </p>
          )}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={reset} className="btn-primary">
              Try Again
            </button>
            <Link href="/" className="btn-outline-light">
              Back to Home
            </Link>
            <a href={telHref} className="btn-outline-light">
              Call {contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
