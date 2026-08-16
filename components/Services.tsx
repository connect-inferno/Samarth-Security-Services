import Image from 'next/image';
import Reveal from './Reveal';
import { serviceIcons } from './icons';
import { services } from '@/data/content';
import { whatsappForService } from '@/data/site';
import { images } from '@/data/images';

export default function Services() {
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

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 xl:grid-cols-4">
          {services.items.map((item, i) => {
            const Icon = serviceIcons[item.title];
            const imageUrl = images.serviceImages[item.title];

            return (
              <Reveal key={item.title} delay={(i % 4) * 0.08}>
                <article className="card card-hover group flex h-full flex-col overflow-hidden">
                  {/* Service photo slot — zooms subtly on card hover */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-primary/5">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : null}
                    <span className="absolute left-0 top-0 z-10 flex h-12 w-12 items-center justify-center bg-accent text-white shadow-md">
                      {Icon ? <Icon className="h-5 w-5" /> : null}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-8">
                    <h3 className="font-heading text-lg font-extrabold uppercase tracking-display text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>

                    <a
                      href={whatsappForService(item.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent transition-colors hover:text-secondary"
                    >
                      Enquire
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1.5"
                      >
                        →
                      </span>
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
