/**
 * Recommended image dimensions / formats for each place an image is used on
 * the site. Surfaced in the admin panel next to every upload field so the
 * person editing knows exactly what to provide, and used to set the file
 * picker's `accept` filter.
 */

export interface ImageSpec {
  /** Human label shown in the admin. */
  label: string;
  /** Recommended pixel size. */
  width: number;
  height: number;
  /** Human aspect ratio, e.g. "16:9". */
  ratio: string;
  /** Allowed file extensions (lower-case, no dot). */
  formats: string[];
  /** `accept` attribute for the <input type="file">. */
  accept: string;
  /** Soft max file size in KB (shown as guidance; server hard limit is 8 MB). */
  maxKB: number;
  /** One-line practical tip. */
  note: string;
}

export const IMAGE_SPECS = {
  logo: {
    label: "Company logo",
    width: 400,
    height: 160,
    ratio: "≈ 5:2 wide",
    formats: ["png", "jpg", "webp"],
    accept: "image/png,image/jpeg,image/webp",
    maxKB: 300,
    note: "Transparent PNG works best. Trim empty space and keep the logo centred.",
  },
  heroBanner: {
    label: "Hero / banner photo",
    width: 1920,
    height: 1080,
    ratio: "16:9 landscape",
    formats: ["jpg", "webp"],
    accept: "image/jpeg,image/webp",
    maxKB: 600,
    note: "Wide landscape photo. Keep the main subject slightly left of centre — text sits on the left.",
  },
  pageImage: {
    label: "Section image",
    width: 1600,
    height: 900,
    ratio: "16:9 landscape",
    formats: ["jpg", "webp"],
    accept: "image/jpeg,image/webp",
    maxKB: 500,
    note: "Landscape photo used inside a page section.",
  },
  serviceHero: {
    label: "Service page header image",
    width: 1600,
    height: 900,
    ratio: "16:9 landscape",
    formats: ["jpg", "webp"],
    accept: "image/jpeg,image/webp",
    maxKB: 500,
    note: "Landscape photo for the top of a service page.",
  },
  caseCover: {
    label: "Case study cover",
    width: 1200,
    height: 750,
    ratio: "16:10 landscape",
    formats: ["jpg", "webp"],
    accept: "image/jpeg,image/webp",
    maxKB: 400,
    note: "Landscape photo shown as the card and page header for a case study.",
  },
  eventCover: {
    label: "Event cover",
    width: 1200,
    height: 750,
    ratio: "16:10 landscape",
    formats: ["jpg", "webp"],
    accept: "image/jpeg,image/webp",
    maxKB: 400,
    note: "Landscape photo shown as the event card and page header.",
  },
  serviceGallery: {
    label: "Service project photo",
    width: 1000,
    height: 1000,
    ratio: "1:1 square",
    formats: ["jpg", "webp"],
    accept: "image/jpeg,image/webp",
    maxKB: 450,
    note: "Square photo of real project work. Or paste a YouTube / Vimeo / MP4 link for a video.",
  },
  galleryMedia: {
    label: "Photo or video",
    width: 1280,
    height: 720,
    ratio: "16:9 landscape",
    formats: ["jpg", "webp"],
    accept: "image/jpeg,image/webp",
    maxKB: 500,
    note: "Upload a landscape photo, or paste a YouTube / Vimeo / MP4 link for a video.",
  },
  galleryPhoto: {
    label: "Gallery photo",
    width: 1200,
    height: 1200,
    ratio: "1:1 square",
    formats: ["jpg", "webp"],
    accept: "image/jpeg,image/webp",
    maxKB: 500,
    note: "Square crop. Anything not square is centre-cropped to a square on the site.",
  },
} satisfies Record<string, ImageSpec>;

export type ImageSpecKey = keyof typeof IMAGE_SPECS;

/** One-line summary for the admin, e.g. "JPG or WEBP · 1920×1080 (16:9) · under 600 KB". */
export function specSummary(spec: ImageSpec): string {
  return `${spec.formats.map((f) => f.toUpperCase()).join(" or ")} · ${spec.width}×${spec.height} (${spec.ratio}) · under ${spec.maxKB} KB`;
}
