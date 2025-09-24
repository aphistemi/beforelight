import { useEffect, useState } from 'react';
import StickyImageSection from '@/components/StickyImageSection';
import VideoSection from '@/components/VideoSection';
import ScrollIndicator from '@/components/ScrollIndicator';

// Import user's images
import handsImage from '@assets/ChatGPT Image Sep 24, 2025, 05_29_45 PM_1758729617680.png';
import coatImage from '@assets/ChatGPT Image Sep 24, 2025, 06_48_49 PM_1758729617679.png';

export default function Home() {
  const [globalScrollProgress, setGlobalScrollProgress] = useState(0);

  useEffect(() => {
    // Smooth scrolling with resistance
    document.documentElement.style.scrollBehavior = 'auto';
    
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrolled / maxScroll;
      setGlobalScrollProgress(progress);
    };

    // Add scroll resistance
    let scrollTimeout: NodeJS.Timeout;
    const handleScrollWithResistance = (e: WheelEvent) => {
      clearTimeout(scrollTimeout);
      
      // Add slight resistance to scrolling
      const resistance = 0.7;
      const dampedDelta = e.deltaY * resistance;
      
      window.scrollBy({
        top: dampedDelta,
        behavior: 'auto'
      });
      
      e.preventDefault();
      
      scrollTimeout = setTimeout(() => {
        handleScroll();
      }, 16);
    };

    window.addEventListener('wheel', handleScrollWithResistance, { passive: false });
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.removeEventListener('wheel', handleScrollWithResistance);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div 
      className="min-h-screen"
      style={{
        background: `linear-gradient(to bottom, 
          rgb(10, 10, 10) 0%, 
          rgb(5, 5, 5) 50%, 
          rgb(0, 0, 0) 100%)`
      }}
    >
      <ScrollIndicator />
      
      {/* Hands Image - First Sticky Section */}
      <StickyImageSection 
        imageSrc={handsImage}
        sectionIndex={0}
        totalSections={3}
      />

      {/* Coat Image - Second Sticky Section */}
      <StickyImageSection 
        imageSrc={coatImage}
        sectionIndex={1}
        totalSections={3}
      />

      {/* Text Section - Third Sticky Section */}
      <div 
        className="relative h-screen flex items-center justify-center"
        style={{
          background: `linear-gradient(to bottom, 
            rgba(0,0,0,0.8) 0%, 
            rgba(0,0,0,0.95) 100%)`
        }}
      >
        <div className="text-center max-w-2xl px-8">
          <div 
            className="text-3xl md:text-5xl font-light tracking-wide text-white/90 leading-relaxed font-[Inter]"
            style={{
              textShadow: '0 2px 20px rgba(0,0,0,0.8)'
            }}
          >
            <div>We're swaying to drum beats</div>
            <div><em className="text-white/70">In motion, I'm feeling..</em></div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div 
        className="relative"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgb(0,0,0) 100%)'
        }}
      >
        <VideoSection />
      </div>

      {/* Final dark section */}
      <div className="h-32 bg-black" />
    </div>
  );
}