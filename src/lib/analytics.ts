/**
 * Fires GA4 / GTM conversion events. No-ops safely if analytics isn't configured
 * or hasn't loaded yet, so this is safe to call unconditionally from components.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type ConversionEvent =
  | "form_submit"
  | "quote_button_click"
  | "call_click"
  | "whatsapp_click"
  | "email_click"
  | "download_click"
  | "social_click";

export function trackEvent(event: ConversionEvent, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}
