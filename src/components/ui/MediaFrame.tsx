import Image from "next/image";
import { classifyMedia } from "@/lib/media";

/**
 * Renders one media URL as the right element: an uploaded photo, a YouTube /
 * Vimeo player, or a direct video file. Wrap in a container that sets the
 * aspect ratio (the frame fills it).
 */
export function MediaFrame({
  url,
  alt = "",
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
  className = "",
}: {
  url: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const media = classifyMedia(url);

  if (media.kind === "youtube" || media.kind === "vimeo") {
    return (
      <iframe
        src={media.embedUrl}
        title={alt || "Video"}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        className={`absolute inset-0 h-full w-full border-0 ${className}`}
      />
    );
  }

  if (media.kind === "video") {
    return (
      <video
        src={url}
        controls
        playsInline
        preload="metadata"
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
      />
    );
  }

  // Optimize images we host (Supabase Storage); leave arbitrary pasted URLs untouched.
  const canOptimize = /^https:\/\/[^/]+\.supabase\.co\/storage\/v1\/object\/public\//.test(url);

  return (
    <Image
      src={url}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={!canOptimize}
      className={`object-cover ${className}`}
    />
  );
}
