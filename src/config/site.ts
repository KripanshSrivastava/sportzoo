/**
 * Central business configuration.
 *
 * DEMO DATA NOTICE: the contact details below (phone, WhatsApp, address,
 * map link, social links, Google review links) are temporary placeholder
 * values filled in so the site previews and functions correctly during
 * development. Replace every one of them with real business details before
 * this site goes live — nothing else in the codebase should hardcode
 * business details, so this is the only file that needs updating.
 */

export const siteConfig = {
  brand: "Elephant Corporate",
  legalName: "Elephant Corporate Events & Entertainment Pvt. Ltd. [REPLACE WITH REAL LEGAL ENTITY NAME]",
  domain: "elephantcorporate.app",
  url: "https://elephantcorporate.app",
  tagline: "Corporate Events, Artists, Venues and Rentals — Planned Precisely, Delivered End to End.",
  shortTagline: "Corporate Event Management, Artist Booking, Venues & Rentals",
  description:
    "Elephant Corporate plans and executes corporate events, and books artists, venues, and event equipment for companies across India — one accountable partner from brief to bill.",

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

  // Google Business Profile — fallback values for the footer "Reviews" link,
  // the Google Reviews section, and the Organization schema. These are just
  // defaults; the live values are edited in /admin → Business Info.
  googleBusinessUrl: "",
  googleRating: "",
  googleReviewCount: "",

  // Analytics — left empty by default; populate via env vars, never hardcode
  analytics: {
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? "",
    gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
    gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },
} as const;

// DEMO VALUES — replace with the real cities Elephant Corporate actually serves.
export const targetCities = [
  { slug: "gurugram", name: "Gurugram" },
  { slug: "mumbai", name: "Mumbai" },
  { slug: "bengaluru", name: "Bengaluru" },
] as const;

export type TargetCity = (typeof targetCities)[number];

export function whatsappLinkForPage(pageLabel: string) {
  const message = `Hi Elephant Corporate, I'm looking into ${pageLabel} and would like a quote.`;
  return `${siteConfig.whatsappHref}?text=${encodeURIComponent(message)}`;
}

/** True for a real, fillable URL — false for unset placeholders ("", "#", or a "[…]" note). */
export function isLiveLink(url: string | null | undefined): url is string {
  return Boolean(url) && url !== "#" && !url!.startsWith("[");
}

/**
 * A Google Maps "embed" iframe src built from a plain address, with no API
 * key required (the `output=embed` param on the normal maps.google.com URL
 * renders an embeddable map — this is the documented key-free method).
 */
export function mapEmbedSrc(address: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
}
