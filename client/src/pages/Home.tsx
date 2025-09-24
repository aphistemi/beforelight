import { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import ImageBlock from '@/components/ImageBlock';
import TextOverlay from '@/components/TextOverlay';
import VideoSection from '@/components/VideoSection';
import ScrollIndicator from '@/components/ScrollIndicator';

// Import generated images
import heroImage from '@assets/generated_images/Abstract_minimalist_art_piece_c8fcdb1d.png';
import architectureImage from '@assets/generated_images/Architectural_art_photography_b9d97021.png';
import textureImage from '@assets/generated_images/Abstract_texture_art_04b4a2bc.png';

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
      
      {/* Hero Section */}
      <HeroSection 
        imageSrc={heroImage}
        title="EXHIBITION"
        subtitle="Contemporary minimalist works in monochrome"
      />

      {/* First Text Overlay */}
      <TextOverlay position="center" size="large">
        The interplay between light and shadow reveals the essence of form
      </TextOverlay>

      {/* First Image Block */}
      <ImageBlock 
        imageSrc={architectureImage}
        caption="ARCHITECTURAL FORMS · 2024"
        position="left"
        size="medium"
      />

      {/* Second Text Overlay */}
      <TextOverlay position="right" size="medium">
        Each piece explores the boundaries of perception and reality
      </TextOverlay>

      {/* Second Image Block */}
      <ImageBlock 
        imageSrc={textureImage}
        caption="ABSTRACT COMPOSITION · MIXED MEDIA"
        position="center"
        size="large"
      />

      {/* Third Text Overlay */}
      <TextOverlay position="left" size="small">
        <em>Where minimalism meets emotional depth</em>
      </TextOverlay>

      {/* Video Section */}
      <VideoSection 
        title="MOTION"
        description="An exploration of time and space through moving imagery"
      />

      {/* Final Text Overlay */}
      <TextOverlay position="center" size="medium">
        <div className="space-y-8">
          <p>A journey through contemporary visual expression</p>
          <div className="text-sm text-muted-foreground tracking-[0.3em]">
            CURATED · 2024
          </div>
        </div>
      </TextOverlay>

      {/* Bottom spacing */}
      <div className="h-32" />
    </div>
  );
}