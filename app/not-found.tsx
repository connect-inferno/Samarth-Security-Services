import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PhoneIcon } from '@/components/icons';
import { navLinks, telHref } from '@/data/site';

export const metadata: Metadata = {
  title: 'Page Not Found | Samarth Security',
  // Don't let 404s into the index.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header alwaysSolid />
      <main id="main">
        <section className="flex min-h-[70svh] items-center bg-primary py-24 text-white">
          <div className="container-content">
            <div className="max-w-2xl">
              <span className="rule" />
              <p className="font-heading text-7xl font-extrabold tracking-[-0.05em] text-accent sm:text-8xl">
                404
              </p>
              <h1 className="display mt-6 text-[2.25rem] text-white sm:text-5xl">
                This page has moved on.
              </h1>
              <p className="mt-6 max-w-lg leading-relaxed text-white/70">
                The page you were after doesn&apos;t exist — it may have been renamed or
                removed. Try one of the sections below, or call us directly.
              </p>

              <nav aria-label="Site sections" className="mt-10">
                <ul className="flex flex-wrap gap-x-6 gap-y-3">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="link-underline pb-1 text-sm font-bold uppercase tracking-[0.1em] text-white/80 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link href="/" className="btn-primary">
                  Back to Home
                </Link>
                <a href={telHref} className="btn-outline-light">
                  <PhoneIcon className="h-4 w-4" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
