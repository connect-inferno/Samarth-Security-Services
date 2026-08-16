import Reveal from './Reveal';
import { PhoneIcon, MailIcon } from './icons';
import { contact, telHref, mailHref, company } from '@/data/site';
import { branches, fullAddress } from '@/data/branches';
import type { LegalDoc } from '@/data/legal';

/** Shared layout for the Privacy Policy / Terms pages. */
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const ho = branches.find((b) => b.isHeadOffice) ?? branches[0];

  return (
    <>
      <section className="bg-primary pb-16 pt-36 text-white lg:pb-20 lg:pt-44">
        <div className="container-content">
          <Reveal className="max-w-3xl">
            <span className="rule" />
            <span className="eyebrow-light">Legal</span>
            <h1 className="display text-[2.25rem] text-white sm:text-5xl lg:text-6xl">
              {doc.title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              {doc.intro}
            </p>
            <p className="mt-6 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/45">
              Last updated — {doc.lastUpdated}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-content">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* On-page contents */}
            <Reveal className="lg:col-span-4">
              <nav aria-label="On this page" className="lg:sticky lg:top-32">
                <h2 className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted">
                  On this page
                </h2>
                <ol className="mt-6 space-y-3">
                  {doc.sections.map((s, i) => (
                    <li key={s.heading}>
                      <a
                        href={`#${slugify(s.heading)}`}
                        className="flex gap-3 text-sm text-muted transition-colors hover:text-accent"
                      >
                        <span className="font-heading font-extrabold text-accent/50">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </Reveal>

            {/* Body */}
            <div className="lg:col-span-8">
              {doc.sections.map((s, i) => (
                <Reveal key={s.heading} delay={0.05}>
                  <div
                    id={slugify(s.heading)}
                    className={`scroll-mt-32 ${i > 0 ? 'mt-12 border-t border-primary/10 pt-12' : ''}`}
                  >
                    <h2 className="font-heading text-xl font-extrabold uppercase tracking-[-0.04em] text-primary sm:text-2xl">
                      <span className="mr-3 text-accent/50">{String(i + 1).padStart(2, '0')}</span>
                      {s.heading}
                    </h2>
                    {s.body.map((para, j) => (
                      <p key={j} className="mt-5 leading-relaxed text-muted">
                        {para}
                      </p>
                    ))}
                  </div>
                </Reveal>
              ))}

              {/* Contact block */}
              <Reveal>
                <div className="mt-12 border-t border-primary/10 pt-12">
                  <h2 className="font-heading text-xl font-extrabold uppercase tracking-[-0.04em] text-primary sm:text-2xl">
                    Contact us
                  </h2>
                  <p className="mt-5 leading-relaxed text-muted">
                    Questions about this document? Reach {company.name} at:
                  </p>
                  <address className="mt-5 not-italic leading-relaxed text-muted">
                    {fullAddress(ho)}
                  </address>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <a href={telHref} className="btn-outline">
                      <PhoneIcon className="h-4 w-4" />
                      {contact.phoneDisplay}
                    </a>
                    <a href={mailHref} className="btn-outline">
                      <MailIcon className="h-4 w-4" />
                      {contact.email}
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
