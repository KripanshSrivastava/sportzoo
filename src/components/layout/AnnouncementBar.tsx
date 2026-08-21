import { siteConfig } from "@/config/site";

export function AnnouncementBar() {
  return (
    <div
      className="py-2 text-center text-xs font-medium sm:text-sm"
      style={{ background: "var(--color-accent-900)", color: "var(--color-neutral-300)" }}
    >
      Corporate events, artists, venues and rentals across {siteConfig.primaryCity} and India &middot; Get a response within 24 hours
    </div>
  );
}
