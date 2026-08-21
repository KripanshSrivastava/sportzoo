"use client";

import { createContext, useContext, ReactNode } from "react";
import type { BusinessSettings } from "@/lib/businessSettings";

const SiteConfigContext = createContext<BusinessSettings | null>(null);

export function SiteConfigProvider({ value, children }: { value: BusinessSettings; children: ReactNode }) {
  return <SiteConfigContext.Provider value={value}>{children}</SiteConfigContext.Provider>;
}

/** Resolved business settings (admin-editable, with static fallback) for client components. */
export function useSiteConfig(): BusinessSettings {
  const ctx = useContext(SiteConfigContext);
  if (!ctx) {
    throw new Error("useSiteConfig must be used within <SiteConfigProvider> (see src/app/layout.tsx)");
  }
  return ctx;
}
