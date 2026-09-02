/**
 * Static image config. Only the header-logo fallback lives here now; every
 * other image on the site is chosen through the admin panel (Business Info,
 * page sections, Gallery, service pages, case studies, events, cities).
 *
 * No stock / random placeholder providers (Picsum etc.) — a missing image
 * renders a clean text layout, never a broken or random frame (dev spec §4).
 */
export const siteImages = {
  // Header logo. `null` shows the text-badge fallback ("E" in a box + brand
  // name). Overridden by Business Info → Logo once uploaded.
  logo: "/images/logo.jpg" as string | null,
};
