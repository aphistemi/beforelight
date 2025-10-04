"use client";

import ScrollIndicator from "@/components/ScrollIndicator";
import StickyImageSection from "@/components/StickyImageSection";
import { Link } from "wouter";

// Fullscreen video section — same style as homepage
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
  // ✅ Your confirmed images and videos (all from /public or blob URLs)
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
      className
