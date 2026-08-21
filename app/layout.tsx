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
  alternates: { canonical: '/' },
  authors: [{ name: company.name, url: SITE_URL }],
  creator: company.name,
  publisher: company.name,
  category: 'Business',
  applicationName: company.name,
  // Site-wide default; /clients overrides with its own tailored image (see
  // app/clients/page.tsx) — every other route inherits this one.
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
  // [REVIEW] Add your Google Search Console / Bing Webmaster verification
  // codes here once you've registered the property, e.g.:
  //   verification: { google: 'abc123', other: { 'msvalidate.01': 'xyz456' } }
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
