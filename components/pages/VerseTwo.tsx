"use client";

type MediaItem =
  | { kind: "image"; src: string; alt?: string }
  | { kind: "video"; src: string };

function MediaBlock({ item, i }: { item: MediaItem; i: number }) {
  return (
    <section className="w-full bg-black text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-8">
        <p className="mb-3 text-xs text-white/60">#{i + 1} • {item.kind.toUpperCase()}</p>
        <div className="relative w-full overflow-hidden rounded-lg border border-white/10">
          {item.kind === "image" ? (
            <img src={item.src} alt={("alt" in item && item.alt) || ""} className="w-full h-auto object-contain bg-black" />
          ) : (
            <video
              className="w-full h-auto bg-black"
              playsInline
              autoPlay
              muted
              loop
              controls
              preload="metadata"
              src={item.src}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default function VerseTwo() {
  // Images live at repo root /public; videos are blob URLs
  const items: MediaItem[] = [
    { kind: "image", src: "/verse2-1.png", alt: "Verse Two 1" },
    { kind: "image", src: "/verse2-2.png", alt: "Verse Two 2" },
    { kind: "video", src: "https://4jonbnyt0iufuysl.public.blob.vercel-storage.com/1005.mp4" },
    { kind: "image", src: "/guts.jpeg", alt: "Guts" },
    { kind: "video", src: "https://4jonbnyt0iufuysl.public.blob.vercel-storage.com/0929.mp4" },
  ];

  return (
    <main className="min-h-screen w-full bg-black text-white">
      <div className="px-4 py-6 text-sm text-white/70">Second verse →</div>
      {items.map((item, i) => (
        <MediaBlock key={i} item={item} i={i} />
      ))}
      <div className="h-16" />
    </main>
  );
}
