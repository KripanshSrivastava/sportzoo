"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";

export function MobileStickyBar() {
  const siteConfig = useSiteConfig();
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const pageLabel = pathname === "/" ? "your services" : pathname.replace(/^\//, "").replace(/-/g, " ");

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 transition-transform duration-200 sm:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      style={{ borderTop: "1px solid var(--color-divider)", background: "var(--color-bg)", boxShadow: "var(--shadow-lg)" }}
    >
      <a
        href={siteConfig.phoneHref}
        data-cta="call"
        data-location="sticky-bar"
        onClick={() => trackEvent("call_click", { source: "sticky_bar" })}
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-semibold"
      >
        Call
      </a>
      <a
        href={buildWhatsAppLink(siteConfig.whatsappHref, siteConfig.brand, pageLabel)}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="whatsapp"
        data-location="sticky-bar"
        onClick={() => trackEvent("whatsapp_click", { source: "sticky_bar" })}
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-semibold"
        style={{ borderLeft: "1px solid var(--color-divider)", borderRight: "1px solid var(--color-divider)" }}
      >
        WhatsApp
      </a>
      <a
        href="/request-a-quote"
        data-cta="quote"
        data-location="sticky-bar"
        onClick={() => trackEvent("quote_button_click", { source: "sticky_bar" })}
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-semibold"
        style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}
      >
        Get Quote
      </a>
    </div>
  );
}
