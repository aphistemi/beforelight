"use client";

import { useEffect, useRef, useState } from "react";
import ScrollIndicator from "@/components/ScrollIndicator";

type MediaItem =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string };

/**
 * Sticky crossfading image/video story.
 */
function StickyImageStory({
  items,
  vhPerSlide = 130, // tweak dwell time here (bigger = slower)
}: {
  items: MediaItem[];
  vhPerSlide?: number;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const max = items.length * (vhPerSlide / 100) * vh;
      const scrolled = Math.min(Math.max(vh - rect.top, 0), max);
      const perSlidePx = (vhPerSlide / 100) * vh;
      setProgress(scrolled / perSlidePx);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items.length, vhPerSlide]);

  const smooth = (x: number) => {
    const t = Math.max(0, Math.min(1, x));
    return t * t * (3 - 2 * t);
  };

  return (
    <section
      ref={wrapRef}
      className="relative"
      style={{ height: `${items.length * vhPerSlide}vh` }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-black">
        <div className="relative h-full w-full">
          {items.map((item, i) => {
            // Overlap fades so frames crossfade smoothly
            const fadeInStart = i - 0.2;
            const fadeOutEnd = i + 0.85;
            const local = (progress - fadeInStart) / (fadeOutEnd - fadeInStart);
            let opacity = smooth(local);
            // Ensure first slide is visible immediately
            if (i === 0 && opacity < 0.6) opacity = 1;

            return (
              <div
