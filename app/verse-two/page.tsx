// app/verse-two/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Before Light — Verse Two",
  description: "A sibling page to the front experience: a few pictures and a video at the end.",
  openGraph: {
    title: "Before Light — Verse Two",
    description: "A sibling page to the front experience: a few pictures and a video at the end.",
    url: "https://beforelight.cc/verse-two",
    siteName: "Before Light",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Before Light — Verse Two",
    description: "A sibling page to the front experience: a few pictures and a video at the end.",
  },
};

type MediaItem =
  | { type: "image"; src: string; alt?: string; aspect?: "landscape" | "portrait" | "square" }
  | { type: "video"; src: string; poster?: string };

const media: MediaItem[] = [
  // 1) Image
  { type: "image", src: "/media/verse2-1.png", alt: "Frame 1", aspect: "landscape" },

  // 2) Video
  { type: "video", src: "/media/verse2-clip-1.mov", poster: "/media/verse2-clip-1-poster.jpg" },

  // 3) Image
  { type: "image", src: "/media/verse2-2.png", alt: "Frame 2", aspect: "portrait" },

  // 4) Image
  { type: "image", src: "/media/55124M.png", alt: "Frame 3", aspect: "landscape" },

  // 5) Video
  { type: "video", src: "/media/0929.mp4", poster: "/media/verse2-clip-2-poster.jpg" },
];

function aspectClass(a?: "landscape" | "portrait" | "square") {
  if (a === "portrait") return "aspect-[3/4]";
  if (a === "square") return "aspect-square";
  return "aspect-[16/9]"; // default landscape
}

export default function VerseTwoPage() {
  return (
    <main className="relative min-h-[100svh] bg-black text-white">
      {/* Tiny corner nav to preserve the minimalist feel */}
      <div className="pointer-events-auto fixed left-4 top-4 z-50">
        <Link
          href="/"
          className="rounded-full border border-white/20 px-3 py-1.5 text-xs tracking-wide text-white/80 hover:border-white/40 hover:text-white"
        >
          ← Home
        </Link>
      </div>

      {/* Stack of media blocks */}
      <section className="mx-auto flex w-full max-w-[120rem] flex-col">
        {media.map((m, i) => {
          if (m.type === "image") {
            return (
              <figure
                key={`img-${i}`}
                className={`w-full ${aspectClass(m.aspect)} relative isolate`}
              >
                <Image
                  src={m.src}
                  alt={m.alt ?? ""}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </figure>
            );
          }

          // video block (always last in your flow)
          return (
            <figure key={`vid-${i}`} className="relative w-full">
              <div className="relative mx-auto w-full max-w-7xl px-0 md:px-4">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <video
                    className="h-full w-full object-cover"
                    playsInline
                    controls
                    preload="metadata"
                    poster={m.poster}
                  >
                    <source src={m.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </figure>
          );
        })}
      </section>

      {/* Minimal footer spacer */}
      <div className="h-20" />
    </main>
  );
}
