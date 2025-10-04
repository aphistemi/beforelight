"use client";

import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface VideoSectionProps {
  title?: string;
  description?: string;
}

export function VideoSection({
  title,
  description,
}: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Optional: detect iOS if you need special handling
  const [isIOS, setIsIOS] = useState(false);
  useEffect(() => {
    setIsIOS(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent));
  }, []);

  const handlePlayClick = async () => {
    const vid = videoRef.current;
    if (!vid) return;

    try {
      if (isPlaying) {
        vid.pause();
        setIsPlaying(false);
      } else {
        const playPromise = vid.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
      }
    } catch (err: any) {
      console.error("Video play error:", err);
      // iOS fallback: enable native controls if autoplay fails
      if (isIOS) vid.controls = true;
    }
  };

  const handleMuteClick = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      className="min-h-screen py-24 px-8 flex items-center justify-center"
      data-testid="section-video"
    >
      <div className="max-w-6xl w-full text-center">
        {title && (
          <h2
            className="text-4xl md:text-6xl font-light mb-6"
            data-testid="text-video-title"
          >
            {title}
          </h2>
        )}
        {description && (
          <p
            className="text-lg text-muted-foreground mb-8"
            data-testid="text-video-description"
          >
            {description}
          </p>
        )}

        <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            loop
            muted={isMuted}
            playsInline
            poster="/video-thumbnail.png"
            preload="metadata"
            onClick={handlePlayClick}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={(e) => console.error("Video error:", e)}
          >
            <source src={"https://4jonbnyt0iufuysl.public.blob.vercel-storage.com/0929.mp4"} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Mute/unmute button */}
          {isPlaying && (
            <button
              onClick={handleMuteClick}
              className="absolute top-4 right-4 w-12 h-12 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center"
              data-testid="button-video-sound"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white/80" />
              ) : (
                <Volume2 className="w-5 h-5 text-white/80" />
              )}
            </button>
          )}

          {/* Optional: overlay play button if not playing */}
          {!isPlaying && (
            <button
              onClick={handlePlayClick}
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition"
              data-testid="button-video-play"
              aria-label="Play video"
            >
              <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}