'use client';

import { useState } from 'react';
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

/** Lon/lat bounds for Maharashtra projection. */
const BOUNDS = { minLng: 72.4, maxLng: 81.1, minLat: 15.4, maxLat: 22.2 };
const LNG_SCALE = 100;
const LAT_SCALE = 105;

const VIEWBOX = {
  w: (BOUNDS.maxLng - BOUNDS.minLng) * LNG_SCALE,
  h: (BOUNDS.maxLat - BOUNDS.minLat) * LAT_SCALE,
};

/** Equirectangular projection: lon/lat → SVG user coordinates */
function project(lat: number, lng: number) {
  return {
    x: (lng - BOUNDS.minLng) * LNG_SCALE,
    y: (BOUNDS.maxLat - lat) * LAT_SCALE,
  };
}

/**
 * Detailed, accurate polygon points of Maharashtra state boundary
 */
const OUTLINE_POINTS: [number, number][] = [
  // 1. Konkan Coastline (North → South)
  [72.70, 20.15], [72.75, 19.80], [72.80, 19.45], [72.82, 19.10],
  [72.82, 18.92], [72.88, 18.65], [72.94, 18.30], [73.02, 17.95],
  [73.12, 17.55], [73.25, 17.15], [73.32, 16.75], [73.42, 16.35],
  [73.55, 15.95], [73.68, 15.65],

  // 2. Southern Border (Goa & Karnataka)
  [73.85, 15.60], [74.15, 15.72], [74.35, 15.85], [74.55, 16.05],
  [74.80, 16.25], [75.10, 16.55], [75.40, 16.75], [75.75, 17.00],
  [76.05, 17.20], [76.45, 17.35], [76.85, 17.65], [77.15, 17.95],
  [77.45, 18.25], [77.75, 18.55], [78.10, 18.75], [78.50, 18.95],
  [78.90, 19.20], [79.35, 19.35], [79.75, 19.10], [80.10, 18.80],
  [80.35, 18.70],

  // 3. Eastern Border (Telangana / Chhattisgarh / Vidarbha Horn)
  [80.50, 19.15], [80.65, 19.65], [80.85, 20.15], [80.75, 20.65],
  [80.55, 21.10], [80.35, 21.45],

  // 4. Northern Border (Madhya Pradesh & Satpura Ranges)
  [80.00, 21.60], [79.60, 21.50], [79.20, 21.65], [78.75, 21.50],
  [78.25, 21.55], [77.80, 21.70], [77.30, 21.65], [76.85, 21.45],
  [76.40, 21.25], [75.95, 21.35], [75.50, 21.55], [75.10, 21.68],
  [74.70, 21.82], [74.30, 21.98], [73.95, 21.90],

  // 5. North-Western Border (Gujarat back to Dahanu Coast)
  [73.68, 21.55], [73.50, 21.15], [73.35, 20.80], [73.15, 20.45],
  [72.90, 20.25], [72.70, 20.15],
];

const MAHARASHTRA_OUTLINE =
  OUTLINE_POINTS.map(([lng, lat], i) => {
    const { x, y } = project(lat, lng);
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ') + ' Z';

type Anchor = 'top' | 'bottom' | 'left' | 'right';
const LABEL_ANCHORS: Record<string, Anchor> = {
  Mumbai: 'left',
  Pune: 'top',
  Ahilyanagar: 'right',
  Dharashiv: 'right',
  Solapur: 'right',
  Sangli: 'right',
  Kolhapur: 'left',
  Satara: 'left',
};

function labelPos(x: number, y: number, r: number, anchor: Anchor) {
  const pad = r + 10;
  switch (anchor) {
    case 'left':
      return { x: x - pad, y: y + 5, textAnchor: 'end' as const };
    case 'right':
      return { x: x + pad, y: y + 5, textAnchor: 'start' as const };
    case 'bottom':
      return { x, y: y + pad + 12, textAnchor: 'middle' as const };
    default:
      return { x, y: y - pad - 2, textAnchor: 'middle' as const };
  }
}

export default function MaharashtraMap({ className = '' }: { className?: string }) {
  const [view, setView] = useState<'interactive' | 'network'>('interactive');
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const cities = branches.map((b) => ({
    ...b,
    ...project(b.coords.lat, b.coords.lng),
    anchor: LABEL_ANCHORS[b.city] ?? ('top' as Anchor),
  }));

  return (
    <figure className={`relative flex flex-col rounded-xl border border-primary/10 bg-white p-4 shadow-soft sm:p-6 ${className}`}>
      {/* View Switcher Header */}
      <div className="mb-4 flex items-center justify-between border-b border-primary/10 pb-3">
        <span className="font-heading text-xs font-extrabold uppercase tracking-wider text-primary">
          Maharashtra Coverage
        </span>
        <div className="flex items-center gap-1 rounded-lg bg-soft p-1">
          <button
            type="button"
            onClick={() => setView('interactive')}
            className={`rounded px-3 py-1 text-xs font-bold transition-all ${
              view === 'interactive'
                ? 'bg-white text-primary shadow-sm'
                : 'text-muted hover:text-primary'
            }`}
          >
            🗺 Live Map
          </button>
          <button
            type="button"
            onClick={() => setView('network')}
            className={`rounded px-3 py-1 text-xs font-bold transition-all ${
              view === 'network'
                ? 'bg-white text-primary shadow-sm'
                : 'text-muted hover:text-primary'
            }`}
          >
            Network View
          </button>
        </div>
      </div>

      {view === 'interactive' ? (
        /* ── Leaflet Interactive Map with all branch pins ── */
        <>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-primary/10 bg-soft sm:aspect-[1/1] lg:min-h-[380px]">
            <BranchMap className="absolute inset-0" />
          </div>
          <p className="mt-2 text-center text-[0.65rem] text-muted">
            Click any marker to see branch details · 🔴 Head Office · 🔵 Branch
          </p>
        </>
      ) : (
        /* ── Stylized SVG Network Map ── */
        <svg
          viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
          className="h-auto w-full filter drop-shadow-sm"
          role="img"
          aria-labelledby="map-title map-desc"
        >
          <title id="map-title">Samarth Security branch network across Maharashtra</title>
          <desc id="map-desc">
            Geographical map of Maharashtra with marked branch offices in {branches.map((b) => b.city).join(', ')}.
          </desc>

          <defs>
            {/* Subtle decorative grid */}
            <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(10,37,64,0.03)" strokeWidth="1" />
            </pattern>
            {/* State Fill Gradient */}
            <linearGradient id="state-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0a2540" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#0a2540" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#c5221f" stopOpacity="0.06" />
            </linearGradient>
          </defs>

          {/* Background Grid */}
          <rect width={VIEWBOX.w} height={VIEWBOX.h} fill="url(#map-grid)" />

          {/* State Outline */}
          <path
            d={MAHARASHTRA_OUTLINE}
            fill="url(#state-gradient)"
            stroke="#0a2540"
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
            className="transition-colors duration-500 hover:stroke-accent"
          />

          {/* Interior region watermark */}
          <text
            x={VIEWBOX.w * 0.62}
            y={VIEWBOX.h * 0.45}
            textAnchor="middle"
            className="fill-primary/10 font-heading text-4xl font-extrabold uppercase tracking-[0.25em] select-none"
          >
            MAHARASHTRA
          </text>

          {/* Branch Markers */}
          {cities.map((c) => {
            const isSelected = hoveredCity === c.city;
            const r = c.isHeadOffice ? 8.5 : 6;
            const lp = labelPos(c.x, c.y, r, c.anchor);

            return (
              <g
                key={c.city}
                className="cursor-pointer transition-transform duration-300"
                onMouseEnter={() => setHoveredCity(c.city)}
                onMouseLeave={() => setHoveredCity(null)}
              >
                {/* Outer Pulse effect */}
                {c.isHeadOffice ? (
                  <>
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={18}
                      className="fill-accent/20"
                    />
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={8}
                      className="fill-none stroke-accent"
                      strokeWidth={2}
                    >
                      <animate
                        attributeName="r"
                        values="8;24;8"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.9;0;0.9"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </>
                ) : (
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={12}
                    className={`transition-colors ${isSelected ? 'fill-primary/25' : 'fill-primary/10'}`}
                  />
                )}

                {/* Pin Center Circle */}
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={isSelected ? r + 2 : r}
                  className={`transition-all duration-300 ${
                    c.isHeadOffice
                      ? 'fill-accent stroke-white stroke-[2]'
                      : isSelected
                      ? 'fill-accent stroke-white stroke-[2]'
                      : 'fill-primary stroke-white stroke-[1.5]'
                  }`}
                />

                {/* City Label */}
                <text
                  x={lp.x}
                  y={lp.y}
                  textAnchor={lp.textAnchor}
                  className={`font-heading text-[17px] font-extrabold uppercase transition-all duration-300 select-none ${
                    isSelected || c.isHeadOffice
                      ? 'fill-accent font-black text-[18px]'
                      : 'fill-primary'
                  }`}
                  paintOrder="stroke"
                  stroke="#ffffff"
                  strokeWidth={4.5}
                  strokeLinejoin="round"
                >
                  {c.city}
                </text>
              </g>
            );
          })}
        </svg>
      )}

      {/* Map Legend */}
      <figcaption className="mt-4 flex flex-wrap items-center justify-between border-t border-primary/10 pt-3 text-[0.68rem] font-bold uppercase tracking-wider text-muted">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-accent ring-2 ring-accent/30" />
            Head Office (Sangli)
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            8 Branches
          </span>
        </div>
        <span className="text-primary/60">10+ Cities Covered</span>
      </figcaption>
    </figure>
  );
}
