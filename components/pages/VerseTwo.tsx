"use client";

import ScrollIndicator from "@/components/ScrollIndicator";
import StickyImageSection from "@/components/StickyImageSection";
import { Link } from "wouter";

// Fullscreen video section — same vibe as homepage video area
function FullscreenVideo({ src, poster }: { src: string; poster?: string }) {
  return (
    <section
      className="relative"
      style={{
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgb(0,0,0) 100%)",
      }}
    >
      <div className="relative aspect-[16/9] w-full">
        <video
          className="h-full w-full object-cover"
          playsInline
          autoPlay
          muted
          loop
          controls={false}
          preload="metadata"
          poster={poster}
          src={src}
        />
      </div>
    </section>
  );
}

export default function VerseTwo() {
  // Your confirmed sources
  const IMG_1 = "/verse2-1.png";
  const IMG_2 = "/verse2-2.png";
  const IMG_3 = "/guts.jpeg";
  const VID_1 =
    "https://4jonbnyt0iufuysl.public.blob.vercel-storage.com/1005.mp4";
  const VID_2 =
    "https://4jonbnyt0iufuysl.public.blob.vercel-storage.com/0929.mp4";

  const totalSticky = 3;

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
      <StickyImageSection
        imageSrc={IMG_1}
        sectionIndex={0}
        totalSections={totalSticky}
      />

      {/* Sticky Image 2 */}
      <StickyImageSection
        imageSrc={IMG_2}
        sectionIndex={1}
        totalSections={totalSticky}
      />

      {/* Text break (optional) */}
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
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
          >
            <div className="sm:whitespace-nowrap">Second verse</div>
            <div>
              <em className="text-white/70">Same pulse, different angle.</em>
            </div>
          </div>
        </div>
      </div>

      {/* Video 1 */}
      <FullscreenVideo src={VID_1} />

      {/* Sticky Image 3 */}
      <StickyImageSection
        imageSrc={IMG_3}
        sectionIndex={2}
        totalSections={totalSticky}
      />

      {/* Video 2 */}
      <FullscreenVideo src={VID_2} />

      {/* Back home button */}
      <div className="w-full text-center py-10">
        <Link href="/">
          <button className="border border-white/30 text-white px-6 py-3 rounded-full text-sm tracking-wide hover:border-white hover:bg-white/10 transition-all duration-300">
            Back home →
          </button>
        </Link>
      </div>

      {/* Footer spacer */}
      <div className="h-32 bg-black" />
    </div>
  );
}
