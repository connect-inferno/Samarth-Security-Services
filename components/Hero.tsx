'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { PhoneIcon, WhatsAppIcon } from './icons';
import { hero } from '@/data/content';
import { whatsappQuote, telHref } from '@/data/site';
import { images } from '@/data/images';

import AnimatedNumber from './AnimatedNumber';

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[92svh] flex-col overflow-hidden bg-primary text-white lg:min-h-[100svh]"
      aria-labelledby="hero-heading"
    >
      {/*
        Background video with image poster fallback.
      */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={images.hero}
          className="h-full w-full scale-105 object-cover object-center transition-transform duration-1000"
        >
          <source src={images.heroVideo} type="video/mp4" />
        </video>
      </div>

      {/*
        Scrims.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-primary via-primary/55 to-primary/20 sm:hidden"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-primary/85 via-primary/50 to-transparent sm:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-gradient-to-t from-primary/95 via-primary/30 to-transparent sm:block"
      />

      {/* flex-1 + items-end pushes the copy toward the base of the hero without
          absolute positioning, so nothing can overlap the stat strip below. */}
      <div className="container-content relative z-20 flex w-full flex-1 items-end pb-14 pt-28 sm:pb-16 lg:pt-36">
        <motion.div
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl 2xl:max-w-5xl min-[1800px]:max-w-6xl"
        >
          <p className="mb-7 flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-widest text-eyebrow-blue sm:text-xs">
            <span className="h-px w-10 bg-accent" />
            {hero.eyebrow}
          </p>

          <h1 id="hero-heading" className="display text-white">
            {/* Full keyword phrase for search engines & screen readers */}
            <span className="sr-only">{hero.srTitle}</span>
            <span className="block text-[2.2rem] leading-[0.95] xs:text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] 2xl:text-8xl min-[1800px]:text-[7rem]">
              {hero.titleLine1}
            </span>
            <span className="block text-[2.2rem] leading-[0.95] text-accent xs:text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] 2xl:text-8xl min-[1800px]:text-[7rem]">
              {hero.titleLine2}
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg 2xl:max-w-2xl 2xl:text-xl">
            {hero.subheadline}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappQuote}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {hero.primaryCta}
            </a>
            <a href={telHref} className="btn-outline-light">
              <PhoneIcon className="h-4 w-4" />
              {hero.secondaryCta}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Stat strip pinned to the base of the hero */}
      <motion.dl
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 w-full border-t border-white/15 bg-primary-dark/60 backdrop-blur-sm"
      >
        <div className="container-content grid grid-cols-2 divide-x divide-white/10 lg:grid-cols-4">
          {hero.stats.map((stat) => (
            <div key={stat.label} className="px-4 py-5 text-center lg:py-6 2xl:py-8">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block break-words font-heading text-base font-extrabold leading-tight tracking-display text-white sm:text-xl lg:text-3xl 2xl:text-4xl">
                  <AnimatedNumber value={stat.value} duration={1.8} />
                </span>
                <span className="mt-1 block text-[0.6rem] font-bold uppercase tracking-wider text-white/55 sm:text-[0.68rem]">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </div>
      </motion.dl>
    </section>
  );
}
