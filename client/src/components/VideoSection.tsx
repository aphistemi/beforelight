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
    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleLoadedData = () => {
        setVideoLoaded(true);
        console.log('Video loaded successfully');
      };
      
      const handleError = (e: any) => {
        console.log('Video error:', e);
        setVideoLoaded(false);
      };
      
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);
      
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
      };
    }
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

  const handlePlayClick = async () => {
    if (!videoRef.current) return;
    
    try {
      console.log('Custom play button clicked');
      
      // Enable native controls and play
      videoRef.current.controls = true;
      await videoRef.current.play();
      
      // State will be set by onPlay event
      console.log('Video started successfully');
    } catch (error) {
      console.error('Error starting video:', error);
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
          {/* Direct static video file - basic test with debugging */}
          <video
            ref={videoRef}
            controls
            width="100%"
            height="100%"
            poster="/video-thumbnail.png"
            data-testid="video-player"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          >
            <source src="/working_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Video title overlay */}
          <div className="absolute bottom-8 left-8 text-white">
            <h3 className="text-lg font-light tracking-wide">As the hours pass</h3>
          </div>
          

          {/* Mute/unmute button - only visible when playing on desktop */}
          {isPlaying && !isIOS && (
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

          {/* Play/pause overlay - only shows when paused (hidden on iOS to avoid conflicts with native controls) */}
          {!isIOS && !isPlaying && (
            <button
              onClick={handlePlayClick}
              className="absolute inset-0 z-20 transition-all duration-300 bg-transparent hover:bg-black/5 cursor-pointer"
              data-testid="button-video-play"
              aria-label="Play video"
              style={{ minHeight: '100%', minWidth: '100%' }}
            >
              {/* This button covers the whole video for easy clicking */}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}