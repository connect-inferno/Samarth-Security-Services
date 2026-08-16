/**
 * Labeled placeholder image slot.
 *
 * Renders a clearly-marked box at the correct aspect ratio with the intended
 * alt text stored on it, so the layout is finalized before real assets arrive.
 *
 * ── HOW TO SWAP IN A REAL IMAGE ──────────────────────────────────────────
 * Replace a <ImagePlaceholder ... /> with next/image, keeping the same alt:
 *
 *   import Image from 'next/image';
 *   <Image
 *     src="/images/security-guard.jpg"
 *     alt="PSARA licensed security guard on duty at a Pune corporate office"
 *     width={800}
 *     height={600}
 *     className="h-full w-full object-cover"
 *     // add `priority` for above-the-fold images; omit it (default lazy) below the fold
 *   />
 *
 * Setting width/height (or using `fill` with a sized parent) prevents layout shift.
 */

type Props = {
  /** Descriptive, keyword-aware alt text for the eventual real image. */
  alt: string;
  /** Tailwind aspect-ratio class, e.g. "aspect-[4/3]", "aspect-video". */
  aspect?: string;
  /** Short label shown inside the box. */
  label?: string;
  className?: string;
};

export default function ImagePlaceholder({
  alt,
  aspect = 'aspect-[4/3]',
  label = 'Image',
  className = '',
}: Props) {
  return (
    <div
      role="img"
      aria-label={alt}
      data-alt={alt}
      className={`relative flex ${aspect} w-full items-center justify-center overflow-hidden bg-soft ${className}`}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <svg
          className="h-7 w-7 text-primary/25"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="1" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        <span className="text-[0.6rem] font-bold uppercase tracking-widest text-primary/40">
          {label}
        </span>
      </div>
    </div>
  );
}
