'use client';

import Image from 'next/image';
import Reveal from './Reveal';
import { MapPinIcon, ShieldCheckIcon } from './icons';
import { clientRows, clientStats, type Client } from '@/data/clients';

/** Generates clean 2-letter monogram for clients */
function ClientBadge({ name, sector }: { name: string; sector: string }) {
  const initials = name
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  // Color thematic badge based on sector
  const isGovOrCorp = sector.includes('Government') || sector.includes('Corporate');
  const isVIPOrEstate = sector.includes('VIP') || sector.includes('Estate') || sector.includes('Society');
  const isRetailOrHealth = sector.includes('Retail') || sector.includes('Healthcare');

  const badgeBg = isGovOrCorp
    ? 'bg-primary text-white group-hover:bg-accent'
    : isVIPOrEstate
    ? 'bg-secondary text-white group-hover:bg-primary'
    : isRetailOrHealth
    ? 'bg-accent text-white group-hover:bg-secondary'
    : 'bg-primary/10 text-primary group-hover:bg-accent group-hover:text-white';

  return (
    <div
      aria-hidden="true"
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg font-heading text-xs font-black tracking-display transition-all duration-300 shadow-sm ${badgeBg}`}
    >
      {initials || 'SS'}
    </div>
  );
}

/** Individual client card within a strip */
function ClientCard({ client }: { client: Client }) {
  return (
    <div className="group relative flex items-center gap-3.5 rounded-xl border border-primary/10 bg-white/95 px-5 py-3.5 shadow-soft backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift shrink-0 min-w-[280px] sm:min-w-[320px]">
      {client.logo ? (
        <Image
          src={client.logo}
          alt={`${client.name} logo`}
          width={44}
          height={44}
          className="h-11 w-11 shrink-0 object-contain"
        />
      ) : (
        <ClientBadge name={client.name} sector={client.sector} />
      )}

      <div className="min-w-0 flex-1">
        <h4 className="truncate font-heading text-sm font-extrabold uppercase tracking-display text-primary group-hover:text-accent transition-colors sm:text-[0.92rem]">
          {client.name}
        </h4>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <span className="inline-block rounded bg-primary/5 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-muted group-hover:bg-primary/10 transition-colors">
            {client.sector}
          </span>
          {client.city && (
            <span className="inline-flex items-center gap-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-accent">
              <MapPinIcon className="h-3 w-3 shrink-0" />
              {client.city}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Clients() {
  // Repeating list to guarantee width exceeds ultra-wide screen before duplicating into dual halves
  const row1Items = [...clientRows.row1, ...clientRows.row1];
  const row2Items = [...clientRows.row2, ...clientRows.row2];
  const row3Items = [...clientRows.row3, ...clientRows.row3];

  return (
    <section
      id="clients"
      className="section overflow-hidden bg-soft/60 relative border-b border-primary/10"
      aria-labelledby="clients-heading"
    >
      <div className="container-content mb-12 sm:mb-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <span className="rule" />
            <span className="eyebrow">Our Prestigious Clients</span>
            <h2 id="clients-heading" className="section-title">
              Trusted by Maharashtra&apos;s Leading Establishments
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="lede">
              From VIP estate bungalows and government offices to industrial plants, corporate groups,
              and housing societies — our disciplined personnel safeguard premier properties across the state.
            </p>
          </Reveal>
        </div>

        {/* Quick highlight metrics */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {clientStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.05}>
              <div className="flex items-center gap-3 rounded-xl border border-primary/10 bg-white p-3.5 shadow-sm sm:p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <ShieldCheckIcon className="h-5 w-5" />
                </div>
                <div>
                  <span className="block font-heading text-lg font-extrabold tracking-display text-primary sm:text-xl">
                    {stat.value}
                  </span>
                  <span className="block text-[0.62rem] font-bold uppercase tracking-wider text-muted">
                    {stat.label}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Embedded CSS to guarantee immediate keyframe execution across all browser states */}
      <style>{`
        @keyframes marqueeScrollLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marqueeScrollRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-marquee-left {
          display: flex !important;
          width: max-content !important;
          animation: marqueeScrollLeft 52s linear infinite !important;
          will-change: transform;
        }
        .animate-marquee-right {
          display: flex !important;
          width: max-content !important;
          animation: marqueeScrollRight 55s linear infinite !important;
          will-change: transform;
        }
        .animate-marquee-right-slow {
          display: flex !important;
          width: max-content !important;
          animation: marqueeScrollRight 60s linear infinite !important;
          will-change: transform;
        }
        .marquee-container:hover .animate-marquee-left,
        .marquee-container:hover .animate-marquee-right,
        .marquee-container:hover .animate-marquee-right-slow {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* 3 Animated Moving Strips Container */}
      <div className="relative w-full space-y-4 sm:space-y-5 overflow-hidden py-2">
        {/* Left and Right Fade Gradients */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-28 md:w-44 bg-gradient-to-r from-soft via-soft/80 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 sm:w-28 md:w-44 bg-gradient-to-l from-soft via-soft/80 to-transparent"
        />

        {/* Strip 1: Top Row (Moving Left to Right) */}
        <div className="marquee-container overflow-hidden w-full select-none py-0.5">
          <div className="animate-marquee-right">
            <div className="flex shrink-0 items-center gap-4 sm:gap-5 pr-4 sm:pr-5">
              {row1Items.map((client, idx) => (
                <ClientCard key={`r1-a-${client.name}-${idx}`} client={client} />
              ))}
            </div>
            <div aria-hidden="true" className="flex shrink-0 items-center gap-4 sm:gap-5 pr-4 sm:pr-5">
              {row1Items.map((client, idx) => (
                <ClientCard key={`r1-b-${client.name}-${idx}`} client={client} />
              ))}
            </div>
          </div>
        </div>

        {/* Strip 2: Middle Row (Moving Right to Left) */}
        <div className="marquee-container overflow-hidden w-full select-none py-0.5">
          <div className="animate-marquee-left">
            <div className="flex shrink-0 items-center gap-4 sm:gap-5 pr-4 sm:pr-5">
              {row2Items.map((client, idx) => (
                <ClientCard key={`r2-a-${client.name}-${idx}`} client={client} />
              ))}
            </div>
            <div aria-hidden="true" className="flex shrink-0 items-center gap-4 sm:gap-5 pr-4 sm:pr-5">
              {row2Items.map((client, idx) => (
                <ClientCard key={`r2-b-${client.name}-${idx}`} client={client} />
              ))}
            </div>
          </div>
        </div>

        {/* Strip 3: Bottom Row (Moving Left to Right) */}
        <div className="marquee-container overflow-hidden w-full select-none py-0.5">
          <div className="animate-marquee-right-slow">
            <div className="flex shrink-0 items-center gap-4 sm:gap-5 pr-4 sm:pr-5">
              {row3Items.map((client, idx) => (
                <ClientCard key={`r3-a-${client.name}-${idx}`} client={client} />
              ))}
            </div>
            <div aria-hidden="true" className="flex shrink-0 items-center gap-4 sm:gap-5 pr-4 sm:pr-5">
              {row3Items.map((client, idx) => (
                <ClientCard key={`r3-b-${client.name}-${idx}`} client={client} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Helper Hint */}
      <div className="container-content mt-6 flex items-center justify-center">
        <p className="text-[0.68rem] font-bold uppercase tracking-widest text-muted/60">
          • Hover over any client card to pause •
        </p>
      </div>
    </section>
  );
}
