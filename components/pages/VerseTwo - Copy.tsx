"use client";

import ScrollIndicator from "@/components/ScrollIndicator";
import StickyImageSection from "@/components/StickyImageSection";
import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";

// ---------------- Fade-in wrapper ----------------
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

// --------------- Homepage-style spacers ---------------
/** Text -> next section style (0.8 -> 0.95), used BEFORE text. */
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

/** Before video (0.95 -> 1.0), used before video and also before the button. */
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

// ---------------- Video section ----------------
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

// ---------------- Page ----------------
export default function VerseTwo() {
  // Only two images and one video
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

      {/* Image 1 */}
      <FadeInOnView>
        <StickyImageSection
          imageSrc={IMG_1}
          sectionIndex={0}
          totalSections={totalSticky}
        />
      </FadeInOnView>

      {/* Divider BETWEEN image 1 -> text (smaller than before) */}
      <SpacerTextLead h={56} />

      {/* Text block (shorter than a full screen to tighten spacing) */}
      <FadeInOnView delay={80}>
        <div
          className="relative flex items-center justify-center"
          style={{
            minHeight: "70vh",
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

      {/* ⛔ No divider after the text per your request */}

      {/* Image 2 */}
      <FadeInOnView delay={120}>
        <StickyImageSection
          imageSrc={IMG_3}
          sectionIndex={1}
          totalSections={totalSticky}
        />
      </FadeInOnView>

      {/* Divider BETWEEN image 2 -> video */}
      <SpacerToSolid h={84} />

      {/* Video */}
      <FadeInOnView delay={160}>
        <FullscreenVideo src={VID_2} />
      </FadeInOnView>

      {/* Divider BETWEEN video -> button */}
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
