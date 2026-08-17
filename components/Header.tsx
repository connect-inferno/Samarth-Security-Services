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
      className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ease-out ${
        solid ? 'bg-white/95 shadow-nav backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      {/* Header bar: logo | desktop nav | actions + mobile menu toggle */}
      <div className="container-content flex h-[var(--header-height)] items-center justify-between gap-3 sm:gap-6 xl:gap-10">
        <Link href="/" className="shrink min-w-0 transition-opacity hover:opacity-80">
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

        {/* Actions & Mobile Menu Toggle */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          {/* Call button — visible on tablet+ */}
          <a
            href={telHref}
            className={`btn hidden px-4 py-2.5 text-[0.7rem] sm:inline-flex ${
              solid
                ? 'border border-primary/25 text-primary hover:border-primary hover:bg-primary hover:text-white'
                : 'border border-white/35 text-white hover:border-white hover:bg-white hover:text-primary'
            }`}
            aria-label={`Call Now ${contact.phoneDisplay}`}
          >
            <PhoneIcon className="h-4 w-4" />
            <span className="hidden xl:inline">Call Now</span>
          </a>

          {/* WhatsApp Action Button */}
          <a
            href={whatsappGreeting}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 sm:h-auto sm:w-auto items-center justify-center rounded-lg bg-[#25D366] text-white p-2.5 sm:px-4 sm:py-2.5 text-[0.7rem] font-bold uppercase transition-all hover:bg-[#1da851] shadow-sm"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span className="hidden sm:inline sm:ml-1.5">WhatsApp</span>
          </a>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 xl:hidden ${
              solid
                ? 'border-primary/15 bg-primary/5 text-primary hover:bg-primary hover:text-white shadow-sm'
                : 'border-white/25 bg-white/15 text-white hover:bg-white hover:text-primary backdrop-blur-md shadow-sm'
            }`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {open && (
        <div
          id="mobile-menu"
          className="animate-fade-up border-t border-primary/10 bg-white shadow-lift xl:hidden"
        >
          <nav aria-label="Mobile" className="container-content py-5">
            <ul className="flex flex-col divide-y divide-primary/10">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-primary transition-colors hover:text-accent"
                  >
                    <span>{link.label}</span>
                    <span className="text-muted/40">→</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Quick Action Buttons in Mobile Menu */}
            <div className="mt-5 flex flex-col gap-2.5 border-t border-primary/10 pt-4">
              <a href={telHref} className="btn-outline w-full justify-center">
                <PhoneIcon className="h-4 w-4" />
                {contact.phoneDisplay}
              </a>
              <a
                href={whatsappGreeting}
                target="_blank"
                rel="noopener noreferrer"
                className="btn w-full justify-center bg-[#25D366] text-white hover:bg-[#1da851]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Message on WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
