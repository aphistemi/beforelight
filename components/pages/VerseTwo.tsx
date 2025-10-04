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
  vhPerSlide = 130, // bigger = longer dwell time per slide
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
            // Crossfade overlap around each slide
            const fadeInStart = i - 0.2;
            const fadeOutEnd = i + 0.85;
            const local = (progress - fadeInStart) / (fadeOutEnd - fadeInStart);
            let opacity = smooth(local);
            if (i === 0 && opacity < 0.6) opacity = 1;

            return (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-200"
                style={{ opacity }}
              >
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={item.alt ?? ""}
                    className="h-full w-full object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    onError={(e) => {
                      (e.currentTarget.parentElement as HTMLElement).style.background =
                        "linear-gradient(180deg,#111,#000)";
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <video
                    className="h-full w-full object-cover"
                    playsInline
                    autoPlay
                    muted
                    loop
                    preload="metadata"
                    src={item.src}
                    onError={(e) => {
                      (e.currentTarget.parentElement as HTMLElement).style.background =
                        "linear-gradient(180deg,#111,#000)";
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function VerseTwo() {
  // Confirmed sources (images at repo root /public; videos are blob URLs)
  const items: MediaItem[] = [
    { type: "image", src: "/verse2-1.png", alt: "Verse Two 1" },
    { type: "image", src: "/verse2-2.png", alt: "Verse Two 2" },
    { type: "video", src: "https://4jonbnyt0iufuysl.public.blob.vercel-storage.com/1005.mp4" },
    { type: "image", src: "/guts.jpeg", alt: "Guts" },
    { type: "video", src: "https://4jonbnyt0iufuysl.public.blob.vercel-storage.com/0929.mp4" },
  ];

  return (
    <main className="bg-black text-white overflow-x-hidden">
      <StickyImageStory items={items} vhPerSlide={130} />
      <ScrollIndicator />
    </main>
  );
}
