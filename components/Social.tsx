import Reveal from './Reveal';
import { InstagramIcon } from './icons';
import { social } from '@/data/content';
import { contact } from '@/data/site';

export default function Social() {
  return (
    <section id="social" className="section bg-soft" aria-labelledby="social-heading">
      <div className="container-content">
        <Reveal>
          <div className="flex flex-col items-center gap-8 bg-surface p-12 text-center shadow-soft lg:flex-row lg:justify-between lg:p-16 lg:text-left">
            <div className="max-w-xl">
              <span className="eyebrow">{social.eyebrow}</span>
              <h2 id="social-heading" className="section-title">
                {social.heading}
              </h2>
              <p className="lede mt-5">{social.body}</p>
            </div>

            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn shrink-0 bg-gradient-to-r from-secondary to-accent text-white hover:-translate-y-0.5 hover:shadow-lift"
            >
              <InstagramIcon className="h-4 w-4" />
              Follow {contact.instagramHandle}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
