import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import MentorCarousel from '@/components/MentorCarousel';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <main className="mx-auto max-w-[1320px] px-6 md:px-12">
        <Navbar />
        <Hero />
        <HowItWorks />
      </main>

      {/* Mentor carousel spans full width for the fade-edge effect */}
      <MentorCarousel />

      <Footer />
    </>
  );
}
