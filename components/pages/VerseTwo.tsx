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
      className=
