"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { QuoteForm } from "@/components/forms/QuoteForm";

const SESSION_KEY = "sportzoo_lead_popup_shown";
const SHOW_DELAY_MS = 4000;

// Pages where the popup would just duplicate the form already on screen.
const SKIP_PATHS = ["/request-a-quote", "/thank-you", "/contact"];

export function LeadPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // sessionStorage unavailable (e.g. privacy mode) — popup may reappear, not critical
    }
  }, []);

  useEffect(() => {
    if (SKIP_PATHS.includes(pathname)) return;

    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // ignore — treat as not shown
    }
    if (alreadyShown) return;

    const timer = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="dialog-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="lead-popup-title">
        <button type="button" className="dialog-close" aria-label="Close" onClick={close}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
        <h2 id="lead-popup-title" className="dialog-title m-0">
          Plan your event or booking
        </h2>
        <p className="dialog-body m-0">Tell us what you need and we&apos;ll come back with a costed proposal within 24–48 hours.</p>
        <QuoteForm sourcePage="Entry Popup" />
      </div>
    </div>
  );
}
