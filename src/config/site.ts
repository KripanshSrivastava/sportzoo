/**
 * Central business configuration.
 * Update every placeholder here before launch — nothing else in the codebase
 * should hardcode business details.
 */

export const siteConfig = {
  brand: "Sportzoo",
  legalName: "Sportzoo [LEGAL ENTITY NAME]",
  domain: "sportzoo.in",
  url: "https://sportzoo.in",
  tagline: "Corporate Events, Artists, Venues and Rentals — Planned Precisely, Delivered End to End.",
  shortTagline: "Corporate Event Management, Artist Booking, Venues & Rentals",
  description:
    "Sportzoo plans and executes corporate events, and books artists, venues, and event equipment for companies across India — one accountable partner from brief to bill.",

  // Contact — replace with real details before launch
  phone: "[PHONE NUMBER]",
  phoneHref: "tel:+91[PHONE NUMBER]",
  whatsapp: "[WHATSAPP NUMBER]",
  whatsappHref: "https://wa.me/91[WHATSAPP NUMBER]",
  email: "[BUSINESS EMAIL]",
  officeAddress: "[OFFICE ADDRESS]",
  primaryCity: "[PRIMARY CITY]",
  mapUrl: "[MAP URL]",
  businessHours: "Mon–Sat, 9:30 AM – 6:30 PM IST",

  social: {
    linkedin: "[LINKEDIN URL]",
    instagram: "[INSTAGRAM URL]",
    facebook: "[FACEBOOK URL]",
    youtube: "[YOUTUBE URL]",
  },

  // Analytics — left empty by default; populate via env vars, never hardcode
  analytics: {
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? "",
    gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
    gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },
} as const;

// Slugs must stay URL-safe (no brackets/spaces) even before real city names
// are filled in — only the display `name` needs replacing.
export const targetCities = [
  { slug: "target-city-1", name: "[TARGET CITY 1]" },
  { slug: "target-city-2", name: "[TARGET CITY 2]" },
  { slug: "target-city-3", name: "[TARGET CITY 3]" },
] as const;

export type TargetCity = (typeof targetCities)[number];

export function whatsappLinkForPage(pageLabel: string) {
  const message = `Hi Sportzoo, I'm looking into ${pageLabel} and would like a quote.`;
  return `${siteConfig.whatsappHref}?text=${encodeURIComponent(message)}`;
}
