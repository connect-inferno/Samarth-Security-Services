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

export default function MaharashtraMap({ className = '' }: { className?: string }) {
  return (
    <figure
      className={`relative flex flex-col rounded-xl border border-primary/10 bg-white p-4 shadow-soft sm:p-6 ${className}`}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-primary/10 pb-3">
        <span className="font-heading text-xs font-extrabold uppercase tracking-wider text-primary">
          🗺 Maharashtra Coverage
        </span>
      </div>

      {/* Leaflet Interactive Map */}
      <div
        className="relative w-full overflow-hidden rounded-lg border border-primary/10 bg-soft"
        style={{ minHeight: '320px', height: 'clamp(320px, 60vw, 480px)' }}
      >
        <BranchMap className="absolute inset-0" />
      </div>

      <p className="mt-2 text-center text-[0.65rem] text-muted">
        Tap any marker to see branch details · 🔴 Head Office · 🔵 Branch
      </p>

      {/* Map Legend */}
      <figcaption className="mt-4 flex flex-wrap items-center justify-between border-t border-primary/10 pt-3 text-[0.68rem] font-bold uppercase tracking-wider text-muted">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-accent ring-2 ring-accent/30" />
            Head Office (Sangli)
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            {branches.length - 1} Branches
          </span>
        </div>
        <span className="text-primary/60">10+ Cities Covered</span>
      </figcaption>
    </figure>
  );
}
