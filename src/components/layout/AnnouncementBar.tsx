"use client";

import { useSiteConfig } from "@/components/providers/SiteConfigProvider";

export function AnnouncementBar() {
  const settings = useSiteConfig();
  return (
    <div
      className="py-2 text-center text-xs font-medium sm:text-sm"
      style={{ background: "var(--color-accent-900)", color: "var(--color-neutral-300)" }}
    >
      Corporate events, artists, venues and rentals across {settings.primaryCity} and India
      {settings.responsePromise ? ` · Get a response ${settings.responsePromise}` : ""}
    </div>
  );
}
