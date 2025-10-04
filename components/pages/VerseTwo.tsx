function FullscreenVideo({
  src,
  poster,
  vertical = false,
}: {
  src: string;
  poster?: string;
  vertical?: boolean;
}) {
  // vertical=true means the video is portrait
  return (
    <section
      className="relative flex items-center justify-center py-16"
      style={{
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgb(0,0,0) 100%)",
      }}
    >
      <div
        className={`relative w-full max-w-6xl overflow-hidden rounded-xl border border-white/10 shadow-xl ${
          vertical ? "max-w-[400px]" : "aspect-[16/9]"
        }`}
      >
        <video
          className={`w-full h-auto ${
            vertical ? "object-contain" : "object-cover"
          }`}
          playsInline
          muted
          loop
          controls
          preload="metadata"
          poster={poster}
          src={src}
        />
      </div>
    </section>
  );
}
