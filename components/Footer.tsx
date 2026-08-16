import Link from 'next/link';
import Logo from './Logo';
import { InstagramIcon, WhatsAppIcon, MailIcon, MapPinIcon } from './icons';
import { navLinks, contact, company, whatsappGreeting, mailHref } from '@/data/site';
import { legalDocs } from '@/data/legal';
import { branches, fullAddress, mapsHref } from '@/data/branches';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white">
      <div className="container-content py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_2fr]">
          {/* Brand + tagline */}
          <div>
            <Logo variant="light" src="/images/gadage_logo.jpg" alt="Gadade Group logo" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
              {company.shortTagline}
            </p>
            <p className="mt-4 text-[0.65rem] font-bold uppercase tracking-widest text-white/40">
              {company.tagline}
            </p>
            <div className="mt-7 flex items-center gap-3">
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="flex h-10 w-10 items-center justify-center bg-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={whatsappGreeting}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message us on WhatsApp"
                className="flex h-10 w-10 items-center justify-center bg-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a
                href={mailHref}
                aria-label="Email us"
                className="flex h-10 w-10 items-center justify-center bg-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent"
              >
                <MailIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Nav */}
          <nav aria-label="Footer">
            <h2 className="text-[0.65rem] font-bold uppercase tracking-widest text-white/40">
              Explore
            </h2>
            <ul className="mt-6 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* All branch addresses (SEO + trust) */}
          <div>
            <h2 className="text-[0.65rem] font-bold uppercase tracking-widest text-white/40">
              Our Branches Across Maharashtra
            </h2>
            <ul className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {branches.map((b) => (
                <li key={b.city} className="text-xs leading-relaxed text-white/55">
                  <span className="block font-heading text-[0.7rem] font-extrabold uppercase tracking-wider text-white/85">
                    {b.city}
                    {b.isHeadOffice ? ' — Head Office' : ''}
                  </span>
                  <span className="mt-1 block">{fullAddress(b)}</span>
                  <a
                    href={mapsHref(b)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-wider text-accent transition-colors hover:text-white"
                  >
                    <MapPinIcon className="h-3 w-3" />
                    Directions
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-content flex flex-col items-center justify-between gap-4 py-6 text-center text-[0.7rem] text-white/45 lg:flex-row lg:text-left">
          <p>
            © {year} {company.name} — {company.parent}. All rights reserved.
          </p>

          <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {legalDocs.map((d) => (
              <Link
                key={d.slug}
                href={`/${d.slug}`}
                className="transition-colors hover:text-accent"
              >
                {d.navLabel}
              </Link>
            ))}
            <span aria-hidden="true" className="hidden text-white/20 sm:inline">|</span>
            <span className="uppercase tracking-wider">
              PSARA · EPF · ESIC · GST · Shop Act Compliant
            </span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
