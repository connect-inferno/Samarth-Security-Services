'use client';

import { useState } from 'react';
import Image from 'next/image';
import Reveal from './Reveal';
import { serviceIcons } from './icons';
import { services } from '@/data/content';
import { whatsappForService } from '@/data/site';
import { images } from '@/data/images';

const categories = [
  { id: 'all', label: 'All (8)' },
  {
    id: 'guarding',
    label: '🛡️ Security & Guarding',
    titles: ['Security Services', 'Gunman Services', 'Bouncer Services'],
  },
  {
    id: 'facility',
    label: '🧹 Facility & Housekeeping',
    titles: ['Housekeeping Services', 'Sweeper Services', 'Office Boy Services'],
  },
  {
    id: 'manpower',
    label: '⚡ Technical & Labour',
    titles: ['Tech Staff (Electrician / Plumber / CCTV)', 'Labour Services'],
  },
];

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems =
    selectedCategory === 'all'
      ? services.items
      : services.items.filter((item) => {
          const cat = categories.find((c) => c.id === selectedCategory);
          return cat?.titles?.includes(item.title);
        });

  return (
    <section id="services" className="section bg-soft" aria-labelledby="services-heading">
      <div className="container-content">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <span className="rule" />
            <span className="eyebrow">{services.eyebrow}</span>
            <h2 id="services-heading" className="section-title">
              {services.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="lede">{services.intro}</p>
          </Reveal>
        </div>

        {/* ── Category Filter Tabs (Square Format) ── */}
        <div className="mt-8 sm:mt-12">
          <div className="flex w-full gap-2 overflow-x-auto pb-2 scrollbar-none snap-x snap-proximity [-webkit-overflow-scrolling:touch]">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`shrink-0 snap-start px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    isSelected
                      ? 'bg-accent text-white shadow-md'
                      : 'border border-primary/15 bg-white text-primary/80 hover:bg-soft'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Services Showcase: Clean Square Format Cards ── */}
        <div className="mt-6 grid gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item, i) => {
            const Icon = serviceIcons[item.title];
            const imageUrl = images.serviceImages[item.title];

            return (
              <Reveal key={item.title} delay={(i % 4) * 0.06}>
                <article className="card card-hover group flex h-full flex-col overflow-hidden rounded-none border border-primary/10 bg-white shadow-soft transition-all duration-500 hover:border-accent">
                  {/* Service photo slot — prominent, uncropped & square */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-none bg-primary/5">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : null}
                    <span className="absolute left-0 top-0 z-10 flex h-11 w-11 items-center justify-center rounded-none bg-accent text-white shadow-md">
                      {Icon ? <Icon className="h-5 w-5" /> : null}
                    </span>
                    <span className="absolute right-0 top-0 z-10 rounded-none bg-primary-dark/85 px-3 py-1 font-mono text-xs font-bold text-white backdrop-blur-md">
                      0{services.items.findIndex((s) => s.title === item.title) + 1}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="font-heading text-base font-extrabold uppercase tracking-display text-primary transition-colors duration-300 group-hover:text-accent sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-3 flex-1 text-xs leading-relaxed text-muted sm:text-sm">
                      {item.description}
                    </p>

                    <a
                      href={whatsappForService(item.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary mt-6 justify-center rounded-none py-3 text-center text-xs tracking-wider"
                    >
                      Enquire on WhatsApp →
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
