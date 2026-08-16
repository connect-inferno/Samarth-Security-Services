import Reveal from './Reveal';
import MaharashtraMap from './MaharashtraMap';
import { MapPinIcon } from './icons';
import { branchesSection } from '@/data/content';
import { branches, fullAddress } from '@/data/branches';

export default function Branches() {
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
            <MaharashtraMap />
          </Reveal>

          {/* Branch cards */}
          <div className="grid gap-px bg-primary/10 sm:grid-cols-2 lg:col-span-3 min-[1800px]:grid-cols-3">
            {branches.map((b, i) => (
              <Reveal key={b.city} delay={(i % 2) * 0.06}>
                <article className="group flex h-full flex-col bg-surface p-6 transition-colors duration-500 hover:bg-soft">
                  <div className="flex items-center gap-2.5">
                    <MapPinIcon className="h-4 w-4 shrink-0 text-accent" />
                    <h3 className="font-heading text-base font-extrabold uppercase tracking-display text-primary">
                      {b.city}
                    </h3>
                  </div>
                  {b.label && (
                    <span className="mt-2 inline-block w-fit bg-secondary px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-white">
                      {b.label}
                    </span>
                  )}
                  <address className="mt-3 text-sm not-italic leading-relaxed text-muted">
                    {fullAddress(b)}
                  </address>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
