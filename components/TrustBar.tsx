import { hero } from '@/data/content';

/** Slim compliance strip directly under the hero — quiet, credible proof. */
export default function TrustBar() {
  return (
    <section aria-label="Statutory compliance" className="border-b border-primary/10 bg-surface">
      <div className="container-content flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-7 sm:gap-x-16">
        <span className="text-[0.65rem] font-bold uppercase tracking-widest text-muted/70">
          Fully Compliant
        </span>
        {hero.trustBadges.map((badge) => (
          <span
            key={badge}
            className="font-heading text-sm font-extrabold uppercase tracking-display text-primary/70 transition-colors duration-300 hover:text-accent sm:text-base"
          >
            {badge}
          </span>
        ))}
      </div>
    </section>
  );
}
