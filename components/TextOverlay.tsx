import { useEffect, useRef, useState } from 'react';

interface TextOverlayProps {
  children: React.ReactNode;
  position?: 'left' | 'center' | 'right';
  size?: 'small' | 'medium' | 'large';
}

export default function TextOverlay({ 
  children, 
  position = 'center',
  size = 'medium'
}: TextOverlayProps) {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.4 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const sizeClasses = {
    small: 'text-lg md:text-xl max-w-md',
    medium: 'text-2xl md:text-4xl max-w-2xl',
    large: 'text-4xl md:text-6xl max-w-4xl'
  };

  const positionClasses = {
    left: 'text-left ml-0 mr-auto',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto mr-0'
  };

  return (
    <div className="py-32 px-8">
      <div 
        ref={textRef}
        className={`${sizeClasses[size]} ${positionClasses[position]} transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
        data-testid={`text-overlay-${position}`}
      >
        <div className="font-light tracking-[0.1em] text-foreground font-[Inter] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}