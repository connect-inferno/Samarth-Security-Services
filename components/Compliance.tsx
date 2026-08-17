'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Reveal from './Reveal';
import ImagePlaceholder from './ImagePlaceholder';
import { CloseIcon } from './icons';
import { compliance } from '@/data/content';

type Item = (typeof compliance.items)[number];

export default function Compliance() {
  const [active, setActive] = useState<Item | null>(null);
  const [mobileIdx, setMobileIdx] = useState(0);

  // Close lightbox on Escape.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  const activeDoc = compliance.items[mobileIdx] || compliance.items[0];
  const hasMobileImage = 'imageSrc' in activeDoc && activeDoc.imageSrc;

  return (
    <section id="compliance" className="section bg-soft" aria-labelledby="compliance-heading">
      <div className="container-content">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="rule mx-auto" />
          <span className="eyebrow">{compliance.eyebrow}</span>
          <h2 id="compliance-heading" className="section-title">
            {compliance.heading}
          </h2>
          <p className="lede mt-6">{compliance.intro}</p>
        </Reveal>

        {/* ── MOBILE VIEW: Interactive Tabbed Viewer (Zero long scrolling!) ── */}
        <div className="mt-10 sm:hidden">
          {/* Document Tab Bar */}
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-3 scrollbar-none">
            {compliance.items.map((item, i) => {
              const isSelected = i === mobileIdx;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setMobileIdx(i)}
                  className={`shrink-0 rounded-lg px-3.5 py-2 text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                    isSelected
                      ? 'bg-primary text-white shadow-md'
                      : 'border border-primary/15 bg-white text-primary/70 hover:bg-soft'
                  }`}
                >
                  {item.code}
                </button>
              );
            })}
          </div>

          {/* Active Document Card for Mobile */}
          <div className="mt-3 overflow-hidden rounded-2xl border border-primary/10 bg-white p-5 shadow-soft">
            <div className="flex items-center justify-between border-b border-primary/10 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="rounded bg-accent px-2.5 py-1 font-heading text-[0.68rem] font-extrabold uppercase tracking-wider text-white">
                  {activeDoc.code}
                </span>
                <h3 className="font-heading text-sm font-extrabold uppercase tracking-display text-primary">
                  {activeDoc.title}
                </h3>
              </div>
              <span className="text-[0.65rem] font-bold text-muted">
                {mobileIdx + 1} of {compliance.items.length}
              </span>
            </div>

            {/* Certificate Preview Thumbnail */}
            <button
              type="button"
              onClick={() => setActive(activeDoc)}
              className="group/img mt-4 block w-full overflow-hidden rounded-xl border border-primary/10 bg-soft/50 p-2"
              aria-label={`View certificate: ${activeDoc.title}`}
            >
              {hasMobileImage ? (
                <div className="relative aspect-[4/3] max-h-[220px] w-full overflow-hidden rounded-lg bg-white">
                  <Image
                    src={activeDoc.imageSrc as string}
                    alt={activeDoc.imageAlt}
                    fill
                    sizes="100vw"
                    className="object-contain object-center"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-primary-dark/15 opacity-0 transition-opacity group-hover/img:opacity-100">
                    <span className="rounded-full bg-primary-dark/85 px-3 py-1 text-[0.65rem] font-bold text-white backdrop-blur-sm">
                      🔍 Tap to Expand
                    </span>
                  </div>
                </div>
              ) : (
                <ImagePlaceholder
                  alt={activeDoc.imageAlt}
                  aspect="aspect-[4/3]"
                  label="Certificate — Tap to view"
                />
              )}
            </button>

            <p className="mt-3.5 text-xs leading-relaxed text-muted">
              {activeDoc.description}
            </p>

            {/* Navigation & Fullscreen Action */}
            <div className="mt-4 flex items-center justify-between border-t border-primary/10 pt-3">
              <button
                type="button"
                onClick={() =>
                  setMobileIdx((prev) =>
                    prev > 0 ? prev - 1 : compliance.items.length - 1
                  )
                }
                className="text-[0.7rem] font-bold uppercase tracking-wider text-primary hover:text-accent"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={() => setActive(activeDoc)}
                className="text-[0.7rem] font-bold uppercase tracking-wider text-accent underline underline-offset-2"
              >
                Tap to Expand ↗
              </button>
              <button
                type="button"
                onClick={() =>
                  setMobileIdx((prev) =>
                    prev < compliance.items.length - 1 ? prev + 1 : 0
                  )
                }
                className="text-[0.7rem] font-bold uppercase tracking-wider text-primary hover:text-accent"
              >
                Next →
              </button>
            </div>
          </div>
        </div>

        {/* ── DESKTOP VIEW: Full 3-Column Grid ── */}
        <div className="mt-16 hidden gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {compliance.items.map((item, i) => {
            const hasImage = 'imageSrc' in item && item.imageSrc;

            return (
              <Reveal key={item.code} delay={(i % 3) * 0.08}>
                <article className="card card-hover group flex h-full flex-col p-8">
                  <div className="mb-6 flex items-center gap-4">
                    <span className="bg-primary px-3 py-1.5 font-heading text-xs font-extrabold uppercase tracking-wider text-white transition-colors duration-500 group-hover:bg-accent">
                      {item.code}
                    </span>
                    <h3 className="font-heading text-base font-extrabold uppercase tracking-display text-primary">
                      {item.title}
                    </h3>
                  </div>

                  {/* Certificate image slot — click to open in lightbox */}
                  <button
                    type="button"
                    onClick={() => setActive(item)}
                    className="group/img block w-full overflow-hidden rounded border border-primary/10 bg-white"
                    aria-label={`View certificate: ${item.title}`}
                  >
                    {hasImage ? (
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white p-2">
                        <Image
                          src={item.imageSrc as string}
                          alt={item.imageAlt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-contain object-center transition-transform duration-700 ease-out group-hover/img:scale-105"
                        />
                      </div>
                    ) : (
                      <ImagePlaceholder
                        alt={item.imageAlt}
                        aspect="aspect-[4/3]"
                        label="Certificate — click to view"
                        className="transition-transform duration-700 ease-out group-hover/img:scale-105"
                      />
                    )}
                  </button>

                  <p className="mt-5 text-sm leading-relaxed text-muted">{item.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Lightbox / modal */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} certificate`}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-primary-dark/90 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-surface p-5 shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-heading text-base font-extrabold uppercase tracking-display text-primary">
                {active.title}
              </h3>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="rounded-lg p-1.5 text-primary transition-colors hover:bg-soft"
                aria-label="Close"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>

            {'imageSrc' in active && active.imageSrc ? (
              <div className="relative aspect-[3/4] max-h-[75vh] w-full overflow-hidden rounded-xl bg-white p-2">
                <Image
                  src={active.imageSrc as string}
                  alt={active.imageAlt}
                  fill
                  sizes="1000px"
                  className="object-contain object-center"
                />
              </div>
            ) : (
              <ImagePlaceholder
                alt={active.imageAlt}
                aspect="aspect-[4/3]"
                label="Certificate Image"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
