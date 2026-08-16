import Reveal from './Reveal';
import { about } from '@/data/content';

export default function About() {
  return (
    <section id="about" className="section bg-surface" aria-labelledby="about-heading">
      <div className="container-content">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <span className="rule" />
            <span className="eyebrow">{about.eyebrow}</span>
            <h2 id="about-heading" className="section-title">
              {about.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <p className="lede">{about.body}</p>
          </Reveal>
        </div>

        {/* Vision / Mission / Quality Policy */}
        <div className="mt-16 grid gap-px bg-primary/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {about.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1}>
              {/* Hover styling lives on this plain element, not the Framer Motion
                  wrapper — Motion sets an inline `transform` after animating in,
                  which would otherwise fight a CSS `:hover` transform. */}
              <div className="group h-full bg-surface p-8 transition-colors duration-500 hover:bg-primary lg:p-12">
                <span className="font-heading text-xs font-extrabold uppercase tracking-widest text-accent">
                  0{i + 1}
                </span>
                <h3 className="mt-5 font-heading text-xl font-extrabold uppercase tracking-display text-primary transition-colors duration-500 group-hover:text-white">
                  {card.title}
                </h3>
                <p className="mt-4 leading-relaxed text-muted transition-colors duration-500 group-hover:text-white/75">
                  {card.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Values strip */}
        <Reveal className="mt-16 lg:mt-20">
          <div className="bg-primary px-6 py-10 sm:px-12">
            <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
              {about.values.map((value) => (
                <li
                  key={value}
                  className="font-heading text-base font-extrabold uppercase tracking-display text-white/85 transition-colors duration-300 hover:text-accent sm:text-lg"
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
