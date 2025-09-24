import { useEffect } from 'react';
import ImageBlock from '@/components/ImageBlock';
import TextOverlay from '@/components/TextOverlay';
import VideoSection from '@/components/VideoSection';
import ScrollIndicator from '@/components/ScrollIndicator';

// Import user's images
import handsImage from '@assets/ChatGPT Image Sep 24, 2025, 05_29_45 PM_1758729617680.png';
import coatImage from '@assets/ChatGPT Image Sep 24, 2025, 06_48_49 PM_1758729617679.png';

export default function Home() {
  useEffect(() => {
    // Smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <ScrollIndicator />
      
      {/* Hands Image - First */}
      <ImageBlock 
        imageSrc={handsImage}
        position="center"
        size="large"
      />

      {/* Coat Image - Second */}
      <ImageBlock 
        imageSrc={coatImage}
        position="center"
        size="large"
      />

      {/* Text */}
      <TextOverlay position="center" size="medium">
        <div className="leading-relaxed">
          We're swaying to drum beats<br />
          In motion, I'm feeling..
        </div>
      </TextOverlay>

      {/* Video Section - After images */}
      <VideoSection />

      {/* Bottom spacing */}
      <div className="h-32" />
    </div>
  );
}