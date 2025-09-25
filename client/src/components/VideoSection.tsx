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
        // iOS detection for HLS handling
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        
        // If serving HLS (.m3u8): don't initialize hls.js on iOS
        // iOS has native HLS support, so hls.js is not needed
        if (!isIOS && typeof window !== 'undefined' && (window as any).Hls && (window as any).Hls.isSupported()) {
          // set up hls.js ONLY for non-iOS browsers
          // (Currently using MP4, but this is ready for HLS if needed)
        }

        // Initialize Fluid Player with iOS-friendly safe configuration
        fluidPlayerInstance.current = fluidPlayer('arcadia-video', {
          layoutControls: {
            fillToContainer: true,
            autoPlay: false,   // set true only if mute:true
            mute: false,
            captionsEnabled: false
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
            <source src="/afterdark1e1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
        </div>
      </div>
    </section>
  );
}