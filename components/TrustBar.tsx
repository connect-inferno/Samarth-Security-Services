import Reveal from './Reveal';
import { hero } from '@/data/content';

/** Slim compliance strip directly under the hero — quiet, credible proof. */
export default function TrustBar() {
  return (
    <section aria-label="Statutory compliance" className="border-b border-primary/10 bg-surface">
      <div className="container-content">
        <Reveal>
          <div className="flex flex-col items-center justify-center gap-3.5 py-5 sm:flex-row sm:gap-x-10 sm:py-6 lg:gap-x-14">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted">
                Fully Compliant
              </span>
              <span aria-hidden="true" className="hidden h-3.5 w-px bg-primary/20 sm:inline-block" />
            </div>

            <div className="grid w-full max-w-sm grid-cols-3 items-center justify-items-center gap-x-4 gap-y-2.5 sm:w-auto sm:max-w-none sm:flex sm:flex-wrap sm:gap-x-8 lg:gap-x-12">
              {hero.trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="font-heading text-xs font-extrabold uppercase tracking-display text-primary/80 transition-colors duration-300 hover:text-accent sm:text-sm lg:text-base"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
