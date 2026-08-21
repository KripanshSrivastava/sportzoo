"use client";

import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { ButtonLink } from "@/components/ui/Button";
import { useSiteConfig } from "@/components/providers/SiteConfigProvider";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

export function CallButton({
  label = "Call Us",
  variant = "outline",
  size = "md",
}: {
  label?: string;
  variant?: Variant;
  size?: Size;
}) {
  const siteConfig = useSiteConfig();
  return (
    <ButtonLink
      href={siteConfig.phoneHref}
      variant={variant}
      size={size}
      dataAttrs={{ cta: "call", location: "inline" }}
      onClick={() => trackEvent("call_click", { source: "inline" })}
    >
      {label}
    </ButtonLink>
  );
}

export function WhatsAppButton({
  pageLabel,
  label = "Chat on WhatsApp",
  variant = "secondary",
  size = "md",
}: {
  pageLabel: string;
  label?: string;
  variant?: Variant;
  size?: Size;
}) {
  const siteConfig = useSiteConfig();
  return (
    <ButtonLink
      href={buildWhatsAppLink(siteConfig.whatsappHref, siteConfig.brand, pageLabel)}
      variant={variant}
      size={size}
      dataAttrs={{ cta: "whatsapp", location: "inline" }}
      onClick={() => trackEvent("whatsapp_click", { source: "inline" })}
    >
      {label}
    </ButtonLink>
  );
}

export function QuoteButton({
  label = "Get a Custom Quote",
  variant = "primary",
  size = "lg",
  href = "/request-a-quote",
}: {
  label?: string;
  variant?: Variant;
  size?: Size;
  href?: string;
}) {
  return (
    <ButtonLink
      href={href}
      variant={variant}
      size={size}
      dataAttrs={{ cta: "quote", location: "inline" }}
      onClick={() => trackEvent("quote_button_click", { source: "inline" })}
    >
      {label}
    </ButtonLink>
  );
}
