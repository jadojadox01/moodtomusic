// Remove <link> tags from here
// Add fonts in app/layout.js instead

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Footer from '@/components/Footer'; 
import Providers from './Providers';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-900 text-white">
      <Providers>
        <Header />
        <Hero />
        <HowItWorks />
        <Features />
        <Footer />
      </Providers>
    </div>
  );
}
