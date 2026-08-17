import Reveal from './Reveal';
import AnimatedNumber from './AnimatedNumber';
import { ShieldIcon } from './icons';
import { whyChooseUs } from '@/data/content';
import { whatsappQuote } from '@/data/site';

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="section bg-primary text-white" aria-labelledby="why-us-heading">
      <div className="container-content">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="rule mx-auto" />
          <span className="eyebrow-light">{whyChooseUs.eyebrow}</span>
          <h2
            id="why-us-heading"
            className="font-heading text-3xl font-extrabold uppercase leading-[1.05] tracking-display sm:text-4xl lg:text-5xl"
          >
            {whyChooseUs.heading}
          </h2>
        </Reveal>

        {/* Stats strip */}
        <dl className="mt-16 grid grid-cols-2 gap-px bg-white/15 lg:grid-cols-4">
          {whyChooseUs.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="h-full bg-primary px-4 py-8 text-center transition-colors duration-500 hover:bg-primary-light sm:px-6 sm:py-10 2xl:py-14">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-heading text-3xl font-extrabold tracking-display text-white sm:text-4xl lg:text-5xl">
                    <AnimatedNumber value={stat.value} duration={1.8} />
                  </span>
                  <span className="mt-2 block text-[0.62rem] font-bold uppercase tracking-widest text-white/55 sm:mt-3 sm:text-[0.65rem]">
                    {stat.label}
                  </span>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>

        {/* Defence-background callout */}
        <Reveal className="mt-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <ShieldIcon className="h-10 w-10 text-accent" />
            <p className="text-lg leading-relaxed text-white/80">{whyChooseUs.callout}</p>
            <a
              href={whatsappQuote}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-2"
            >
              Request a Site Survey
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
