import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Footer from '@/components/Footer'; 
import Providers from './Providers';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-900 text-white">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
          <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
    rel="stylesheet"
  />
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