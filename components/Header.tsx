'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { PhoneIcon, WhatsAppIcon, MenuIcon, CloseIcon } from './icons';
import { navLinks, telHref, whatsappGreeting, contact } from '@/data/site';

/**
 * Sticky header.
 *
 * On the home page it starts transparent over the full-bleed hero and turns
 * white + blurred once scrolled. Sub-pages (which have no hero image behind
 * the header) pass `alwaysSolid` so it renders white from the start.
 */
export default function Header({ alwaysSolid = false }: { alwaysSolid?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The open mobile panel is white, so the bar must go solid too — otherwise
  // the transparent bar and the white panel read as two disconnected pieces.
  const solid = alwaysSolid || scrolled || open;

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (alwaysSolid) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [alwaysSolid]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        solid ? 'bg-white/95 shadow-nav backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      {/* Three zones: logo | centred nav | actions. The nav takes the flexible
          middle column so it never crowds the logo or the CTAs. */}
      <div className="container-content flex h-[var(--header-height)] items-center gap-6 xl:gap-10">
        <Link href="/" className="shrink-0 transition-opacity hover:opacity-80">
          <Logo variant={solid ? 'dark' : 'light'} />
          <span className="sr-only">Samarth Security — home</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden flex-1 justify-center xl:flex">
          <ul className="flex items-center gap-7 xl:gap-9 2xl:gap-11">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`link-underline whitespace-nowrap pb-1 text-sm font-medium transition-colors xl:text-[0.95rem] ${
                    solid ? 'text-muted hover:text-primary' : 'text-white/75 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions — only WhatsApp stays solid so the bar reads calm; Call Now
            is a lighter outline that adapts to the transparent/solid states. */}
        <div className="ml-auto flex shrink-0 items-center gap-2.5 xl:ml-0">
          <a
            href={telHref}
            className={`btn hidden px-5 py-3 text-[0.7rem] sm:inline-flex ${
              solid
                ? 'border border-primary/25 text-primary hover:border-primary hover:bg-primary hover:text-white'
                : 'border border-white/35 text-white hover:border-white hover:bg-white hover:text-primary'
            }`}
            aria-label={`Call Now ${contact.phoneDisplay}`}
          >
            <PhoneIcon className="h-4 w-4" />
            <span className="hidden xl:inline">Call Now</span>
          </a>
          <a
            href={whatsappGreeting}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-[#25D366] px-5 py-3 text-[0.7rem] text-white transition-all hover:-translate-y-0.5 hover:bg-[#1da851] hover:shadow-lift"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`-mr-2 ml-1 p-2 transition-colors xl:hidden ${
              solid ? 'text-primary hover:bg-soft' : 'text-white hover:bg-white/10'
            }`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="animate-fade-up border-t border-primary/10 bg-white shadow-soft xl:hidden"
        >
          <nav aria-label="Mobile" className="container-content py-4">
            <ul className="flex flex-col divide-y divide-primary/10">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 text-sm font-bold uppercase tracking-[0.1em] text-primary transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Call Now is hidden in the bar on the narrowest screens, so it lives here. */}
            <a href={telHref} className="btn-outline mt-5 w-full">
              <PhoneIcon className="h-4 w-4" />
              {contact.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
