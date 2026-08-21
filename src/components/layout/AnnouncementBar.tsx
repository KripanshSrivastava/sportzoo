import { siteConfig } from "@/config/site";

export function AnnouncementBar() {
  return (
    <div className="bg-[color:var(--color-navy-950)] py-2 text-center text-xs font-medium text-slate-200 sm:text-sm">
      Corporate events, artists, venues and rentals across {siteConfig.primaryCity} and India &middot; Get a response within 24 hours
    </div>
  );
}
