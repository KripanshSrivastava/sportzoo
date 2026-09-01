/**
 * Media helpers — a single URL can be an uploaded image, a YouTube / Vimeo
 * link, or a direct video file. Used by every place that shows a photo or
 * video gallery (page builder, service pages, case studies, events, cities,
 * gallery).
 */

export type MediaKind = "image" | "youtube" | "vimeo" | "video";

export interface Media {
  kind: MediaKind;
  /** Original URL. */
  url: string;
  /** For youtube/vimeo — the player embed URL. */
  embedUrl?: string;
}

function youtubeId(s: string): string | null {
  const patterns = [
    /[?&]v=([A-Za-z0-9_-]{11})/,
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/(?:embed|shorts|live)\/([A-Za-z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = s.match(p);
    if (m) return m[1];
  }
  return null;
}

function vimeoId(s: string): string | null {
  const m = s.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}

export function classifyMedia(rawUrl: string): Media {
  const url = (rawUrl || "").trim();

  const yt = youtubeId(url);
  if (yt) return { kind: "youtube", url, embedUrl: `https://www.youtube-nocookie.com/embed/${yt}` };

  const vm = vimeoId(url);
  if (vm) return { kind: "vimeo", url, embedUrl: `https://player.vimeo.com/video/${vm}` };

  if (/\.(mp4|webm|mov|m4v)(\?|$)/i.test(url)) return { kind: "video", url };

  return { kind: "image", url };
}

export function isVideoUrl(url: string): boolean {
  return classifyMedia(url).kind !== "image";
}
