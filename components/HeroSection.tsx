import { useEffect, useRef, useState } from 'react';

interface HeroSectionProps {
  imageSrc: string;
  title?: string;
  subtitle?: string;
}

export default function HeroSection({ imageSrc, title, subtitle }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[2000ms] ${
          isVisible ? 'scale-100 opacity-100' : 'scale-105 opacity-80'
        }`}
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40" />
      
      {(title || subtitle) && (
        <div 
          className={`relative z-10 text-center px-8 max-w-4xl transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {title && (
            <h1 
              className="text-6xl md:text-8xl font-light tracking-widest text-white mb-8 font-[Inter]"
              data-testid="text-hero-title"
            >
              {title}
            </h1>
          )}
          {subtitle && (
            <p 
              className="text-xl md:text-2xl font-light text-white/80 tracking-wide font-[Inter]"
              data-testid="text-hero-subtitle"
            >
              {subtitle}
            </p>
          )}
        </div>
      )}
    </section>
  );
}