/**
 * Static nav skeleton — the non-category top-level links.
 *
 * The service-category links and their dropdowns are dynamic (managed from
 * /admin/categories); the header and footer build those from `useNav()`
 * (see src/lib/navData.ts + src/components/providers/NavProvider.tsx).
 */

export interface NavItem {
  href: string;
  label: string;
}

/** Links shown before the category dropdowns. */
export const navLeading: NavItem[] = [{ href: "/", label: "Home" }];

/** Links shown after the category dropdowns. */
export const navTrailing: NavItem[] = [
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

/** Flat list used where a simple, dependency-free nav is enough (e.g. the 404 page). */
export const mainNav: NavItem[] = [
  ...navLeading,
  { href: "/corporate-events", label: "Corporate Events" },
  { href: "/artist-booking", label: "Artist Booking" },
  { href: "/venue-booking", label: "Venue Booking" },
  { href: "/event-rentals", label: "Event Rentals" },
  ...navTrailing,
];
