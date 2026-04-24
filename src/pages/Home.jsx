import { useState, useEffect } from 'react';
import HeroSection from '../components/landing/HeroSection';
import AuthoritySection from '../components/landing/AuthoritySection';
import PhysicalPresence from '../components/landing/PhysicalPresence';
import FractalMath from '../components/landing/FractalMath';
import LifestyleSection from '../components/landing/LifestyleSection';
import FinalCTA from '../components/landing/FinalCTA';
import Footer from '../components/landing/Footer';
import ScrollProgress from '../components/landing/ScrollProgress';
import BottomNav from '../components/landing/BottomNav';
import ScrollDownButton from '../components/landing/ScrollDownButton';
export default function Home() {

  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e) => e.preventDefault();
    // Disable text selection
    const handleSelectStart = (e) => e.preventDefault();
    // Disable keyboard shortcuts (Ctrl+U, Ctrl+S, Ctrl+A, Ctrl+C, F12, etc.)
    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && ['u', 'U', 's', 'S', 'a', 'A', 'c', 'C', 'i', 'I', 'j', 'J'].includes(e.key)) ||
        (e.ctrlKey && e.shiftKey && ['i', 'I', 'j', 'J', 'c', 'C'].includes(e.key))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const BACKGROUND_LOGO = 'https://media.base44.com/images/public/69ea590d4b02176846809f70/75a8a45d3_BOLDLIFE052-LOGO.png';

  return (
    <div className="relative bg-background text-foreground min-h-screen overflow-x-hidden">
      {/* Background decorative logo */}
      <div className="fixed inset-0 opacity-5 pointer-events-none flex items-center justify-center">
        <img src={BACKGROUND_LOGO} alt="" className="w-[800px] h-[800px] object-contain" />
      </div>
      <div className="relative z-10">
        <ScrollProgress />
        <BottomNav />
        <ScrollDownButton />
      </div>

      <div className="relative z-10">
        <HeroSection />
        <AuthoritySection />
        <PhysicalPresence />
        <FractalMath />
        <LifestyleSection />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}