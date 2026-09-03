/**
 * Pages that can be hidden from the live site from /admin/pages. Home is not
 * here — it is always visible. Service pages, cities, blog posts, events and
 * case studies have their own per-item "published" toggle instead.
 *
 * Constants only, safe to import from client components (no server-only deps).
 */
export const HIDEABLE_PAGES: { path: string; label: string }[] = [
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
  { path: "/blog", label: "Blog (article index)" },
  { path: "/case-studies", label: "Our Work" },
  { path: "/gallery", label: "Gallery" },
  { path: "/events", label: "Events (listing)" },
  { path: "/request-a-quote", label: "Request a Quote" },
  { path: "/privacy-policy", label: "Privacy Policy" },
  { path: "/terms-and-conditions", label: "Terms & Conditions" },
];

export const HIDEABLE_PATHS = HIDEABLE_PAGES.map((p) => p.path);
