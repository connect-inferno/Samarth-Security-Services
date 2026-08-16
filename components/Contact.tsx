'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import { PhoneIcon, WhatsAppIcon, MailIcon } from './icons';
import { contactSection } from '@/data/content';
import {
  contact,
  telHref,
  mailHref,
  whatsappGreeting,
} from '@/data/site';
import { branches, fullAddress } from '@/data/branches';

/*
 * ── WIRING UP A REAL FORM BACKEND ────────────────────────────────────────
 * This form currently opens the visitor's email client via a `mailto:` link
 * (no backend, no server needed). To capture submissions reliably instead:
 *
 *   • Formspree  — set the <form> action to your Formspree endpoint and use a
 *     normal POST (remove the onSubmit handler below).
 *   • Resend     — create an app/api/contact/route.ts API route that calls the
 *     Resend SDK, then POST this form's data to it with fetch().
 *
 * Until then, `mailto:` is a zero-dependency fallback that works on static hosts.
 */

export default function Contact() {
  const ho = branches.find((b) => b.isHeadOffice) ?? branches[0];
  const mapQuery = encodeURIComponent(`Samarth Security, ${fullAddress(ho)}`);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    service: '',
    message: '',
  });

  /**
   * Honeypot. Real users never see or fill this; most spam bots fill every
   * field they find. If it has a value we silently no-op, so the bot gets no
   * signal that it was caught.
   */
  const [botTrap, setBotTrap] = useState('');

  /** Per-field caps, enforced in state as well as via maxLength on the inputs. */
  const LIMITS = { name: 100, phone: 20, city: 60, service: 80, message: 2000 } as const;

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value.slice(0, LIMITS[field]) }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (botTrap) return; // caught a bot

    // Strip CR/LF from anything that lands in the subject line. `mailto:` params
    // are percent-encoded below, so this is belt-and-braces against a mail
    // client that mis-parses a decoded newline as the start of a new header.
    const safeName = form.name.replace(/[\r\n]+/g, ' ').trim();
    const subject = `Service enquiry from ${safeName || 'website visitor'}`;

    const body = [
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `City: ${form.city}`,
      `Service Needed: ${form.service}`,
      '',
      'Message:',
      form.message,
    ].join('\n');

    window.location.href = `${mailHref}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const inputClass =
    'w-full border border-primary/15 bg-surface px-4 py-3.5 text-sm text-ink placeholder:text-muted/50 transition-colors duration-200 hover:border-primary/35 focus:border-primary';

  return (
    <section id="contact" className="section bg-surface" aria-labelledby="contact-heading">
      <div className="container-content">
        <Reveal className="max-w-2xl">
          <span className="rule" />
          <span className="eyebrow">{contactSection.eyebrow}</span>
          <h2 id="contact-heading" className="section-title">
            {contactSection.heading}
          </h2>
          <p className="lede mt-6">{contactSection.intro}</p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Contact form */}
          <Reveal>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="mb-2 block text-[0.7rem] font-bold uppercase tracking-wider text-primary">
                    Name
                  </label>
                  <input
                    id="c-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    maxLength={100}
                    value={form.name}
                    onChange={update('name')}
                    className={inputClass}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="c-phone" className="mb-2 block text-[0.7rem] font-bold uppercase tracking-wider text-primary">
                    Phone
                  </label>
                  <input
                    id="c-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    maxLength={20}
                    inputMode="tel"
                    value={form.phone}
                    onChange={update('phone')}
                    className={inputClass}
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-city" className="mb-2 block text-[0.7rem] font-bold uppercase tracking-wider text-primary">
                    City
                  </label>
                  <input
                    id="c-city"
                    name="city"
                    type="text"
                    maxLength={60}
                    value={form.city}
                    onChange={update('city')}
                    className={inputClass}
                    placeholder="e.g. Pune"
                  />
                </div>
                <div>
                  <label htmlFor="c-service" className="mb-2 block text-[0.7rem] font-bold uppercase tracking-wider text-primary">
                    Service Needed
                  </label>
                  <select
                    id="c-service"
                    name="service"
                    value={form.service}
                    onChange={update('service')}
                    className={inputClass}
                  >
                    <option value="">Select a service</option>
                    {contactSection.services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="c-message" className="mb-2 block text-[0.7rem] font-bold uppercase tracking-wider text-primary">
                  Message
                </label>
                <textarea
                  id="c-message"
                  name="message"
                  rows={4}
                  maxLength={2000}
                  value={form.message}
                  onChange={update('message')}
                  className={inputClass}
                  placeholder="Tell us about your requirement"
                />
              </div>

              {/* Honeypot — off-screen and hidden from assistive tech; naive
                  spam bots fill every field they can find, and we drop those. */}
              <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="c-company">Company (leave this field blank)</label>
                <input
                  id="c-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={botTrap}
                  onChange={(e) => setBotTrap(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-primary mt-2 w-full sm:w-auto">
                Send Enquiry
              </button>
              <p className="text-xs text-muted/70">
                This opens your email app to send to {contact.email}.
              </p>
            </form>
          </Reveal>

          {/* Direct contact + map */}
          <Reveal delay={0.1} className="flex flex-col gap-4">
            <a
              href={whatsappGreeting}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Chat on WhatsApp
            </a>
            <div className="grid gap-4 sm:grid-cols-2">
              <a href={telHref} className="btn-outline">
                <PhoneIcon className="h-5 w-5" />
                {contact.phoneDisplay}
              </a>
              <a href={mailHref} className="btn-outline">
                <MailIcon className="h-5 w-5" />
                Email Us
              </a>
            </div>

            {/* Embedded Google Map — Sangli Head Office. Lazy-loaded, no API key. */}
            <div className="mt-2 overflow-hidden shadow-soft">
              <iframe
                title="Samarth Security Head Office location on Google Maps — Sangli"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                width="100%"
                height="300"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[300px] w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
