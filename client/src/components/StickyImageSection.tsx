import { useEffect, useRef, useState } from 'react';

interface StickyImageSectionProps {
  imageSrc: string;
  sectionIndex: number;
  totalSections: number;
  children?: React.ReactNode;
}

export default function StickyImageSection({ 
  imageSrc, 
  sectionIndex, 
  totalSections,
  children 
}: StickyImageSectionProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lastScrollTime, setLastScrollTime] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      // Calculate if section is in view
      const isInView = rect.top < windowHeight && rect.bottom > 0;
      setIsActive(isInView);
      
      if (isInView) {
        // Calculate scroll progress within this section
        const progress = Math.max(0, Math.min(1, 
          (windowHeight - rect.top) / (windowHeight + sectionHeight)
        ));
        setScrollProgress(progress);
        setLastScrollTime(Date.now());
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Progressive darkening based on section index
  const baseDarkness = 0.2 + (sectionIndex / totalSections) * 0.6;
  const additionalDarkness = scrollProgress * 0.3;
  const totalDarkness = Math.min(0.9, baseDarkness + additionalDarkness);

  // Scroll resistance effect
  const scrollResistance = isActive && scrollProgress > 0.3 && scrollProgress < 0.9;

  return (
    <div 
      ref={sectionRef}
      className="relative h-[150vh] flex items-center justify-center overflow-hidden"
      data-testid={`sticky-image-section-${sectionIndex}`}
      style={{
        background: `linear-gradient(to bottom, 
          rgba(0,0,0,${totalDarkness}) 0%, 
          rgba(0,0,0,${Math.min(0.95, totalDarkness + 0.1)}) 100%)`
      }}
    >
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300"
        style={{
          backgroundImage: `url(${imageSrc})`,
          transform: `scale(${1 + scrollProgress * 0.1}) translateY(${scrollProgress * -20}px)`,
          opacity: Math.max(0.3, 1 - scrollProgress * 0.4)
        }}
      />
      
      {/* Progressive darkness overlay */}
      <div 
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at center, 
            rgba(0,0,0,${totalDarkness * 0.7}) 0%, 
            rgba(0,0,0,${totalDarkness}) 70%)`
        }}
      />
      
      {/* Scroll resistance visual feedback */}
      {scrollResistance && (
        <div className="absolute inset-0 bg-black/10 animate-pulse transition-opacity duration-300" />
      )}
      
      {/* Content */}
      <div 
        className="relative z-10 transition-all duration-700"
        style={{
          transform: `translateY(${scrollProgress * 30 - 15}px)`,
          opacity: Math.max(0.4, 1 - scrollProgress * 0.3)
        }}
      >
        <div className="max-w-4xl mx-auto px-8">
          <img
            src={imageSrc}
            alt=""
            className="w-full max-h-[70vh] object-contain filter contrast-125 brightness-90"
            style={{
              filter: `contrast(${1.2 + scrollProgress * 0.3}) brightness(${0.9 - scrollProgress * 0.2}) grayscale(${scrollProgress * 0.5})`
            }}
          />
          {children && (
            <div 
              className="mt-12 text-center"
              style={{
                opacity: Math.max(0, 1 - scrollProgress * 1.5)
              }}
            >
              {children}
            </div>
          )}
        </div>
      </div>
      
      {/* Scroll indicator for this section */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-12 bg-white/20 relative">
          <div 
            className="absolute bottom-0 w-full bg-white/60 transition-all duration-300"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}