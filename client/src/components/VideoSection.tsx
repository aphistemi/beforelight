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
          {/* Actual video */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            autoPlay
            poster=""
          >
            <source src="/afterdark1.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          
          {/* Play/pause overlay */}
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 group hover-elevate transition-all duration-300 bg-black/0 hover:bg-black/10"
            data-testid="button-video-play"
          >
            {!isPlaying && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-20 h-20 border-2 border-white/60 rounded-full flex items-center justify-center group-hover:border-white/90 group-hover:scale-110 transition-all duration-300 backdrop-blur-sm bg-black/20">
                  <div className="w-0 h-0 border-l-8 border-l-white/80 border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1 group-hover:border-l-white" />
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}