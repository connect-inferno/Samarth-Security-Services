'use client';

import dynamic from 'next/dynamic';
import { branches } from '@/data/branches';

// BranchMap uses Leaflet which requires browser APIs — must be client-only
const BranchMap = dynamic(() => import('./BranchMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-lg bg-soft text-sm text-muted">
      Loading map…
    </div>
  ),
});

export default function MaharashtraMap({
  className = '',
  selectedCity,
  onSelectCity,
}: {
  className?: string;
  selectedCity?: string;
  onSelectCity?: (city: string) => void;
}) {
  return (
    <figure
      className={`relative flex w-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white p-4 shadow-soft sm:p-6 ${className}`}
    >
      {/* Header */}
      <div className="mb-3 flex items-center justify-between border-b border-primary/10 pb-2.5">
        <span className="font-heading text-xs font-extrabold uppercase tracking-wider text-primary">
          🗺 Maharashtra Coverage
        </span>
        <span className="text-[0.65rem] font-bold text-muted">
          8 Branch Offices
        </span>
      </div>

      {/* Leaflet Interactive Map */}
      <div className="relative isolate z-0 h-[280px] w-full overflow-hidden rounded-xl border border-primary/10 bg-slate-100 sm:h-[380px] lg:h-[420px]">
        <BranchMap
          className="h-full w-full"
          selectedCity={selectedCity}
          onSelectCity={onSelectCity}
        />
      </div>

      <p className="mt-2.5 px-1 text-center text-[0.68rem] leading-normal text-muted">
        Tap any marker or location pill below · 🔴 Head Office · 🔵 Branch
      </p>

      {/* Map Legend */}
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-y-1.5 border-t border-primary/10 pt-2.5 text-[0.65rem] font-bold uppercase tracking-wider text-muted sm:text-[0.68rem]">
        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-accent/30" />
            Sangli (HQ)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            7 Branches
          </span>
        </div>
        <span className="text-primary/70">10+ Cities</span>
      </figcaption>
    </figure>
  );
}
