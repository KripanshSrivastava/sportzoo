import { cache } from "react";
import { siteConfig } from "@/config/site";
import { siteImages } from "@/config/images";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

/**
 * The subset of siteConfig that's editable through /admin. Everything else
 * (domain, url, social links, analytics) stays static in src/config/site.ts.
 */
export interface BusinessSettings {
  brand: string;
  legalName: string;
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
  /** Optional response-time promise (e.g. "within 24–48 hours"). Blank = shown nowhere. */
  responsePromise: string;
  logoUrl: string | null;
  linkedinUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  googleBusinessUrl: string;
  googleRating: string;
  googleReviewCount: string;
}

/** Treat "#", empty, and "[PLACEHOLDER]" values as "not set". */
function cleanUrl(value: string | null | undefined): string {
  const v = (value ?? "").trim();
  if (!v || v === "#" || v.startsWith("[")) return "";
  return v;
}

function toPhoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function toWhatsAppHref(whatsapp: string) {
  return `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`;
}

const defaults: BusinessSettings = {
  brand: siteConfig.brand,
  legalName: siteConfig.legalName,
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
  responsePromise: siteConfig.responsePromise,
  logoUrl: siteImages.logo,
  linkedinUrl: cleanUrl(siteConfig.social.linkedin),
  instagramUrl: cleanUrl(siteConfig.social.instagram),
  facebookUrl: cleanUrl(siteConfig.social.facebook),
  youtubeUrl: cleanUrl(siteConfig.social.youtube),
  googleBusinessUrl: cleanUrl(siteConfig.googleBusinessUrl),
  googleRating: siteConfig.googleRating,
  googleReviewCount: siteConfig.googleReviewCount,
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
      legalName: data.legal_name || defaults.legalName,
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
      responsePromise: data.response_promise ?? defaults.responsePromise,
      logoUrl: data.logo_url || defaults.logoUrl,
      linkedinUrl: cleanUrl(data.linkedin_url) || defaults.linkedinUrl,
      instagramUrl: cleanUrl(data.instagram_url) || defaults.instagramUrl,
      facebookUrl: cleanUrl(data.facebook_url) || defaults.facebookUrl,
      youtubeUrl: cleanUrl(data.youtube_url) || defaults.youtubeUrl,
      googleBusinessUrl: cleanUrl(data.google_business_url) || defaults.googleBusinessUrl,
      googleRating: data.google_rating || defaults.googleRating,
      googleReviewCount: data.google_review_count || defaults.googleReviewCount,
    };
  } catch {
    return defaults;
  }
});
