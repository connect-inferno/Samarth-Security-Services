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
    <section id="branches" className="section bg-surface" aria-labelledby="branches-heading">
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

        <div className="mt-16 grid gap-10 lg:grid-cols-5 lg:gap-12">
          {/* Maharashtra map graphic */}
          <Reveal className="lg:col-span-2">
            <MaharashtraMap
              selectedCity={selectedCity}
              onSelectCity={setSelectedCity}
            />

            {/* Mobile Location Quick-Switcher Pills */}
            <div className="mt-4 sm:hidden">
              <div className="mb-2 flex items-center justify-between text-[0.68rem] font-bold uppercase tracking-widest text-muted/70">
                <span>Select Branch</span>
                <span className="text-accent">Tap marker or pill</span>
              </div>
              <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 scrollbar-none">
                {branches.map((b) => {
                  const isSelected = b.city === selectedCity;
                  return (
                    <button
                      key={b.city}
                      type="button"
                      onClick={() => setSelectedCity(b.city)}
                      className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                        isSelected
                          ? 'bg-accent text-white shadow-md'
                          : 'border border-primary/20 bg-white text-primary hover:bg-soft'
                      }`}
                    >
                      {b.city} {b.isHeadOffice ? '★' : ''}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile: Single Focused Branch Info Card (No long scroll of all 8 branches!) */}
            <div className="mt-2 block sm:hidden">
              <div className="rounded-2xl border-2 border-accent/30 bg-white p-5 shadow-soft">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <MapPinIcon className="h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <h3 className="font-heading text-base font-extrabold uppercase tracking-display text-primary">
                        {selectedBranch.city}
                      </h3>
                      {selectedBranch.label && (
                        <span className="mt-1 inline-block rounded bg-secondary px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-white">
                          {selectedBranch.label}
                        </span>
                      )}
                    </div>
                  </div>
                  {selectedBranch.isHeadOffice && (
                    <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-accent">
                      Head Office
                    </span>
                  )}
                </div>

                <address className="mt-3.5 text-xs not-italic leading-relaxed text-muted">
                  {fullAddress(selectedBranch)}
                </address>

                <div className="mt-4 flex items-center gap-2.5 border-t border-primary/10 pt-3">
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
                    className="btn-outline px-3.5 py-2 text-xs"
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
