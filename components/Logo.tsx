import Image from 'next/image';
import { company } from '@/data/site';

interface LogoProps {
  variant?: 'light' | 'dark';
  src?: string;
  alt?: string;
}

export default function Logo({
  variant = 'light',
  src = '/images/samarth_logo.jpg',
  alt = 'Samarth Security logo',
}: LogoProps) {
  // `light` = for dark (navy) backgrounds; `dark` = for white backgrounds.
  const isLight = variant === 'light';

  return (
    <span className="flex items-center gap-3">
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded bg-white p-0.5 shadow-sm ring-1 ring-black/5">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="40px"
          className="object-contain object-center"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-heading text-[0.95rem] font-extrabold uppercase tracking-display sm:text-base ${
            isLight ? 'text-white' : 'text-primary'
          }`}
        >
          {company.name}
        </span>
        <span
          className={`mt-1 text-[0.6rem] font-bold uppercase tracking-widest ${
            isLight ? 'text-white/55' : 'text-muted'
          }`}
        >
          {company.parent}
        </span>
      </span>
    </span>
  );
}
