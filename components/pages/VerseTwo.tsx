"use client";

import { useEffect, useRef, useState } from "react";
import ScrollIndicator from "@/components/ScrollIndicator";

/**
 * Crossfading sticky image story.
 */
function StickyImageStory({
  items,
  vhPerSlide = 120,
}: {
  items: { type: "image" | "video"; src: string; alt?: string }[];
  vhPerSlide?: number;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrolled = Math.min(
        Math.max(viewportH - rect.top, 0),
        items.length * (vhPerSlide / 100) * viewportH
      );
      const perSlidePx = (vhPerSlide / 100) * viewportH;
      const p = scrolled / perSlidePx;
      setProgress(p);
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
            const fadeInStart = i - 0.2;
            const fadeOutEnd = i + 0.8;
            const local = (progress - fadeInStart) / (fadeOutEnd - fadeInStart);
            const opacity = smooth(local);

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
  const items = [
    { type: "image", src: "/media/verse2-1.png", alt: "Verse Two 1" },
    { type: "image", src: "/media/verse2-2.png", alt: "Verse Two 2" },
    {
      type: "video",
      src: "https://4jonbnyt0iufuysl.public.blob.vercel-storage.com/1005.mp4",
    },
    { type: "image", src: "/media/guts.jpeg", alt: "Guts" },
    {
      type: "video",
      src: "https://4jonbnyt0iufuysl.public.blob.vercel-storage.com/0929.mp4",
    },
  ];

  return (
    <main className="bg-black text-white overflow-x-hidden">
      <StickyImageStory items={items} vhPerSlide={120} />
      <ScrollIndicator />
    </main>
  );
}
