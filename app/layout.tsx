import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import JsonLd from '@/components/JsonLd';
import { SITE_URL, seo, company } from '@/data/site';

// Two weights max, self-hosted via next/font (no layout shift, no extra network).
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL || 'https://samarthsecurityservices.gadadegroup.in'),
  title: seo.title,
  description: seo.description,
  keywords: [
    'security services Maharashtra',
    'PSARA licensed security company',
    'security guard agency Sangli',
    'security guard agency Pune',
    'security guard agency Mumbai',
    'security guard agency Kolhapur',
    'housekeeping services',
    'manpower services',
    'Gadade Group',
    'Samarth Security',
  ],
  // No canonical set here deliberately. This site is served statically on
  // TWO domains (samarthsecurityservices.gadadegroup.in and
  // www.gadadegroup.in — same deployment, same content, both meant to be
  // independently indexed). A static canonical baked in at build time would
  // always point at one domain regardless of which one actually served the
  // page — which is exactly what was suppressing gadadegroup.in from search
  // before. The real, per-host-correct canonical is set at request time
  // instead, via an HTTP Link header in middleware.ts.
  authors: [{ name: company.name, url: SITE_URL }],
  creator: company.name,
  publisher: company.name,
  category: 'Business',
  applicationName: company.name,
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: company.name,
    title: seo.title,
    description: seo.description,
    locale: 'en_IN',
    images: [
      {
        url: seo.ogImage,
        width: 1200,
        height: 630,
        alt: 'Samarth Security — PSARA licensed security, housekeeping & manpower services in Maharashtra',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/images/gadage_logo.jpg',
    shortcut: '/images/gadage_logo.jpg',
    apple: '/images/gadage_logo.jpg',
  },
  manifest: '/site.webmanifest',
  // Stops mobile browsers auto-linking arbitrary digit strings on the page
  // (a certificate number, a postal code) as if they were phone numbers —
  // the real phone number already has explicit tel: links in the header,
  // hero and Contact section.
  formatDetection: { telephone: false },
  // Google Search Console / Bing Webmaster verification.
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION or GOOGLE_SITE_VERIFICATION in .env.local or host settings.
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      process.env.GOOGLE_SITE_VERIFICATION ||
      undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Keyboard/screen-reader users can jump past the nav. Visible only on focus. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]
                     focus:bg-accent focus:px-6 focus:py-3 focus:text-xs focus:font-bold
                     focus:uppercase focus:tracking-[0.1em] focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
