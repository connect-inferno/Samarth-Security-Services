import Image from 'next/image';
import Reveal from './Reveal';
import { about } from '@/data/content';
import { images } from '@/data/images';
import { ShieldCheckIcon } from './icons';

export default function About() {
  return (
    <section id="about" className="section bg-surface" aria-labelledby="about-heading">
      <div className="container-content">
        {/* Main About Story & Owner Portrait Grid */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* Left Column: Heading, Description & Leadership Quote */}
          <div className="lg:col-span-7">
            <Reveal>
              <span className="rule" />
              <span className="eyebrow">{about.eyebrow}</span>
              <h2 id="about-heading" className="section-title">
                {about.heading}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="lede mt-6">{about.body}</p>
            </Reveal>

            {/* Leadership quote / message */}
            {about.owner && (
              <Reveal delay={0.15}>
                <div className="mt-8 rounded-lg border-l-4 border-accent bg-soft/70 p-6">
                  <p className="text-sm font-medium leading-relaxed italic text-primary/85">
                    &ldquo;{about.owner.message}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="font-heading text-xs font-extrabold uppercase tracking-wider text-primary">
                      {about.owner.name}
                    </span>
                    <span aria-hidden="true" className="text-muted/40">·</span>
                    <span className="text-xs font-bold uppercase tracking-wide text-accent">
                      {about.owner.designation}
                    </span>
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          {/* Right Column: Owner / Founder Image Card */}
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <figure className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-primary/10 bg-white p-3 shadow-soft sm:p-4">
                {/* Photo container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-primary/5 sm:aspect-[4/3.5]">
                  <Image
                    src={images.owner}
                    alt={images.ownerAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    className="object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
                  />
                  {/* Floating verification badge */}
                  <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-primary-dark/85 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    <ShieldCheckIcon className="h-3.5 w-3.5 text-accent" />
                    Defence-Led Discipline
                  </div>
                </div>

                {/* Caption / Designation bar */}
                <figcaption className="mt-3.5 flex items-center justify-between px-2 pb-1">
                  <div>
                    <h3 className="font-heading text-sm font-extrabold uppercase tracking-display text-primary">
                      {about.owner?.name ?? 'Leadership'}
                    </h3>
                    <p className="text-[0.7rem] font-bold uppercase tracking-wider text-accent">
                      {about.owner?.designation ?? 'Founder & Managing Director'}
                    </p>
                  </div>
                  <span className="rounded bg-primary/5 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-primary/70">
                    Est. 2020
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        {/* Vision / Mission / Quality Policy */}
        <div className="mt-16 lg:mt-20">
          {/* Mobile swipe hint */}
          <div className="mb-3 flex items-center justify-between text-[0.68rem] font-bold uppercase tracking-widest text-muted/70 sm:hidden">
            <span>Core Pillars</span>
            <span className="flex items-center gap-1 text-accent">
              Swipe →
            </span>
          </div>

          {/* Cards container: Horizontal scroll-snap on mobile, grid on sm+ */}
          <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-4 pt-1 snap-x snap-mandatory scrollbar-none sm:mx-0 sm:grid sm:gap-px sm:overflow-visible sm:bg-primary/10 sm:px-0 sm:pb-0 sm:grid-cols-2 lg:grid-cols-3">
            {about.cards.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.1} className="w-[82vw] max-w-[320px] shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink">
                <div className="group flex h-full flex-col justify-between rounded-xl border border-primary/10 bg-surface p-7 shadow-soft transition-all duration-500 hover:bg-primary sm:rounded-none sm:border-0 sm:p-8 sm:shadow-none lg:p-12">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-xs font-extrabold uppercase tracking-widest text-accent">
                        0{i + 1}
                      </span>
                      <span className="text-[0.65rem] font-bold uppercase tracking-wider text-muted/50 group-hover:text-white/40 sm:hidden">
                        {i + 1} of {about.cards.length}
                      </span>
                    </div>
                    <h3 className="mt-5 font-heading text-xl font-extrabold uppercase tracking-display text-primary transition-colors duration-500 group-hover:text-white">
                      {card.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/75">
                      {card.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Mobile dot indicators */}
          <div className="mt-3 flex justify-center gap-1.5 sm:hidden">
            {about.cards.map((card, i) => (
              <span
                key={card.title}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === 0 ? 'w-5 bg-accent' : 'w-1.5 bg-primary/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Values Section */}
        <Reveal className="mt-14 lg:mt-20">
          <div className="overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-primary via-primary to-primary-dark p-6 text-white shadow-soft sm:p-8 lg:p-10">
            <div className="flex flex-col items-center justify-between gap-3 border-b border-white/10 pb-5 text-center sm:flex-row sm:text-left">
              <div>
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent">
                  Our Guiding Principles
                </span>
                <h3 className="font-heading text-lg font-extrabold uppercase tracking-display text-white sm:text-xl">
                  Core Values
                </h3>
              </div>
              <p className="text-xs text-white/60 sm:text-right">
                The standard of discipline behind every deployment.
              </p>
            </div>

            {/* Values badges */}
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 lg:justify-between">
              {about.values.map((value, idx) => (
                <li
                  key={value}
                  className="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white transition-all duration-300 hover:border-accent hover:bg-accent hover:shadow-md sm:px-4 sm:py-3 sm:text-sm"
                >
                  <span className="font-mono text-[0.65rem] font-bold text-accent transition-colors duration-300 group-hover:text-white">
                    0{idx + 1}
                  </span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
