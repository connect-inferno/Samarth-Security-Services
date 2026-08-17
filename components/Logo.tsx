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
    <span className="flex items-center gap-2.5 sm:gap-3">
      <span className="relative flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center overflow-hidden rounded bg-white p-0.5 shadow-sm ring-1 ring-black/5">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="40px"
          className="object-contain object-center"
        />
      </span>
      <span className="flex flex-col leading-tight min-w-0">
        <span
          className={`font-heading text-xs xs:text-sm sm:text-base font-extrabold uppercase tracking-display truncate ${
            isLight ? 'text-white' : 'text-primary'
          }`}
        >
          {company.name}
        </span>
        <span
          className={`text-[0.55rem] sm:text-[0.6rem] font-bold uppercase tracking-widest truncate ${
            isLight ? 'text-white/55' : 'text-muted'
          }`}
        >
          {company.parent}
        </span>
      </span>
    </span>
  );
}
