'use client';

import { useEffect, useState } from 'react';
import StickyImageSection from '@/components/StickyImageSection';
import { VideoSection } from '../VideoSection';
import ScrollIndicator from '@/components/ScrollIndicator';
import { Link } from 'wouter';

// (kept) Imports you had — fine to leave even if unused elsewhere
import handsImage from '@assets/ChatGPT Image Sep 24, 2025, 05_29_45 PM_1758729617680.png';
import coatImage from '@assets/ChatGPT Image Sep 24, 2025, 06_48_49 PM_1758729617679.png';

export default function Home() {
  const [globalScrollProgress, setGlobalScrollProgress] = useState(0);

  // ✅ Make homepage videos: no autoplay, show controls, sound ON at Play
  useEffect(() => {
    const root = document.getElementById('home-video-wrapper');
    if (!root) return;

    const vids = Array.from(root.querySelectorAll<HTMLVideoElement>('video'));
    for (const v of vids) {
      try {
        // stop any autoplaying behavior
        v.autoplay = false;
        v.pause();

        // show controls & allow sound
        v.controls = true;
        v.muted = false;

        // if the browser force-muted it, unmute on user interaction
        const handlePlay = () => {
          if (v.muted) v.muted = false;
        };
        v.addEventListener('play', handlePlay);

        // cleanup
        const cleanup = () => v.removeEventListener('play', handlePlay);
        // store cleanup on element so we can call later if needed
        (v as any).__cleanupPlay = cleanup;
      } catch {}
    }

    return () => {
      for (const v of vids) {
        try {
          const cleanup = (v as any).__cleanupPlay as (() => void) | undefined;
          cleanup?.();
        } catch {}
      }
    };
  }, []);

  // (kept) your scroll smoothing/resistance
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrolled / maxScroll;
      setGlobalScrollProgress(progress);
    };

    let scrollTimeout: NodeJS.Timeout;
    const handleScrollWithResistance = (e: WheelEvent) => {
      clearTimeout(scrollTimeout);
      const resistance = 0.7;
      const dampedDelta = e.deltaY * resistance;
      window.scrollBy({ top: dampedDelta, behavior: 'auto' });
      e.preventDefault();
      scrollTimeout = setTimeout(() => handleScroll(), 16);
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
