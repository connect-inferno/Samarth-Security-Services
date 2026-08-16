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

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded bg-surface p-5 shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-heading text-base font-extrabold uppercase tracking-display text-primary">
                {active.title}
              </h3>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="rounded p-1.5 text-primary transition-colors hover:bg-soft"
                aria-label="Close"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>

            {'imageSrc' in active && active.imageSrc ? (
              <div className="relative aspect-[3/4] w-full max-h-[75vh] overflow-hidden rounded bg-white p-2">
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
