"use client";

import { usePathname } from "next/navigation";
import { whatsappLinkForPage } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

export function WhatsAppFloat() {
  const pathname = usePathname();
  const pageLabel = pathname === "/" ? "your services" : pathname.replace(/^\//, "").replace(/-/g, " ");

  return (
    <a
      href={whatsappLinkForPage(pageLabel)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { source: "float" })}
      data-cta="whatsapp"
      data-location="float"
      aria-label="Chat with Sportzoo on WhatsApp"
      className="fixed bottom-24 right-4 z-40 flex h-[52px] w-[52px] items-center justify-center transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 sm:bottom-6 sm:right-5"
      style={{ background: "var(--color-accent)", color: "var(--color-bg)", boxShadow: "var(--shadow-lg)" }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.002 2C6.478 2 2 6.477 2 12c0 1.99.583 3.845 1.588 5.401L2 22l4.735-1.55A9.955 9.955 0 0012.002 22C17.525 22 22 17.523 22 12S17.525 2 12.002 2zm0 18.2a8.16 8.16 0 01-4.417-1.293l-.317-.19-2.809.92.933-2.74-.207-.281A8.19 8.19 0 013.8 12c0-4.522 3.68-8.2 8.202-8.2 4.521 0 8.199 3.678 8.199 8.2 0 4.523-3.678 8.2-8.199 8.2z" />
      </svg>
    </a>
  );
}
