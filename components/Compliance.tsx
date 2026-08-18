'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Reveal from './Reveal';
import ImagePlaceholder from './ImagePlaceholder';
import { CloseIcon } from './icons';
import { compliance } from '@/data/content';

type Item = (typeof compliance.items)[number] & {
  imagePages?: string[];
};

export default function Compliance() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<Item | null>(null);
  const [lightboxPage, setLightboxPage] = useState(0);
  const [mobileIdx, setMobileIdx] = useState(0);
  const [mobilePageIdx, setMobilePageIdx] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close lightbox on Escape and handle Arrow keys for multi-page.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight' && active.imagePages && active.imagePages.length > 1) {
        setLightboxPage((p) => (p < (active.imagePages?.length ?? 1) - 1 ? p + 1 : 0));
      }
      if (e.key === 'ArrowLeft' && active.imagePages && active.imagePages.length > 1) {
        setLightboxPage((p) => (p > 0 ? p - 1 : (active.imagePages?.length ?? 1) - 1));
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  const activeDoc = compliance.items[mobileIdx] || compliance.items[0];
  const activeDocPages: string[] =
    'imagePages' in activeDoc && Array.isArray(activeDoc.imagePages)
      ? (activeDoc.imagePages as string[])
      : 'imageSrc' in activeDoc && activeDoc.imageSrc
        ? [activeDoc.imageSrc as string]
        : [];
  const currentMobileImage = activeDocPages[mobilePageIdx] || activeDocPages[0];

  const handleOpenLightbox = (item: Item, initialPage = 0) => {
    setActive(item);
    setLightboxPage(initialPage);
  };

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

        {/* ── MOBILE VIEW: Interactive Tabbed Viewer ── */}
        <div className="mt-10 sm:hidden">
          {/* Document Tab Bar */}
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-3 scrollbar-none">
            {compliance.items.map((item, i) => {
              const isSelected = i === mobileIdx;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setMobileIdx(i);
                    setMobilePageIdx(0);
                  }}
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
                <span className="rounded bg-primary px-2.5 py-1 font-heading text-[0.68rem] font-extrabold uppercase tracking-wider text-white">
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

            {/* If multi-page doc on mobile, show page switch tabs */}
            {activeDocPages.length > 1 && (
              <div className="mt-3 flex items-center justify-between rounded-lg bg-soft/80 p-1.5">
                <span className="px-2 text-[0.65rem] font-bold uppercase tracking-wider text-muted">
                  Pages ({activeDocPages.length}):
                </span>
                <div className="flex gap-1">
                  {activeDocPages.map((_, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => setMobilePageIdx(pIdx)}
                      className={`rounded px-2.5 py-1 text-[0.65rem] font-bold transition-all ${
                        mobilePageIdx === pIdx
                          ? 'bg-primary text-white shadow-xs'
                          : 'bg-white text-primary/70 hover:bg-primary/10'
                      }`}
                    >
                      Page {pIdx + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Certificate Preview Thumbnail */}
            <button
              type="button"
              onClick={() => handleOpenLightbox(activeDoc, mobilePageIdx)}
              className="group/img mt-4 block w-full overflow-hidden rounded-xl border border-primary/10 bg-soft/50 p-2"
              aria-label={`View certificate: ${activeDoc.title}`}
            >
              {currentMobileImage ? (
                <div className="relative aspect-[4/3] max-h-[220px] w-full overflow-hidden rounded-lg bg-white">
                  <Image
                    src={currentMobileImage}
                    alt={`${activeDoc.imageAlt} - Page ${mobilePageIdx + 1}`}
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
                onClick={() => {
                  setMobileIdx((prev) =>
                    prev > 0 ? prev - 1 : compliance.items.length - 1
                  );
                  setMobilePageIdx(0);
                }}
                className="text-[0.7rem] font-bold uppercase tracking-wider text-primary hover:text-accent"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={() => handleOpenLightbox(activeDoc, mobilePageIdx)}
                className="text-[0.7rem] font-bold uppercase tracking-wider text-primary underline underline-offset-2 hover:text-accent"
              >
                Tap to Expand ↗
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileIdx((prev) =>
                    prev < compliance.items.length - 1 ? prev + 1 : 0
                  );
                  setMobilePageIdx(0);
                }}
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
            const hasPages = 'imagePages' in item && Array.isArray(item.imagePages) && item.imagePages.length > 0;
            const hasImage = hasPages || ('imageSrc' in item && item.imageSrc);
            const coverImage = hasPages ? (item.imagePages as string[])[0] : (item.imageSrc as string | undefined);
            const numPages = hasPages ? (item.imagePages as string[]).length : 1;

            return (
              <Reveal key={item.code} delay={(i % 3) * 0.08}>
                <article className="card card-hover group flex h-full flex-col p-8">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="bg-primary px-3 py-1.5 font-heading text-xs font-extrabold uppercase tracking-wider text-white transition-colors duration-500 group-hover:bg-primary-light">
                        {item.code}
                      </span>
                      <h3 className="font-heading text-base font-extrabold uppercase tracking-display text-primary">
                        {item.title}
                      </h3>
                    </div>
                    {numPages > 1 && (
                      <span className="rounded bg-primary/10 px-2 py-0.5 text-[0.65rem] font-bold text-primary">
                        {numPages} Pages
                      </span>
                    )}
                  </div>

                  {/* Certificate image slot — click to open in lightbox */}
                  <button
                    type="button"
                    onClick={() => handleOpenLightbox(item, 0)}
                    className="group/img relative block w-full overflow-hidden rounded border border-primary/10 bg-white"
                    aria-label={`View certificate: ${item.title}`}
                  >
                    {hasImage && coverImage ? (
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white p-2">
                        <Image
                          src={coverImage}
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

      {/* Lightbox / Modal rendered via Portal directly into document.body */}
      {mounted && active && createPortal(
        (() => {
          const pages: string[] =
            'imagePages' in active && Array.isArray(active.imagePages) && active.imagePages.length > 0
              ? (active.imagePages as string[])
              : 'imageSrc' in active && active.imageSrc
                ? [active.imageSrc as string]
                : [];
          const activePageImage = pages[lightboxPage] || pages[0];
          const totalPages = pages.length;

          const handlePrev = (e?: React.MouseEvent) => {
            e?.stopPropagation();
            setLightboxPage((p) => (p > 0 ? p - 1 : totalPages - 1));
          };

          const handleNext = (e?: React.MouseEvent) => {
            e?.stopPropagation();
            setLightboxPage((p) => (p < totalPages - 1 ? p + 1 : 0));
          };

          return (
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`${active.title} certificate modal`}
              className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/85 p-3 sm:p-6 backdrop-blur-md"
              onClick={() => setActive(null)}
            >
              {/* Floating Top-Right Close Button */}
              <button
                type="button"
                onClick={() => setActive(null)}
                className="fixed right-4 top-4 z-[1000000] flex h-12 w-12 items-center justify-center rounded-full bg-[#C8202F] text-white shadow-2xl transition-all duration-200 hover:scale-110 hover:bg-black focus:outline-none"
                aria-label="Close modal"
              >
                <CloseIcon className="h-6 w-6 stroke-[3]" />
              </button>

              {/* Modal Container */}
              <div
                className="relative flex max-h-[94vh] w-full max-w-4xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex shrink-0 items-center justify-between border-b border-primary/10 bg-slate-50 px-5 py-3 sm:px-6">
                  <div className="flex items-center gap-3">
                    <span className="rounded bg-primary px-2.5 py-1 font-heading text-xs font-extrabold uppercase tracking-wider text-white">
                      {active.code}
                    </span>
                    <div>
                      <h3 className="font-heading text-sm font-extrabold uppercase tracking-display text-primary sm:text-base">
                        {active.title}
                      </h3>
                      {totalPages > 1 && (
                        <p className="text-[0.7rem] font-bold text-muted">
                          Viewing Page {lightboxPage + 1} of {totalPages}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Header Actions: Page Tabs + Close Button */}
                  <div className="flex items-center gap-2">
                    {totalPages > 1 && (
                      <div className="flex gap-1 rounded-lg bg-primary/10 p-1">
                        {pages.map((_, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => setLightboxPage(pIdx)}
                            className={`rounded px-3 py-1 text-xs font-bold transition-all ${
                              lightboxPage === pIdx
                                ? 'bg-primary text-white shadow-xs'
                                : 'text-primary/70 hover:bg-white hover:text-primary'
                            }`}
                          >
                            Page {pIdx + 1}
                          </button>
                        ))}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => setActive(null)}
                      className="flex h-9 items-center gap-1.5 rounded-lg border border-primary/20 bg-white px-3 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-white"
                      aria-label="Close certificate viewer"
                    >
                      <CloseIcon className="h-4 w-4" />
                      <span className="hidden sm:inline">Close</span>
                    </button>
                  </div>
                </div>

                {/* Modal Body: Image Display */}
                <div className="relative flex min-h-[250px] max-h-[70vh] flex-1 items-center justify-center overflow-hidden bg-slate-900/5 p-2 sm:p-4">
                  {activePageImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={`${active.code}-${lightboxPage}`}
                      src={activePageImage}
                      alt={`${active.imageAlt} - Page ${lightboxPage + 1}`}
                      className="max-h-[66vh] w-auto max-w-full rounded-md object-contain shadow-md transition-all duration-200"
                    />
                  ) : (
                    <ImagePlaceholder
                      alt={active.imageAlt}
                      aspect="aspect-[4/3]"
                      label="Certificate Image"
                    />
                  )}

                  {/* Previous / Next Arrow Overlays */}
                  {totalPages > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/85 text-white shadow-xl backdrop-blur-sm transition-all hover:scale-110 hover:bg-primary"
                        aria-label="Previous Page"
                      >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/85 text-white shadow-xl backdrop-blur-sm transition-all hover:scale-110 hover:bg-primary"
                        aria-label="Next Page"
                      >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="flex shrink-0 items-center justify-between border-t border-primary/10 bg-slate-50 px-5 py-3 sm:px-6">
                  {totalPages > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="inline-flex items-center gap-1 rounded-lg border border-primary/20 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-xs transition-all hover:bg-primary hover:text-white"
                      >
                        ← Prev Page
                      </button>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                        Page {lightboxPage + 1} of {totalPages}
                      </span>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="inline-flex items-center gap-1 rounded-lg border border-primary/20 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-xs transition-all hover:bg-primary hover:text-white"
                      >
                        Next Page →
                      </button>
                    </>
                  ) : (
                    <div className="flex w-full items-center justify-between">
                      <span className="text-xs text-muted">{active.description}</span>
                      <button
                        type="button"
                        onClick={() => setActive(null)}
                        className="rounded-lg bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-primary-light"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })(),
        document.body,
      )}
    </section>
  );
}
