"use client";

import { useEffect, useRef, useState } from "react";
import ScrollIndicator from "@/components/ScrollIndicator";
import StickyImageSection from "@/components/StickyImageSection";
import { Link } from "wouter";

/* ---------------------- Fade-in wrapper ---------------------- */
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

/* ---------------------- Spacers (matching homepage) ---------------------- */
function SpacerTextLead({ h = 56 }: { h?: number }) {
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
function SpacerToSolid({ h = 84 }: { h?: number }) {
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

/* ---------------------- Clean collapsing header ----------------------
   - Full-bleed, sticky 100vh.
   - No overlays / tints (video colors unchanged).
   - Opacity fades with scroll; optional soft mask to help it vanish.
   - Delimiting lines at bottom to frame the header area.
----------------------------------------------------------------------- */
function CollapsingHeader({
  videoSrc,
  headline,
}: {
  videoSrc: string;
  headline: string;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [t, setT] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Scroll window for fade: 0..1 across ~0.9 * viewport height
      const scrolled = Math.min(Math.max(vh - rect.top, 0), vh * 0.9);
      setT(scrolled / (vh * 0.9));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const opacity = 1 - t; // 1 → 0

  return (
    <section ref={wrapRef} style={{ height: "160vh" }} className="relative">
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden bg-black">
        {/* Video (raw color) */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          autoPlay
          muted
          loop
          controls={false}
          preload="metadata"
          src={videoSrc}
          style={{
            opacity,
            transition: "opacity 120ms linear",
            // optional soft top fade (alpha-only; no color change)
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 100%)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,1) 18%, rgba(0,0,0,1) 100%)",
          } as React.CSSProperties}
        />

        {/* Headline on top of the video */}
        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <h1
            className="max-w-5xl text-white"
            style={{
              opacity,
              transition: "opacity 120ms linear",
              textShadow: "0 2px 18px rgba(0,0,0,0.6)",
              fontWeight: 300,
              lineHeight: 1.25,
              letterSpacing: "0.01em",
              fontSize: "clamp(28px, 4vw, 44px)",
            }}
          >
            In the dark, the deer mistook my headlights for stars.
          </h1>
        </div>

        {/* Bottom delimiter lines to frame the header (no color change to video) */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10 pointer-events-none" />
        <div className="absolute inset-x-0 -bottom-2 h-px bg-white/5 pointer-events-none" />
      </div>
    </section>
  );
}

/* ---------------------- Closing video section ---------------------- */
function FullscreenVideo({ src, poster }: { src: string; poster?: string }) {
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
  const HEADER_VIDEO =
    "https://4jonbnyt0iufuysl.public.blob.vercel-storage.com/videoloopbw.webm";
  const IMG_1 = "/verse2-1.png";
  const IMG_3 = "/guts.jpeg";
  const END_VIDEO =
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

      {/* HEADER — raw video colors, fading away on scroll, text on top */}
      <CollapsingHeader videoSrc={HEADER_VIDEO} headline="" />

      {/* Divider after header to separate clearly */}
      <div className="w-full h-6 bg-gradient-to-b from-black/0 to-black" aria-hidden />

      {/* Image 1 */}
      <FadeInOnView>
        <StickyImageSection
          imageSrc={IMG_1}
          sectionIndex={0}
          totalSections={totalSticky}
        />
      </FadeInOnView>

      {/* Smaller spacer into the text (matches homepage feel) */}
      <SpacerTextLead h={56} />

      {/* Text block (tight) */}
      <FadeInOnView delay={80}>
        <div
          className="relative flex items-center justify-center"
          style={{
            minHeight: "60vh",
            background: `linear-gradient(to bottom,
              rgba(0,0,0,0.8) 0%,
              rgba(0,0,0,0.95) 100%)`,
          }}
        >
          <div className="text-center max-w-2xl px-4 sm:px-8">
            <div
              className="text-2xl sm:text-3xl md:text-5xl font-light tracking-wide text-white/85 leading-relaxed font-[Inter]"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}
            >
              <div className="sm:whitespace-nowrap">And their echoes sit alone</div>
              <div>
                <em className="text-white/70">In a prison made of bone</em>
              </div>
            </div>
          </div>
        </div>
      </FadeInOnView>

      {/* No divider immediately after text */}

      {/* Image 2 */}
      <FadeInOnView delay={120}>
        <StickyImageSection
          imageSrc={IMG_3}
          sectionIndex={1}
          totalSections={totalSticky}
        />
      </FadeInOnView>

      {/* Divider before closing video */}
      <SpacerToSolid h={84} />

      {/* Closing video */}
      <FadeInOnView delay={160}>
        <FullscreenVideo src={END_VIDEO} />
      </FadeInOnView>

      {/* Divider before button */}
      <SpacerToSolid h={72} />

      {/* Back home button */}
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
