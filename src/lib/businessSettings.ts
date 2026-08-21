import { cache } from "react";
import { siteConfig } from "@/config/site";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

/**
 * The subset of siteConfig that's editable through /admin. Everything else
 * (domain, url, social links, analytics) stays static in src/config/site.ts.
 */
export interface BusinessSettings {
  brand: string;
  tagline: string;
  shortTagline: string;
  description: string;
  ownerName: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  whatsappHref: string;
  email: string;
  officeAddress: string;
  primaryCity: string;
  serviceArea: string;
  mapUrl: string;
  businessHours: string;
}

function toPhoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function toWhatsAppHref(whatsapp: string) {
  return `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`;
}

const defaults: BusinessSettings = {
  brand: siteConfig.brand,
  tagline: siteConfig.tagline,
  shortTagline: siteConfig.shortTagline,
  description: siteConfig.description,
  ownerName: siteConfig.ownerName,
  phone: siteConfig.phone,
  phoneHref: siteConfig.phoneHref,
  whatsapp: siteConfig.whatsapp,
  whatsappHref: siteConfig.whatsappHref,
  email: siteConfig.email,
  officeAddress: siteConfig.officeAddress,
  primaryCity: siteConfig.primaryCity,
  serviceArea: siteConfig.serviceArea,
  mapUrl: siteConfig.mapUrl,
  businessHours: siteConfig.businessHours,
};

/**
 * Cached per-request (React cache()) so multiple Server Components on the
 * same page render only trigger one Supabase query. Falls back to the
 * static siteConfig defaults if Supabase isn't configured, the row is
 * missing, or the query fails — the site must never break because of this.
 */
export const getBusinessSettings = cache(async (): Promise<BusinessSettings> => {
  const supabase = getSupabaseAdmin();
  if (!supabase) return defaults;

  try {
    const { data, error } = await supabase.from("business_settings").select("*").eq("id", 1).maybeSingle();
    if (error || !data) return defaults;

    const phone = data.phone || defaults.phone;
    const whatsapp = data.whatsapp || defaults.whatsapp;

    return {
      brand: data.brand || defaults.brand,
      tagline: data.tagline || defaults.tagline,
      shortTagline: data.short_tagline || defaults.shortTagline,
      description: data.description || defaults.description,
      ownerName: data.owner_name || defaults.ownerName,
      phone,
      phoneHref: toPhoneHref(phone),
      whatsapp,
      whatsappHref: toWhatsAppHref(whatsapp),
      email: data.email || defaults.email,
      officeAddress: data.office_address || defaults.officeAddress,
      primaryCity: data.primary_city || defaults.primaryCity,
      serviceArea: data.service_area || defaults.serviceArea,
      mapUrl: data.map_url || defaults.mapUrl,
      businessHours: data.business_hours || defaults.businessHours,
    };
  } catch {
    return defaults;
  }
});
