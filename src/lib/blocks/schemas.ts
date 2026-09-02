import type { BlockType } from "./types";
import type { ImageSpecKey } from "@/lib/imageSpecs";

export type FieldType = "text" | "textarea" | "lines" | "pairs" | "triples" | "image" | "images";

/** One entry in an "images" field: an uploaded image plus an optional label/caption. */
export interface ImageItem {
  url: string;
  caption?: string;
}

export interface FieldSchema {
  key: string;
  label: string;
  type: FieldType;
  parts?: string[];
  hint?: string;
  /** For "images" fields: what the per-row text box means (e.g. "Company name", "Caption"). */
  captionLabel?: string;
  /** For "image" / "images" fields: which IMAGE_SPECS preset applies (size + format guidance). */
  spec?: ImageSpecKey;
  /** For "image" / "images" fields: also accept a pasted YouTube / Vimeo / MP4 link. */
  allowVideo?: boolean;
}

export interface BlockDef {
  label: string;
  description: string;
  fields: FieldSchema[];
  defaultProps: Record<string, unknown>;
}

export const BLOCK_DEFS: Record<BlockType, BlockDef> = {
  hero: {
    label: "Hero banner",
    description: "Full-width intro banner with a heading, description, and photo.",
    fields: [
      { key: "eyebrow", label: "Eyebrow tag", type: "text" },
      { key: "title", label: "Heading", type: "textarea" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "imageUrl", label: "Photo (optional — dark banner if left blank)", type: "image", spec: "heroBanner" },
    ],
    defaultProps: { eyebrow: "", title: "", description: "", imageUrl: "" },
  },
  richText: {
    label: "Text section",
    description: "A heading with one or more paragraphs.",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "body", label: "Paragraphs", type: "lines", hint: "One per line" },
    ],
    defaultProps: { eyebrow: "", title: "", body: [] },
  },
  cardsGrid: {
    label: "Feature cards",
    description: "A grid of title + description cards (e.g. reasons, values).",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "items", label: "Cards", type: "pairs", parts: ["title", "desc"], hint: "One per line, format: Title :: Description" },
    ],
    defaultProps: { eyebrow: "", title: "", description: "", items: [] },
  },
  numberedSteps: {
    label: "Numbered steps",
    description: "A numbered process/how-it-works list.",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "items", label: "Steps", type: "pairs", parts: ["title", "desc"], hint: "One per line, format: Title :: Description" },
    ],
    defaultProps: { eyebrow: "", title: "", description: "", items: [] },
  },
  testimonials: {
    label: "Testimonials",
    description: "A grid of client quotes.",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "items", label: "Testimonials", type: "triples", parts: ["quote", "name", "role"], hint: "One per line, format: Quote :: Name :: Role" },
    ],
    defaultProps: { eyebrow: "", title: "", items: [] },
  },
  googleReviews: {
    label: "Google reviews",
    description: "A Google-style rating summary next to review cards. Edit the rating and quotes in Admin → Google Reviews.",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
    ],
    defaultProps: { eyebrow: "", title: "What clients say on Google" },
  },
  image: {
    label: "Image or video",
    description: "A single photo or video with an optional heading and caption.",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Heading (optional)", type: "text" },
      { key: "imageUrl", label: "Photo or video", type: "image", spec: "pageImage", allowVideo: true },
      { key: "caption", label: "Caption (optional)", type: "text" },
    ],
    defaultProps: { eyebrow: "", title: "", imageUrl: "", caption: "" },
  },
  mediaGallery: {
    label: "Photo & video gallery",
    description: "A grid of photos and videos.",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Heading", type: "text" },
      { key: "items", label: "Photos & videos", type: "images", spec: "galleryMedia", allowVideo: true, captionLabel: "Caption" },
    ],
    defaultProps: { eyebrow: "", title: "", items: [] },
  },
  clientLogos: {
    label: "Client logos",
    description: "The \"Companies that trust our work\" logo banner. Add / edit the logos in Admin → Client Logos.",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Heading", type: "text" },
    ],
    defaultProps: { eyebrow: "", title: "Companies that trust our work" },
  },
  socialFeed: {
    label: "Instagram & YouTube feed",
    description: "Embeds specific Instagram posts and YouTube videos. No API key needed — just paste the links.",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "instagramUrls", label: "Instagram post links", type: "lines", hint: "One per line, e.g. https://www.instagram.com/p/ABC123/" },
      { key: "youtubeUrls", label: "YouTube video links", type: "lines", hint: "One per line, e.g. https://www.youtube.com/watch?v=ABC123" },
    ],
    defaultProps: { eyebrow: "Follow along", title: "From our socials", description: "", instagramUrls: [], youtubeUrls: [] },
  },
  statsBand: {
    label: "Stats band",
    description: "A row of highlighted numbers/labels.",
    fields: [{ key: "items", label: "Stats", type: "pairs", parts: ["value", "label"], hint: "One per line, format: Value :: Label" }],
    defaultProps: { items: [] },
  },
  tagGrid: {
    label: "Tag grid",
    description: "A grid of plain text tags (e.g. industries served).",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "items", label: "Tags", type: "lines", hint: "One per line" },
    ],
    defaultProps: { eyebrow: "", title: "", items: [] },
  },
  faq: {
    label: "FAQs",
    description: "A frequently-asked-questions accordion.",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "items", label: "Questions", type: "pairs", parts: ["q", "a"], hint: "One per line, format: Question :: Answer" },
    ],
    defaultProps: { title: "", items: [] },
  },
  categoryOverviewGrid: {
    label: "Service categories overview",
    description: "The Corporate Events / Artist Booking / Venue Booking / Event Rentals teaser grid. Content is fixed; only the heading is editable.",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
    defaultProps: { eyebrow: "", title: "", description: "" },
  },
  servicesGrid: {
    label: "Services grid (this category)",
    description: "Lists every service page in one category, pulled live from Service Pages.",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      {
        key: "category",
        label: "Category",
        type: "text",
        hint: "Exact value: corporate-events, artist-booking, venue-booking, or event-rentals",
      },
    ],
    defaultProps: { eyebrow: "", title: "", description: "", category: "corporate-events" },
  },
  caseStudiesPreview: {
    label: "Case studies preview",
    description: "A teaser of published case studies, pulled live from Our Work.",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
    ],
    defaultProps: { eyebrow: "", title: "" },
  },
  serviceLocations: {
    label: "Cities served",
    description: "The list of city pages, pulled live from Cities.",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
    ],
    defaultProps: { eyebrow: "", title: "" },
  },
  contactSplit: {
    label: "Contact details + quote form",
    description: "The office/phone/email/hours column next to the enquiry form. Content comes from Business Info.",
    fields: [],
    defaultProps: {},
  },
  ctaBand: {
    label: "Call-to-action band",
    description: "A closing banner prompting a call, WhatsApp, or quote request.",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
    defaultProps: { title: "", description: "" },
  },
  leadForm: {
    label: "Enquiry form",
    description: "The \"Plan Your Event\" quote form.",
    fields: [{ key: "sourceLabel", label: "Source label (for lead tracking)", type: "text" }],
    defaultProps: { sourceLabel: "" },
  },
};

export function linesToList(value: string): string[] {
  return value
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

export function linesToObjects(value: string, parts: string[]): Record<string, string>[] {
  return linesToList(value).map((line) => {
    const segments = line.split("::").map((s) => s.trim());
    const obj: Record<string, string> = {};
    parts.forEach((part, i) => {
      obj[part] = segments[i] ?? "";
    });
    return obj;
  });
}

export function listToLines(value: unknown): string {
  return Array.isArray(value) ? (value as string[]).join("\n") : "";
}

export function objectsToLines(value: unknown, parts: string[]): string {
  if (!Array.isArray(value)) return "";
  return (value as Record<string, string>[]).map((obj) => parts.map((p) => obj[p] ?? "").join(" :: ")).join("\n");
}
