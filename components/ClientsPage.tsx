import Image from 'next/image';
import Reveal from './Reveal';
import AnimatedNumber from './AnimatedNumber';
import { clients, clientStats, sectors, testimonials } from '@/data/clients';
import { whatsappQuote, telHref } from '@/data/site';
import { PhoneIcon, WhatsAppIcon } from './icons';

/** Monogram fallback shown until a real client logo is supplied. */
function ClientMark({ name }: { name: string }) {
  const initials = name
    .replace(/[[\]]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      className="flex h-14 w-14 shrink-0 items-center justify-center bg-soft font-heading text-base font-extrabold tracking-display text-primary/50 transition-colors duration-500 group-hover:bg-accent group-hover:text-white"
    >
      {initials}
    </span>
  );
}

export default function ClientsPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-primary pb-20 pt-36 text-white lg:pb-24 lg:pt-44 2xl:pb-32 2xl:pt-52">
        <div className="container-content">
          <Reveal className="max-w-3xl 2xl:max-w-5xl">
            <span className="rule" />
            <span className="eyebrow-light">Our Clients</span>
            <h1 className="display text-[2.75rem] text-white sm:text-5xl lg:text-6xl 2xl:text-7xl">
              Trusted by <span className="text-accent">industry leaders</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg 2xl:max-w-2xl 2xl:text-xl">
              From corporate campuses and manufacturing plants to housing societies and hospitals —
              organisations across Maharashtra rely on Samarth Security for disciplined guarding,
              housekeeping and manpower.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section aria-label="Client statistics" className="border-b border-primary/10 bg-surface">
        <div className="container-content grid gap-px bg-primary/10 sm:grid-cols-2 lg:grid-cols-4">
          {clientStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.07}>
              <div className="h-full bg-surface px-6 py-10 text-center 2xl:py-14">
                <span className="block font-heading text-3xl font-extrabold tracking-display text-primary lg:text-4xl 2xl:text-5xl">
                  <AnimatedNumber value={stat.value} duration={1.8} />
                </span>
                <span className="mt-3 block text-[0.65rem] font-bold uppercase tracking-widest text-muted">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Client roster, grouped by sector */}
      <section className="section bg-soft" aria-labelledby="roster-heading">
        <div className="container-content">
          <Reveal className="max-w-2xl">
            <span className="rule" />
            <span className="eyebrow">Client Roster</span>
            <h2 id="roster-heading" className="section-title">
              Who we serve
            </h2>
            <p className="lede mt-6">
              A cross-section of the organisations we protect and maintain across the state.
            </p>
          </Reveal>

          <div className="mt-16 space-y-16">
            {sectors.map((sector) => {
              const list = clients.filter((c) => c.sector === sector);
              if (list.length === 0) return null;

              return (
                <div key={sector}>
                  <h3 className="mb-8 flex items-center gap-4 font-heading text-sm font-extrabold uppercase tracking-widest text-primary">
                    {sector}
                    <span className="h-px flex-1 bg-primary/15" />
                    <span className="text-muted">{String(list.length).padStart(2, '0')}</span>
                  </h3>

                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {list.map((client, i) => (
                      <Reveal key={client.name} delay={(i % 3) * 0.07}>
                        <article className="card card-hover group flex h-full items-start gap-5 p-7">
                          {client.logo ? (
                            <Image
                              src={client.logo}
                              alt={`${client.name} — Samarth Security client logo`}
                              width={56}
                              height={56}
                              className="h-14 w-14 shrink-0 object-contain"
                            />
                          ) : (
                            <ClientMark name={client.name} />
                          )}

                          <div className="min-w-0">
                            <h4 className="font-heading text-base font-extrabold uppercase tracking-display text-primary">
                              {client.name}
                            </h4>
                            {client.city && (
                              <p className="mt-1 text-[0.7rem] font-bold uppercase tracking-wider text-accent">
                                {client.city}
                              </p>
                            )}
                            {client.note && (
                              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                                {client.note}
                              </p>
                            )}
                          </div>
                        </article>
                      </Reveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-surface" aria-labelledby="testimonials-heading">
        <div className="container-content">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="rule mx-auto" />
            <span className="eyebrow">Testimonials</span>
            <h2 id="testimonials-heading" className="section-title">
              What our clients say
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.author + i} delay={i * 0.08}>
                <figure className="card card-hover flex h-full flex-col border-t-2 border-accent p-8 lg:p-10">
                  <span aria-hidden="true" className="font-heading text-5xl leading-none text-accent/30">
                    &ldquo;
                  </span>
                  <blockquote className="mt-4 flex-1 leading-relaxed text-muted">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-7 border-t border-primary/10 pt-5">
                    <span className="block font-heading text-sm font-extrabold uppercase tracking-display text-primary">
                      {t.author}
                    </span>
                    <span className="mt-1 block text-xs text-muted">{t.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-secondary py-16 text-white lg:py-20">
        <div className="container-content">
          <Reveal>
            <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
              <h2 className="font-heading text-2xl font-extrabold uppercase leading-tight tracking-display sm:text-3xl lg:max-w-2xl">
                Ready to secure your premises with a PSARA-licensed team?
              </h2>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappQuote}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-white text-secondary hover:-translate-y-0.5 hover:bg-soft hover:shadow-lift"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Get a Free Quote
                </a>
                <a href={telHref} className="btn-outline-light">
                  <PhoneIcon className="h-4 w-4" />
                  Call Now
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
