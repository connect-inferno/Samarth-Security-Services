import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        // Extra-small breakpoint for very narrow phones (the display headline
        // needs one more step down below 400px).
        xs: '400px',
      },
      colors: {
        // Deep corporate navy — the anchor of the palette.
        primary: {
          DEFAULT: '#002451',
          light: '#1A3A6B',
          dark: '#00183A',
        },
        secondary: '#7C0202', // deep maroon — accent bands
        accent: '#C8202F', // brand red — CTAs & highlights
        soft: '#F2F4F7', // soft blue-grey — alternating section bg
        surface: '#FFFFFF',
        ink: '#191C1E', // body text
        muted: '#5A6B85', // secondary text
        'eyebrow-blue': '#89A5DD', // soft blue eyebrow on dark backgrounds
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-manrope)', 'var(--font-inter)', 'sans-serif'],
      },
      maxWidth: {
        content: '1280px',
      },
      letterSpacing: {
        tightest: '-0.05em',
        display: '-0.04em',
        wider: '0.1em',
        widest: '0.2em',
      },
      boxShadow: {
        // Soft, wide, low-opacity — the signature "premium" lift.
        soft: '0 20px 40px 0 rgba(0, 36, 81, 0.08)',
        lift: '0 28px 60px 0 rgba(0, 36, 81, 0.14)',
        nav: '0 1px 0 0 rgba(0, 36, 81, 0.08)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'soft-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.55' },
          '50%': { transform: 'scale(1.18)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'soft-pulse': 'soft-pulse 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
