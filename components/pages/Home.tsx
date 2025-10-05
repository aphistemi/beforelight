'use client';

import { useEffect, useState } from 'react';
import StickyImageSection from '@/components/StickyImageSection';
import { VideoSection } from '../VideoSection';
import ScrollIndicator from '@/components/ScrollIndicator';
import { Link } from 'wouter';

// (optional) These imports existed in your file; safe to keep or remove if unused elsewhere
import handsImage from '@assets/ChatGPT Image Sep 24, 2025, 05_29_45 PM_1758729617680.png';
import coatImage from '@assets/ChatGPT Image Sep 24, 2025, 06_48_49 PM_1758729617679.png';

export default function Home() {
  const [globalScrollProgress, setGlobalScrollProgress] = useState(0);

  // ✅ Make homepage videos: no autoplay, show controls, start with sound on user play
  useEffect(() => {
    const root = document.getElementById('home-video-wrapper');
    if (!root) return;

    const vids = Array.from(root.querySelectorAll<HTMLVideoElement>('video'));
    for (const v of vids) {
      try {
        // Stop any autoplaying behavior and show controls
        v.autoplay = false;
        v.pause();
        v.controls = true;

        // Start unmuted; if browser forces mute, unmute on play (user gesture)
        v.muted = false;
        const handlePlay = () => {
          if (v.muted) v.muted = false;
        };
        v.addEventListener('play', handlePlay);

        // Store cleanup ref on the element
        (v as any).__cleanupPlay = () => v.removeEventListener('play', handlePlay);
      } catch {
        // no-op
      }
    }

    return () => {
      for (const v of vids) {
        try {
          const cleanup = (v as any).__cleanupPlay as (() => void) | undefined;
          cleanup?.();
        } catch {
          // no-op
        }
      }
    };
  }, []);

  // (kept) your scroll smoothing / resistance
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrolled / maxScroll;
      setGlobalScrollProgress(progress);
    };

    // Add scroll resistance
    let scrollTimeout: NodeJS.Timeout;
    const handleScrollWithResistance = (e: WheelEvent) => {
      clearTimeout(scrollTimeout);

      const resistance = 0.7;
      const dampedDelta = e.deltaY * resistance;

      window.scrollBy({
        top: dampedDelta,
        behavior: 'auto',
      });

      e.preventDefault();

      scrollTimeout = setTimeout(() => {
        handleScroll();
      }, 16);
    };

    window.addEventListener('wheel', handleScrollWithResistance, { passive: false });
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.removeEventListener('wheel', handleScrollWithResistance);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(to bottom,
          rgb(10, 10, 10) 0%,
          rgb(5, 5, 5) 50%,
          rgb(0, 0, 0) 100%)`,
      }}
    >
      <ScrollIndicator />

      {/* Sticky Image 1 */}
      <StickyImageSection imageSrc={'/hands_image.png'} sectionIndex={0} totalSections={3} />

      {/* Sticky Image 2 */}
      <StickyImageSection imageSrc={'/back_image.png'} sectionIndex={1} totalSections={3} />

      {/* Text Section */}
      <div
        className="relative h-screen flex items-center justify-center"
        style={{
          background: `linear-gradient(to bottom,
            rgba(0,0,0,0.8) 0%,
            rgba(0,0,0,0.95) 100%)`,
        }}
      >
        <div className="text-center max-w-2xl px-4 sm:px-8">
          <div
            className="text-2xl sm:text-3xl md:text-5xl font-light tracking-wide text-white/90 leading-relaxed font-[Inter]"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
          >
            <div className="sm:whitespace-nowrap">We're swaying to drum beats</div>
            <div>
              <em className="text-white/70">In motion, I'm feeling..</em>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div
        id="home-video-wrapper" // ✅ hook point for video behavior
        className="relative"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgb(0,0,0) 100%)',
        }}
      >
        <VideoSection />

        {/* Link to Verse Two */}
        <div className="w-full text-center py-10">
          <Link href="/verse-two">
            <button className="border border-white/30 text-white px-6 py-3 rounded-full text-sm tracking-wide hover:border-white hover:bg-white/10 transition-all duration-300">
              Second verse →
            </button>
          </Link>
        </div>
      </div>

      {/* Final dark section */}
      <div className="h-32 bg-black" />
    </div>
  );
}
