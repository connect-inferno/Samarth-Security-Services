import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import LegalPage from '@/components/LegalPage';
import { privacyPolicy } from '@/data/legal';
import { SITE_URL } from '@/data/site';

export const metadata: Metadata = {
  title: 'Privacy Policy | Samarth Security',
  description:
    'How Samarth Security collects, uses and protects the personal information you share through this website.',
  alternates: { canonical: '/privacy-policy' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'article',
    url: `${SITE_URL}/privacy-policy`,
    title: 'Privacy Policy | Samarth Security',
    description: 'How we collect, use and protect your personal information.',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header alwaysSolid />
      <main id="main">
        <LegalPage doc={privacyPolicy} />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
