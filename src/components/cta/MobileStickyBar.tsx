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

  const linkClass =
    "flex flex-col items-center justify-center gap-1 py-3.5 text-[13px] font-semibold";

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 transition-transform duration-200 sm:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      style={{
        borderTop: "1px solid var(--color-divider)",
        background: "var(--color-bg)",
        boxShadow: "var(--shadow-lg)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <a
        href={siteConfig.phoneHref}
        data-cta="call"
        data-location="sticky-bar"
        onClick={() => trackEvent("call_click", { source: "sticky_bar" })}
        className={linkClass}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.05.36 2.07.7 3a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.1-1.27a2 2 0 0 1 2.11-.45c.94.34 1.96.57 3 .7A2 2 0 0 1 22 16.92z" />
        </svg>
        Call
      </a>
      <a
        href={buildWhatsAppLink(siteConfig.whatsappHref, siteConfig.brand, pageLabel)}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="whatsapp"
        data-location="sticky-bar"
        onClick={() => trackEvent("whatsapp_click", { source: "sticky_bar" })}
        className={linkClass}
        style={{ borderLeft: "1px solid var(--color-divider)", borderRight: "1px solid var(--color-divider)" }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.03c-.24.68-1.42 1.31-1.95 1.36-.5.05-1.13.26-3.66-.77-3.08-1.24-5.06-4.4-5.22-4.6-.15-.2-1.25-1.66-1.25-3.17 0-1.51.79-2.25 1.07-2.56.28-.31.61-.38.81-.38.2 0 .41 0 .58.01.19.01.44-.07.69.53.24.6.83 2.06.9 2.21.07.15.12.33.02.53-.1.2-.15.32-.29.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.44.29.15.46.12.63-.07.17-.2.73-.85.93-1.14.19-.29.39-.24.65-.15.27.1 1.71.81 2 .96.29.15.49.22.56.34.07.12.07.72-.17 1.4z" />
        </svg>
        WhatsApp
      </a>
      <a
        href="/request-a-quote"
        data-cta="quote"
        data-location="sticky-bar"
        onClick={() => trackEvent("quote_button_click", { source: "sticky_bar" })}
        className={linkClass}
        style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
        </svg>
        Get Quote
      </a>
    </div>
  );
}
