"use client";

import ScrollIndicator from "@/components/ScrollIndicator";
import StickyImageSection from "@/components/StickyImageSection";
import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";

// Reusable fade-in wrapper for any section
function FadeInOnView({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            obs.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out will-change-[opacity,transform] ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Thin gradient blocks that match the homepage dividers
function SpacerTextToSection({ h = 84 }: { h?: number }) {
  return (
    <div
      className="w-full"
      style={{
        height: h,
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.95) 100%)",
      }}
      aria-hidden
    />
  );
}
function SpacerBeforeVideo({ h = 84 }: { h?: number }) {
  return (
    <div
      className="w-full"
      style={{
        height: h,
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgb(0,0,0) 100%)",
      }}
      aria-hidden
    />
  );
}

// Single horizontal video section
function FullscreenVideo({
  src,
  poster,
}: {
  src: string;
  poster?: string;
}) {
  return (
    <section
      className="relative flex items-center justify-center py-16"
      style={{
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.98) 0%, rgb(0,0,0) 100%)",
      }}
    >
      <div className="relative w-full max-w-6xl aspect-[16/9] overflow-hidden rounded-xl border border-white/10 shadow-lg">
        <video
          className="w-full h-full object-cover"
          playsInline
          controls
          preload="metadata"
          poster={poster}
          src={src}
          muted={false}
          onPlay={(e) => {
            if (e.currentTarget.muted) e.currentTarget.muted = false;
          }}
        />
      </div>
    </section>
  );
}

export default function VerseTwo() {
  // Keep only two images and one video
  const IMG_1 = "/verse2-1.png";
  const IMG_3 = "/guts.jpeg";
  const VID_2 =
    "https://4jonbnyt0iufuysl.public.blob.vercel-storage.com/0929.mp4";

  const totalSticky = 2;

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(to bottom,
          rgb(10,10,10) 0%,
          rgb(5,5,5) 40%,
          rgb(0,0,0) 100%)`,
      }}
    >
      <ScrollIndicator />

      {/* Sticky Image 1 */}
      <FadeInOnView>
        <StickyImageSection
          imageSrc={IMG_1}
          sectionIndex={0}
          totalSections={totalSticky}
        />
      </FadeInOnView>

      {/* Text section (same gradient as home text block) */}
      <FadeInOnView delay={80}>
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
              className="text-2xl sm:text-3xl md:text-5xl font-light tracking-wide text-white/80 leading-relaxed font-[Inter]"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}
            >
              <div className="sm:whitespace-nowrap">Second verse</div>
              <div>
                <em className="text-white/60">Same pulse, different angle.</em>
              </div>
            </div>
          </div>
        </div>
      </FadeInOnView>

      {/* Divider matching home: text (0.8→0.95) → next section */}
      <SpacerTextToSection />

      {/* Sticky Image 2 */}
      <FadeInOnView delay={120}>
        <StickyImageSection
          imageSrc={IMG_3}
          sectionIndex={1}
          totalSections={totalSticky}
        />
      </FadeInOnView>

      {/* Divider matching home: before video (0.95→1) */}
      <SpacerBeforeVideo />

      {/* Video */}
      <FadeInOnView delay={160}>
        <FullscreenVideo src={VID_2} />
      </FadeInOnView>

      {/* Back home */}
      <FadeInOnView delay={200}>
        <div className="w-full text-center py-10">
          <Link href="/">
            <button className="border border-white/30 text-white px-6 py-3 rounded-full text-sm tracking-wide hover:border-white hover:bg-white/10 transition-all duration-300">
              Back home →
            </button>
          </Link>
        </div>
      </FadeInOnView>

      <div className="h-32 bg-black" />
    </div>
  );
}
