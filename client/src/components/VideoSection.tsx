import { useEffect, useRef, useState } from 'react';

interface VideoSectionProps {
  title?: string;
  description?: string;
}

export default function VideoSection({ title, description }: VideoSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
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
        
        <div 
          className={`relative aspect-video bg-black rounded-sm overflow-hidden transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {/* Video placeholder with abstract pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-background flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 border border-muted-foreground/30 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-8 border-l-foreground border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1" />
              </div>
              <p className="text-muted-foreground text-sm tracking-widest">VIDEO PIECE</p>
            </div>
          </div>
          
          {/* Mock video overlay */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover opacity-0"
            poster=""
          />
          
          {/* Play button overlay */}
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 group hover-elevate transition-all duration-300"
            data-testid="button-video-play"
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            {!isPlaying && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 border-2 border-white/80 rounded-full flex items-center justify-center group-hover:border-white group-hover:scale-110 transition-all duration-300">
                  <div className="w-0 h-0 border-l-6 border-l-white/80 border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1 group-hover:border-l-white" />
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}