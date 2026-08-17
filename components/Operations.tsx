import Reveal from './Reveal';
import { operations } from '@/data/content';

export default function Operations() {
  return (
    <section id="operations" className="section bg-surface" aria-labelledby="operations-heading">
      <div className="container-content">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <span className="rule" />
            <span className="eyebrow">{operations.eyebrow}</span>
            <h2 id="operations-heading" className="section-title">
              {operations.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="lede">{operations.body}</p>
          </Reveal>
        </div>

        {/* Chain of command */}
        <Reveal className="mt-14">
          <ol className="flex flex-col items-stretch gap-y-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-3">
            {operations.chain.map((role, i) => (
              <li key={role} className="flex flex-col items-stretch sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="w-full sm:w-auto rounded border border-primary/20 bg-white px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-primary text-center shadow-sm transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white hover:shadow-md">
                  {role}
                </span>
                {i < operations.chain.length - 1 && (
                  <span aria-hidden="true" className="text-accent text-center font-bold text-base">
                    <span className="sm:hidden">↓</span>
                    <span className="hidden sm:inline">→</span>
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Training pipeline */}
        <div className="mt-20">
          <Reveal className="max-w-2xl">
            <h3 className="font-heading text-2xl font-extrabold uppercase tracking-display text-primary sm:text-3xl">
              {operations.trainingHeading}
            </h3>
            <p className="mt-4 leading-relaxed text-muted">{operations.trainingIntro}</p>
          </Reveal>

          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {operations.training.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1} as="li">
                <div className="card card-hover group flex h-full flex-col border-t-4 border-accent p-8 lg:p-10">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-4xl font-extrabold tracking-display text-accent">
                      {step.step}
                    </span>
                    <span className="rounded bg-primary/5 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-primary/70 transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                      Phase {step.step}
                    </span>
                  </div>
                  <h4 className="mt-6 font-heading text-lg font-extrabold uppercase tracking-display text-primary">
                    {step.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
