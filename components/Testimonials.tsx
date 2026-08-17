'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Reveal from './Reveal';
import { StarIcon } from './icons';
import { testimonials } from '@/data/clients';
import { whatsappQuote } from '@/data/site';

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    if (clientWidth > 0) {
      const cardWidth = clientWidth * 0.85;
      const idx = Math.round(scrollLeft / cardWidth);
      setActiveIdx(Math.min(Math.max(idx, 0), testimonials.length - 1));
    }
  };

  const scrollToTestimonial = (index: number) => {
    if (!scrollRef.current) return;
    const cards = scrollRef.current.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  return (
    <section id="testimonials" className="section bg-soft" aria-labelledby="testimonials-heading">
      <div className="container-content">
        {/* Section Header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <span className="rule" />
            <span className="eyebrow">Client Feedback</span>
            <h2 id="testimonials-heading" className="section-title">
              Trusted by leading enterprises across Maharashtra
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="lede">
              Read authentic feedback from plant heads, facility directors, and housing societies
              relying on Samarth Security for defence-grade discipline and statutory compliance.
            </p>
          </Reveal>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="mt-12 flex items-center justify-between text-[0.68rem] font-bold uppercase tracking-widest text-muted/70 sm:hidden">
          <span>Client Reviews</span>
          <span className="text-accent">{activeIdx + 1} of {testimonials.length} · Swipe →</span>
        </div>

        {/* Testimonials Grid / Mobile Swipe Carousel */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="-mx-5 mt-4 flex gap-6 overflow-x-auto px-5 pb-6 pt-2 snap-x snap-mandatory scrollbar-none sm:mx-0 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-2 xl:grid-cols-4"
        >
          {testimonials.map((t, i) => (
            <Reveal
              key={t.author + i}
              delay={i * 0.08}
              className="w-[85vw] max-w-[340px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink"
            >
              <figure className="card card-hover group flex h-full flex-col justify-between border-t-4 border-accent bg-surface p-7 shadow-soft transition-all duration-500 lg:p-8">
                <div>
                  {/* Top Bar: Sector Tag + Rating */}
                  <div className="flex items-center justify-between gap-2">
                    {t.sector && (
                      <span className="rounded bg-primary/5 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-primary/80">
                        {t.sector}
                      </span>
                    )}
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(t.rating ?? 5)].map((_, starIdx) => (
                        <StarIcon key={starIdx} className="h-3.5 w-3.5" />
                      ))}
                    </div>
                  </div>

                  {/* Quote Body */}
                  <blockquote className="mt-5 text-sm leading-relaxed text-ink/80">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Author Info */}
                <figcaption className="mt-7 border-t border-primary/10 pt-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="block font-heading text-sm font-extrabold uppercase tracking-display text-primary">
                        {t.author}
                      </span>
                      <span className="mt-0.5 block text-xs font-medium text-muted">
                        {t.role}
                      </span>
                      {t.company && (
                        <span className="mt-0.5 block text-[0.7rem] text-muted/70">
                          {t.company}
                        </span>
                      )}
                    </div>
                    {t.city && (
                      <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-accent">
                        {t.city}
                      </span>
                    )}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Mobile Pagination Dots (actively tracks scroll position) */}
        <div className="mt-2 flex justify-center gap-1.5 sm:hidden">
          {testimonials.map((t, i) => (
            <button
              key={t.author + i}
              type="button"
              onClick={() => scrollToTestimonial(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIdx ? 'w-6 bg-accent' : 'w-1.5 bg-primary/20 hover:bg-primary/40'
              }`}
            />
          ))}
        </div>

        {/* Bottom Navigation & Quote CTA */}
        <Reveal delay={0.2} className="mt-14 lg:mt-16">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-primary/10 bg-white p-6 shadow-soft sm:flex-row sm:p-8">
            <div>
              <h3 className="font-heading text-base font-extrabold uppercase tracking-display text-primary sm:text-lg">
                Join 150+ satisfied clients across Maharashtra
              </h3>
              <p className="mt-1 text-xs text-muted">
                From manned guarding and armed gunman to facility housekeeping and technical staffing.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/clients" className="btn-outline text-xs">
                View All Clients →
              </Link>
              <a
                href={whatsappQuote}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs"
              >
                Request a Site Quote
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
