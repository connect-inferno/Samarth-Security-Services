'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import MaharashtraMap from './MaharashtraMap';
import { MapPinIcon, PhoneIcon } from './icons';
import { branchesSection } from '@/data/content';
import { branches, fullAddress, mapsHref } from '@/data/branches';
import { contact } from '@/data/site';

export default function Branches() {
  const [selectedCity, setSelectedCity] = useState(branches[0].city);
  const selectedBranch = branches.find((b) => b.city === selectedCity) || branches[0];

  return (
    <section id="branches" className="section overflow-hidden bg-surface" aria-labelledby="branches-heading">
      <div className="container-content">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <span className="rule" />
            <span className="eyebrow">{branchesSection.eyebrow}</span>
            <h2 id="branches-heading" className="section-title">
              {branchesSection.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="lede">{branchesSection.intro}</p>
          </Reveal>
        </div>

        <div className="mt-12 grid w-full max-w-full gap-8 sm:mt-16 sm:gap-10 lg:grid-cols-5 lg:gap-12">
          {/* Maharashtra map graphic */}
          <Reveal className="w-full max-w-full overflow-hidden lg:col-span-2">
            <MaharashtraMap
              selectedCity={selectedCity}
              onSelectCity={setSelectedCity}
            />

            {/* Mobile Location Quick-Switcher Pills */}
            <div className="mt-4 w-full max-w-full overflow-hidden sm:hidden">
              <div className="mb-2 flex items-center justify-between text-[0.68rem] font-bold uppercase tracking-widest text-muted/70">
                <span>Select Branch</span>
                <span className="text-accent">Tap to view</span>
              </div>
              <div className="flex w-full max-w-full gap-2 overflow-x-auto pb-2 scrollbar-none snap-x snap-proximity [-webkit-overflow-scrolling:touch]">
                {branches.map((b) => {
                  const isSelected = b.city === selectedCity;
                  return (
                    <button
                      key={b.city}
                      type="button"
                      onClick={() => setSelectedCity(b.city)}
                      className={`shrink-0 snap-start rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                        isSelected
                          ? 'bg-accent text-white shadow-md scale-105 ring-2 ring-accent/20'
                          : 'border border-primary/15 bg-white text-primary/80 hover:bg-soft'
                      }`}
                    >
                      {b.city} {b.isHeadOffice ? '★' : ''}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile: Single Focused Branch Info Card */}
            <div className="mt-2 block w-full max-w-full overflow-hidden sm:hidden">
              <div className="w-full max-w-full overflow-hidden rounded-2xl border-2 border-accent/30 bg-white p-4 shadow-soft">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <MapPinIcon className="h-4 w-4 shrink-0 text-accent" />
                    <div className="min-w-0">
                      <h3 className="truncate font-heading text-base font-extrabold uppercase tracking-display text-primary">
                        {selectedBranch.city}
                      </h3>
                      {selectedBranch.label && (
                        <span className="mt-0.5 inline-block rounded bg-secondary px-2 py-0.5 text-[0.58rem] font-bold uppercase tracking-wider text-white">
                          {selectedBranch.label}
                        </span>
                      )}
                    </div>
                  </div>
                  {selectedBranch.isHeadOffice && (
                    <span className="shrink-0 rounded-full bg-accent/10 px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-accent">
                      Head Office
                    </span>
                  )}
                </div>

                <address className="mt-3 text-xs not-italic leading-relaxed text-muted">
                  {fullAddress(selectedBranch)}
                </address>

                <div className="mt-4 flex w-full items-center gap-2 border-t border-primary/10 pt-3">
                  <a
                    href={mapsHref(selectedBranch)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex-1 justify-center py-2 text-center text-xs"
                  >
                    <MapPinIcon className="h-3.5 w-3.5" />
                    Get Directions
                  </a>
                  <a
                    href={`tel:${contact.phone}`}
                    className="btn-outline shrink-0 px-3 py-2 text-xs"
                    aria-label="Call branch"
                  >
                    <PhoneIcon className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Desktop/Tablet Branch cards: Full grid layout */}
          <div className="hidden gap-px bg-primary/10 sm:grid sm:grid-cols-2 lg:col-span-3 min-[1800px]:grid-cols-3">
            {branches.map((b, i) => {
              const isSelected = b.city === selectedCity;
              return (
                <Reveal key={b.city} delay={(i % 2) * 0.06}>
                  <article
                    onClick={() => setSelectedCity(b.city)}
                    className={`group flex h-full cursor-pointer flex-col p-6 transition-all duration-500 hover:bg-soft ${
                      isSelected ? 'bg-soft ring-2 ring-inset ring-accent' : 'bg-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <MapPinIcon className="h-4 w-4 shrink-0 text-accent" />
                        <h3 className="font-heading text-base font-extrabold uppercase tracking-display text-primary">
                          {b.city}
                        </h3>
                      </div>
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                      )}
                    </div>
                    {b.label && (
                      <span className="mt-2 inline-block w-fit bg-secondary px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-white">
                        {b.label}
                      </span>
                    )}
                    <address className="mt-3 flex-1 text-sm not-italic leading-relaxed text-muted">
                      {fullAddress(b)}
                    </address>
                    <div className="mt-4 border-t border-primary/10 pt-3">
                      <a
                        href={mapsHref(b)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent transition-colors hover:text-secondary"
                      >
                        Directions →
                      </a>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
