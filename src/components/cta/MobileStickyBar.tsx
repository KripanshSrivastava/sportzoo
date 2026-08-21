"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig, whatsappLinkForPage } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

export function MobileStickyBar() {
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
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-slate-200 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.08)] transition-transform duration-200 sm:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <a
        href={siteConfig.phoneHref}
        data-cta="call"
        data-location="sticky-bar"
        onClick={() => trackEvent("call_click", { source: "sticky_bar" })}
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-semibold text-[color:var(--color-navy-800)]"
      >
        <span aria-hidden="true">📞</span>
        Call
      </a>
      <a
        href={whatsappLinkForPage(pageLabel)}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="whatsapp"
        data-location="sticky-bar"
        onClick={() => trackEvent("whatsapp_click", { source: "sticky_bar" })}
        className="flex flex-col items-center justify-center gap-0.5 border-x border-slate-200 py-2.5 text-xs font-semibold text-emerald-700"
      >
        <span aria-hidden="true">💬</span>
        WhatsApp
      </a>
      <a
        href="/request-a-quote"
        data-cta="quote"
        data-location="sticky-bar"
        onClick={() => trackEvent("quote_button_click", { source: "sticky_bar" })}
        className="flex flex-col items-center justify-center gap-0.5 bg-[color:var(--color-accent)] py-2.5 text-xs font-semibold text-white"
      >
        <span aria-hidden="true">📝</span>
        Get Quote
      </a>
    </div>
  );
}
