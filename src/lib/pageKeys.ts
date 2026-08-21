export const PAGE_KEYS = [
  "home",
  "about",
  "contact",
  "corporate-events-overview",
  "artist-booking-overview",
  "venue-booking-overview",
  "event-rentals-overview",
] as const;

export type PageKey = (typeof PAGE_KEYS)[number];
