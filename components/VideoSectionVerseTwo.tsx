"use client";

export default function VideoSectionVerseTwo() {
  return (
    <section className="relative w-full bg-black">
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <video
            className="h-full w-full object-cover"
            playsInline
            controls
            preload="metadata"
            poster="/media/verse2-poster.jpg"   // optional
          >
            <source src="/media/verse2.mp4" type="video/mp4" />
            {/* Optional fallback */}
            <source src="/media/verse2.mov" type="video/quicktime" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
