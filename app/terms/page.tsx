import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import LegalPage from '@/components/LegalPage';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { termsOfService } from '@/data/legal';
import { SITE_URL } from '@/data/site';

export const metadata: Metadata = {
  title: 'Terms of Service | Samarth Security',
  description:
    'The terms that govern your use of the Samarth Security website, and how enquiries and quotations work.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'article',
    url: `${SITE_URL}/terms`,
    title: 'Terms of Service | Samarth Security',
    description: 'Terms governing your use of the Samarth Security website.',
  },
};

export default function TermsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Terms of Service', path: '/terms' }]} />
      <Header alwaysSolid />
      <main id="main">
        <LegalPage doc={termsOfService} />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
