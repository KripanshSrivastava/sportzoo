import { cache } from "react";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const PAGE_KEYS = [
  "home",
  "about",
  "contact",
  "corporate-events-overview",
  "artist-booking-overview",
  "venue-booking-overview",
  "event-rentals-overview",
] as const;

export type PageKey = (typeof PAGE_KEYS)[number];

/** Raw stored JSON for a page, or {} if unconfigured/not yet edited. Each page merges this over its own defaults. */
export const getPageContent = cache(async (pageKey: PageKey): Promise<Record<string, unknown>> => {
  const supabase = getSupabaseAdmin();
  if (!supabase) return {};
  const { data, error } = await supabase.from("page_content").select("content").eq("page_key", pageKey).maybeSingle();
  if (error || !data) return {};
  return (data.content as Record<string, unknown>) ?? {};
});

/** A blank/never-set field falls back to the default — only a real edit overrides it. */
export function textOr(content: Record<string, unknown>, key: string, fallback: string): string {
  const value = content[key];
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

export function listOr<T>(content: Record<string, unknown>, key: string, fallback: T[]): T[] {
  const value = content[key];
  return Array.isArray(value) && value.length > 0 ? (value as T[]) : fallback;
}

export async function getAllPageContentForAdmin(): Promise<Record<PageKey, Record<string, unknown>>> {
  const result = Object.fromEntries(PAGE_KEYS.map((k) => [k, {}])) as Record<PageKey, Record<string, unknown>>;
  const supabase = getSupabaseAdmin();
  if (!supabase) return result;
  const { data, error } = await supabase.from("page_content").select("page_key, content");
  if (error || !data) return result;
  for (const row of data) {
    const key = row.page_key as PageKey;
    if (PAGE_KEYS.includes(key)) result[key] = (row.content as Record<string, unknown>) ?? {};
  }
  return result;
}
