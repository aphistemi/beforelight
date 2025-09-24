import { useEffect, useRef, useState } from 'react';

interface ImageBlockProps {
  imageSrc: string;
  caption?: string;
  position?: 'left' | 'center' | 'right';
  size?: 'small' | 'medium' | 'large';
}

export default function ImageBlock({ 
  imageSrc, 
  caption, 
  position = 'center', 
  size = 'medium' 
}: ImageBlockProps) {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const sizeClasses = {
    small: 'max-w-md h-96',
    medium: 'max-w-2xl h-[60vh]',
    large: 'max-w-5xl h-[80vh]'
  };

  const positionClasses = {
    left: 'ml-0 mr-auto',
    center: 'mx-auto',
    right: 'ml-auto mr-0'
  };

  return (
    <div className="py-24 px-8">
      <div 
        ref={imageRef}
        className={`relative ${sizeClasses[size]} ${positionClasses[position]} transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
        data-testid={`image-block-${position}`}
      >
        <img
          src={imageSrc}
          alt={caption || ''}
          className="w-full h-full object-cover filter grayscale contrast-110"
        />
        {caption && (
          <div 
            className={`absolute -bottom-16 left-0 transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <p 
              className="text-sm font-light tracking-[0.2em] text-muted-foreground font-[Inter] italic"
              data-testid="text-image-caption"
            >
              {caption}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}