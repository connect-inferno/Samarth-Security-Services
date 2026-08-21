import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ClientsPage from '@/components/ClientsPage';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { SITE_URL } from '@/data/site';

export const metadata: Metadata = {
  title: 'Our Clients | Samarth Security — Trusted by Industry Leaders in Maharashtra',
  description:
    'Corporate offices, factories, housing societies, malls, hospitals and campuses across Sangli, Mumbai, Pune, Kolhapur, Solapur, Satara, Ahilyanagar and Dharashiv trust Samarth Security for PSARA-licensed guarding, housekeeping and manpower.',
  alternates: { canonical: '/clients' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/clients`,
    title: 'Our Clients | Samarth Security',
    description:
      'Organisations across Maharashtra that rely on Samarth Security for guarding, housekeeping and manpower services.',
    images: [
      {
        url: '/images/og-image-clients.png',
        width: 1200,
        height: 630,
        alt: 'Samarth Security — Trusted by Industry Leaders Across Maharashtra',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og-image-clients.png'],
  },
};

export default function Clients() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Our Clients', path: '/clients' }]} />
      {/* Sub-pages have no full-bleed hero behind the header, so it renders solid. */}
      <Header alwaysSolid />
      <main id="main">
        <ClientsPage />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
