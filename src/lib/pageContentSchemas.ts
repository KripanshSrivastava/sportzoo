import type { PageKey } from "./pageContent";

export type FieldType = "text" | "textarea" | "lines" | "pairs" | "triples";

export interface FieldSchema {
  key: string;
  label: string;
  type: FieldType;
  /** For "pairs"/"triples": the sub-field names encoded in each line, joined with " :: ". */
  parts?: string[];
  hint?: string;
}

const overviewPageFields: FieldSchema[] = [
  { key: "heroTitle", label: "Hero heading", type: "text" },
  { key: "heroDescription", label: "Hero description", type: "textarea" },
  { key: "servicesEyebrow", label: "Services section — eyebrow", type: "text" },
  { key: "servicesTitle", label: "Services section — title", type: "text" },
  { key: "servicesDescription", label: "Services section — description", type: "textarea" },
  { key: "whyEyebrow", label: "\"Why us\" section — eyebrow (blank to hide section)", type: "text" },
  { key: "whyTitle", label: "\"Why us\" section — title", type: "text" },
  { key: "whyDescription", label: "\"Why us\" section — description", type: "textarea" },
  { key: "faqs", label: "FAQs", type: "pairs", parts: ["q", "a"], hint: "One per line, format: Question :: Answer" },
];

export const PAGE_CONTENT_SCHEMAS: Record<PageKey, { label: string; fields: FieldSchema[] }> = {
  home: {
    label: "Home",
    fields: [
      { key: "heroEyebrow", label: "Hero eyebrow tag", type: "text" },
      { key: "heroTitle", label: "Hero heading", type: "textarea" },
      { key: "heroDescription", label: "Hero description", type: "textarea" },
      {
        key: "reasons",
        label: "\"Why choose us\" reasons",
        type: "pairs",
        parts: ["title", "desc"],
        hint: "One per line, format: Title :: Description",
      },
      {
        key: "processSteps",
        label: "How it works — steps",
        type: "pairs",
        parts: ["title", "desc"],
        hint: "One per line, format: Title :: Description",
      },
      {
        key: "testimonials",
        label: "Testimonials",
        type: "triples",
        parts: ["quote", "name", "role"],
        hint: "One per line, format: Quote :: Name :: Role",
      },
      {
        key: "stats",
        label: "Stats band",
        type: "pairs",
        parts: ["value", "label"],
        hint: "One per line, format: Value :: Label",
      },
      { key: "industries", label: "Industries served", type: "lines", hint: "One per line" },
      { key: "faqs", label: "FAQs", type: "pairs", parts: ["q", "a"], hint: "One per line, format: Question :: Answer" },
    ],
  },
  about: {
    label: "About",
    fields: [
      { key: "heroTitle", label: "Hero heading", type: "text" },
      { key: "heroDescription", label: "Hero description", type: "textarea" },
      { key: "intro", label: "Intro paragraphs", type: "lines", hint: "One per line" },
      {
        key: "values",
        label: "\"What we stand for\" values",
        type: "pairs",
        parts: ["title", "desc"],
        hint: "One per line, format: Title :: Description",
      },
    ],
  },
  contact: {
    label: "Contact",
    fields: [
      { key: "heroTitle", label: "Hero heading", type: "text" },
      { key: "heroDescription", label: "Hero description", type: "textarea" },
    ],
  },
  "corporate-events-overview": { label: "Corporate Events (overview page)", fields: overviewPageFields },
  "artist-booking-overview": { label: "Artist Booking (overview page)", fields: overviewPageFields },
  "venue-booking-overview": { label: "Venue Booking (overview page)", fields: overviewPageFields },
  "event-rentals-overview": { label: "Event Rentals (overview page)", fields: overviewPageFields },
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
  return (value as Record<string, string>[])
    .map((obj) => parts.map((p) => obj[p] ?? "").join(" :: "))
    .join("\n");
}
