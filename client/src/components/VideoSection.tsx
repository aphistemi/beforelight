import { useState } from "react";
import ReactPlayer from "react-player";
import { Volume2, VolumeX } from "lucide-react";

interface VideoSectionProps {
  title?: string;
  description?: string;
}

export default function VideoSection({
  title,
  description,
}: VideoSectionProps) {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section
      className="min-h-screen py-24 px-8 flex items-center justify-center"
      data-testid="section-video"
    >
      <div className="max-w-6xl w-full">
        {title && (
          <div className="text-center mb-12">
            <h2
              className="text-4xl md:text-6xl font-light tracking-widest text-foreground mb-6 font-[Inter]"
              data-testid="text-video-title"
            >
              {title}
            </h2>
            {description && (
              <p
                className="text-lg text-muted-foreground font-light tracking-wide font-[Inter] max-w-2xl mx-auto"
                data-testid="text-video-description"
              >
                {description}
              </p>
            )}
          </div>
        )}

        <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
          <ReactPlayer
            url={["assets/afterdark1.mp4", "assets/afterdark1.webm"]}
            playing
            loop
            muted={isMuted}
            playsinline
            controls={true}
            width="100%"
            height="100%"
            config={{
              file: { attributes: { poster: "/video-thumbnail.png" } },
            }}
          />

          {/* Mute/unmute button */}
          <button
            onClick={() => setIsMuted((prev) => !prev)}
            className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300"
            data-testid="button-video-sound"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white/80" />
            ) : (
              <Volume2 className="w-5 h-5 text-white/80" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
