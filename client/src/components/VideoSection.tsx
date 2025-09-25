import { useEffect, useRef, useState } from 'react';

// Declare Fluid Player types
declare global {
  function fluidPlayer(selector: string, options: any): any;
}

interface VideoSectionProps {
  title?: string;
  description?: string;
}

export default function VideoSection({ title, description }: VideoSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fluidPlayerInstance = useRef<any>(null);

  // Initialize Fluid Player
  useEffect(() => {
    const initFluidPlayer = () => {
      if (videoRef.current && typeof fluidPlayer !== 'undefined') {
        // Initialize Fluid Player with iOS-friendly safe configuration
        fluidPlayerInstance.current = fluidPlayer('arcadia-video', {
          layoutControls: {
            fillToContainer: true,
            autoPlay: false,   // set true only if mute:true
            mute: false,
            captionsEnabled: true
          }
        });

        // Listen to events
        fluidPlayerInstance.current.on('play', () => {
          console.log('Fluid Player started');
        });

        // Ensure a real user gesture starts playback on iOS
        const v = document.getElementById('arcadia-video') as HTMLVideoElement;
        if (v) {
          ['touchend','click'].forEach(ev =>
            v.addEventListener(ev, () => v.play().catch(()=>{}), { once:true })
          );
        }
      }
    };

    // Wait for Fluid Player script to load
    if (typeof fluidPlayer === 'undefined') {
      const checkFluidPlayer = setInterval(() => {
        if (typeof fluidPlayer !== 'undefined') {
          clearInterval(checkFluidPlayer);
          initFluidPlayer();
        }
      }, 100);
      
      return () => clearInterval(checkFluidPlayer);
    } else {
      initFluidPlayer();
    }

    return () => {
      if (fluidPlayerInstance.current && fluidPlayerInstance.current.destroy) {
        fluidPlayerInstance.current.destroy();
      }
    };
  }, []);

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

  // Focus detection based on scroll position
  useEffect(() => {
    let animationFrameId: number;
    
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerCenter = containerRect.top + containerRect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distance = Math.abs(containerCenter - viewportCenter);
      const threshold = window.innerHeight * 0.15; // More sensitive on mobile
      
      const shouldFocus = distance < threshold && containerRect.top < viewportCenter && containerRect.bottom > viewportCenter;
      
      if (shouldFocus !== isFocused) {
        setIsFocused(shouldFocus);
        
        // Don't auto-play, just focus the video section
      }
    };
    
    const throttledScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        handleScroll();
        throttledScroll();
      });
    };
    
    throttledScroll();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isFocused]);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-24 px-8 flex items-center justify-center"
      data-testid="section-video"
    >
      <div className="max-w-6xl w-full">
        {title && (
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <h2 
              className="text-4xl md:text-6xl font-light tracking-widest text-foreground mb-8 font-[Inter]"
              data-testid="text-video-title"
            >
              {title}
            </h2>
            {description && (
              <p 
                className="text-lg text-muted-foreground font-light tracking-wide font-[Inter] max-w-2xl mx-auto"
                data-testid="text-video-description"
              >
                {description}
              </p>
            )}
          </div>
        )}
        
        {/* Focus overlay - dims the page when video is focused (disabled on iOS for compatibility) */}
        {isFocused && !/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) && (
          <div 
            className="fixed inset-0 z-50 bg-black/70 transition-opacity duration-500"
            data-testid="overlay-video-focus"
          />
        )}
        
        <div 
          ref={containerRef}
          className={`relative aspect-video bg-black overflow-hidden transition-all duration-700 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          } ${
            isFocused && !/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
              ? 'scale-105 sm:scale-110 z-[60] rounded-none shadow-[0_20px_60px_rgba(0,0,0,0.6)]' 
              : 'rounded-sm z-10'
          }`}
        >
          {/* Fluid Player Video */}
          <video
            ref={videoRef}
            id="arcadia-video"
            playsInline
            webkit-playsinline="true"
            controls
            preload="metadata"
            width="100%"
            height="100%"
            poster="/video-thumbnail.png"
            data-testid="video-player"
            style={{ width: '100%', height: '100%' }}
          >
            <source src="/afterdark1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Video title overlay */}
          <div className="absolute bottom-8 left-8 text-white z-50 pointer-events-none">
            <h3 className="text-lg font-light tracking-wide">As the hours pass</h3>
          </div>
        </div>
      </div>
    </section>
  );
}