'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { images } from '@/data/images';
import {
  ShieldCheckIcon,
  HeartIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from './icons';

type SlideId = 'founder' | 'parents' | 'bni';

interface Slide {
  id: SlideId;
  tabLabel: string;
  name: string;
  role: string;
  tag: string;
  badge: string;
  image: string;
  imageAlt: string;
}

const SLIDES: Slide[] = [
  {
    id: 'founder',
    tabLabel: 'Founder',
    name: 'Akash Shubhangi Birudev Gadade',
    role: 'Founder & Managing Director',
    tag: 'Est. 2020 · Gadade Group',
    badge: 'Founder & MD',
    image: images.owner,
    imageAlt: 'Akash Shubhangi Birudev Gadade — Founder & Managing Director of Samarth Security',
  },
  {
    id: 'parents',
    tabLabel: 'Parents',
    name: 'Birudev Janappa Gadade & Shubhangi Birudev Gadade',
    role: 'Founding Pillars & Mentors',
    tag: 'Founding Roots · Gadade Group',
    badge: 'Blessings & Inspiration',
    image: images.parents,
    imageAlt: 'Birudev Janappa Gadade & Shubhangi Birudev Gadade — Founding Pillars of Gadade Group',
  },
  {
    id: 'bni',
    tabLabel: 'BNI Member',
    name: 'Akash Shubhangi Birudev Gadade',
    role: 'Active BNI Member · Induction Ceremony',
    tag: 'Verified Network · BNI',
    badge: 'BNI Induction Ceremony',
    image: images.bni,
    imageAlt: 'Akash Shubhangi Birudev Gadade receiving official BNI membership',
  },
];

const SLIDE_COUNT = SLIDES.length;
const AUTO_ADVANCE_MS = 5000;

const badgeIcon = (id: SlideId, className: string) => {
  if (id === 'founder') return <ShieldCheckIcon className={className} />;
  if (id === 'parents') return <HeartIcon className={className} />;
  return <span className="inline-block h-2 w-2 rounded-full bg-[#E01A22]" />;
};

/**
 * Auto-advancing showcase: Founder → Parents → BNI membership, looping.
 *
 * ── WHY A setTimeout CHAIN, NOT setInterval ──────────────────────────────
 * A ticking setInterval plus a separately-updated "progress %" state (the
 * previous implementation) is two moving parts that can drift out of sync —
 * and under React Strict Mode's dev-only mount→cleanup→mount cycle, or a
 * long-lived Hot Module Reload session, a badly-guarded interval can end up
 * running twice, which looked here like the carousel cycling *backwards*
 * (skipping forward by 2 in a 3-slide loop is indistinguishable from
 * stepping back by 1).
 *
 * A recursive setTimeout, tracked in a ref and always cleared before the
 * next one is scheduled, has exactly one timer alive at any moment by
 * construction — there is no interleaving window for a duplicate to form.
 * The progress bar is pure CSS (see the inline `animation` below), so it
 * can never desync from the actual slide index: it just replays on every
 * `key={currentIdx}` remount.
 */
export default function LeadershipCarousel() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrentIdx(((index % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  const goNext = useCallback(() => goTo(currentIdx + 1), [currentIdx, goTo]);
  const goPrev = useCallback(() => goTo(currentIdx - 1), [currentIdx, goTo]);

  const running = !isPaused && !isHovered;

  // Single self-clearing timer chain — see comment above.
  useEffect(() => {
    if (!running) return undefined;

    timerRef.current = setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % SLIDE_COUNT);
    }, AUTO_ADVANCE_MS);

    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
    // Re-arms on every slide change (fresh AUTO_ADVANCE_MS window) and
    // whenever pause/hover state flips.
  }, [currentIdx, running]);

  // Keyboard navigation when the carousel has focus.
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    const SWIPE_THRESHOLD = 45;
    if (delta > SWIPE_THRESHOLD) goNext();
    else if (delta < -SWIPE_THRESHOLD) goPrev();
    touchStartX.current = null;
  };

  const active = SLIDES[currentIdx];

  return (
    <figure
      className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-primary/15 bg-white p-3 shadow-soft transition-shadow duration-300 hover:shadow-xl sm:p-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Leadership, founding family, and BNI membership showcase"
    >
      {/* Tab switcher */}
      <div className="mb-3 grid grid-cols-3 gap-1.5 rounded-xl bg-primary/5 p-1">
        {SLIDES.map((slide, idx) => {
          const isActive = idx === currentIdx;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(idx)}
              aria-current={isActive}
              aria-label={`Show ${slide.tabLabel}`}
              className={`relative flex items-center justify-center gap-1.5 overflow-hidden rounded-lg py-2 text-[0.7rem] font-extrabold uppercase tracking-wider transition-colors duration-300 ${
                isActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-primary/70 hover:bg-white/60 hover:text-primary'
              }`}
            >
              {badgeIcon(slide.id, `h-3 w-3 ${isActive ? 'text-accent' : 'text-accent/70'}`)}
              <span className="truncate">{slide.tabLabel}</span>

              {isActive && running && (
                <span
                  key={currentIdx}
                  className="absolute bottom-0 left-0 h-[2px] bg-accent"
                  style={{ animation: `carousel-progress ${AUTO_ADVANCE_MS}ms linear forwards` }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Photo frame — single image in the DOM, remounted (key=currentIdx)
          on every change so it re-triggers the CSS fade-in. No stacked
          layers, so there's nothing that can render out of order. */}
      <div className="relative aspect-[3/3.8] w-full overflow-hidden rounded-xl bg-primary/5 sm:aspect-[3/3.6]">
        <div key={currentIdx} className="absolute inset-0 animate-fade-in">
          <Image
            src={active.image}
            alt={active.imageAlt}
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
            className="object-cover object-center"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        <div className="absolute bottom-3 left-3 z-30 flex items-center gap-1.5 rounded-full border border-white/10 bg-primary-dark/90 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white backdrop-blur-md shadow-md">
          {badgeIcon(active.id, 'h-3.5 w-3.5 text-accent')}
          <span>{active.badge}</span>
        </div>

        <button
          type="button"
          onClick={() => setIsPaused((p) => !p)}
          aria-label={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
          className="absolute right-3 top-3 z-30 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-transform duration-200 hover:scale-110 hover:bg-primary"
        >
          {isPaused ? <PlayIcon className="h-3 w-3" /> : <PauseIcon className="h-3 w-3" />}
        </button>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous"
          className="absolute left-2 top-1/2 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-transform duration-200 hover:scale-110 hover:bg-primary"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next"
          className="absolute right-2 top-1/2 z-30 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-transform duration-200 hover:scale-110 hover:bg-primary"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Caption */}
      <figcaption className="mt-3.5 px-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-heading text-sm font-extrabold uppercase tracking-display leading-snug text-primary">
              {active.name}
            </h3>
            <p className="mt-0.5 text-[0.72rem] font-bold uppercase tracking-wider text-accent">
              {active.role}
            </p>
          </div>
          <span className="shrink-0 rounded border border-primary/10 bg-primary/5 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-primary/80">
            {active.tag}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-primary/10 pt-2.5">
          <div className="flex items-center gap-1.5">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(idx)}
                aria-label={`Go to slide ${idx + 1}: ${slide.tabLabel}`}
                aria-current={idx === currentIdx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIdx ? 'w-6 bg-accent' : 'w-2 bg-primary/20 hover:bg-primary/40'
                }`}
              />
            ))}
          </div>
          <span className="text-[0.65rem] font-bold uppercase tracking-widest text-muted">
            0{currentIdx + 1} / 0{SLIDE_COUNT}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}
