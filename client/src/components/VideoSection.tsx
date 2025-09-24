import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VideoSectionProps {
  title?: string;
  description?: string;
}

export default function VideoSection({ title, description }: VideoSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Detect iOS
  useEffect(() => {
    setIsIOS(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent));
  }, []);

  // iOS video loading handler
  useEffect(() => {
    if (isIOS && videoRef.current) {
      const video = videoRef.current;
      
      const handleLoadedData = () => {
        setVideoLoaded(true);
        console.log('iOS video loaded successfully');
      };
      
      const handleError = (e: any) => {
        console.log('iOS video error:', e);
        setVideoLoaded(false);
      };
      
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);
      
      // Force load for iOS
      video.load();
      
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
      };
    }
  }, [isIOS]);

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

  const handlePlayClick = async () => {
    if (videoRef.current) {
      try {
        if (isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        } else {
          const isIOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
          
          if (isIOS) {
            // iOS-specific handling
            videoRef.current.load();
            videoRef.current.muted = false; // Unmute for iOS
            setIsMuted(false);
          }
          
          await videoRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.log('Video play error:', error);
        // Fallback: try without async
        if (!isPlaying && videoRef.current) {
          videoRef.current.play().catch(() => {
            console.log('Video playback failed - check iOS restrictions');
          });
          setIsPlaying(true);
        }
      }
    }
  };

  const handleMuteClick = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

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
          {/* Actual video */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            loop
            muted={isMuted}
            playsInline
            poster="/video-thumbnail.png"
            preload="metadata"
            webkit-playsinline="true"
            controls={isIOS && isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onLoadStart={() => console.log('Video loading...')}
            onCanPlay={() => console.log('Video can play')}
            onLoadedData={() => setVideoLoaded(true)}
            onError={(e) => console.log('Video error:', e)}
          >
            {isIOS ? (
              // iOS: Use MP4 first, fallback to WebM
              <>
                <source src="/afterdark1.mp4" type="video/mp4" />
                <source src="/afterdark1.webm" type="video/webm" />
              </>
            ) : (
              // Other browsers: Use WebM first
              <>
                <source src="/afterdark1.webm" type="video/webm" />
                <source src="/afterdark1.mp4" type="video/mp4" />
              </>
            )}
            Your browser does not support the video tag.
          </video>
          
          {/* Subtle play overlay over thumbnail */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-all duration-300 pointer-events-none">
              <div className="text-center">
                {/* Large play button */}
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 border-2 border-white/80 rounded-full flex items-center justify-center group-hover:border-white group-hover:scale-110 transition-all duration-300 backdrop-blur-sm bg-black/30">
                  <div className="w-0 h-0 border-l-[10px] md:border-l-[12px] border-l-white/90 border-t-[7px] md:border-t-[8px] border-t-transparent border-b-[7px] md:border-b-[8px] border-b-transparent ml-1" />
                </div>
                
                {/* Play text */}
                <div className="text-white/95">
                  <div className="text-base md:text-lg font-light tracking-[0.3em] mb-1">PLAY</div>
                  <div className="text-xs text-white/70 font-light tracking-wide">As the hours pass</div>
                </div>
              </div>
            </div>
          )}
          
          {/* Mute/unmute button - only visible when playing */}
          {isPlaying && (
            <button
              onClick={handleMuteClick}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center group hover-elevate transition-all duration-300"
              data-testid="button-video-sound"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white/80 group-hover:text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white/80 group-hover:text-white" />
              )}
            </button>
          )}

          {/* Play/pause overlay - covers entire video */}
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 z-20 transition-all duration-300 bg-transparent hover:bg-black/5 cursor-pointer"
            data-testid="button-video-play"
            aria-label="Play video"
            style={{ minHeight: '100%', minWidth: '100%' }}
          >
            {/* This button covers the whole video for easy clicking */}
          </button>
        </div>
      </div>
    </section>
  );
}