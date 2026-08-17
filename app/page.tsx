import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import About from '@/components/About';
import Services from '@/components/Services';
import Operations from '@/components/Operations';
import Compliance from '@/components/Compliance';
import Branches from '@/components/Branches';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import Social from '@/components/Social';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <TrustBar />
        <Services />
        <About />
        <Operations />
        <Compliance />
        <Branches />
        <WhyChooseUs />
        <Testimonials />
        <Social />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
