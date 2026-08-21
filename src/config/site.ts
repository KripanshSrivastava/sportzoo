/**
 * Central business configuration.
 *
 * DEMO DATA NOTICE: the contact details below (phone, WhatsApp, address,
 * map link, social links) are temporary placeholder values filled in so the
 * site previews and functions correctly during development. Replace every
 * one of them with real business details before this site goes live —
 * nothing else in the codebase should hardcode business details, so this is
 * the only file that needs updating.
 */

export const siteConfig = {
  brand: "Sportzoo",
  legalName: "Sportzoo Events & Entertainment Pvt. Ltd. [REPLACE WITH REAL LEGAL ENTITY NAME]",
  domain: "sportzoo.in",
  url: "https://sportzoo.in",
  tagline: "Corporate Events, Artists, Venues and Rentals — Planned Precisely, Delivered End to End.",
  shortTagline: "Corporate Event Management, Artist Booking, Venues & Rentals",
  description:
    "Sportzoo plans and executes corporate events, and books artists, venues, and event equipment for companies across India — one accountable partner from brief to bill.",

  ownerName: "Sachin",

  phone: "+91 96545 96149",
  phoneHref: "tel:+919654596149",
  whatsapp: "86791 26961",
  whatsappHref: "https://wa.me/918679126961",
  email: "allinonesolutions.rs@gmail.com",
  officeAddress: "Plot 14, Cyber Hub, DLF Phase 2, Gurugram, Haryana 122002",
  primaryCity: "Gurugram",
  serviceArea: "Pan India",
  mapUrl: "https://maps.google.com/?q=Cyber+Hub+DLF+Phase+2+Gurugram",
  businessHours: "Mon–Sat, 9:30 AM – 6:30 PM IST",

  social: {
    linkedin: "#",
    instagram: "#",
    facebook: "#",
    youtube: "#",
  },

  // Analytics — left empty by default; populate via env vars, never hardcode
  analytics: {
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? "",
    gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
    gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },
} as const;

// DEMO VALUES — replace with the real cities Sportzoo actually serves.
export const targetCities = [
  { slug: "gurugram", name: "Gurugram" },
  { slug: "mumbai", name: "Mumbai" },
  { slug: "bengaluru", name: "Bengaluru" },
] as const;

export type TargetCity = (typeof targetCities)[number];

export function whatsappLinkForPage(pageLabel: string) {
  const message = `Hi Sportzoo, I'm looking into ${pageLabel} and would like a quote.`;
  return `${siteConfig.whatsappHref}?text=${encodeURIComponent(message)}`;
}
