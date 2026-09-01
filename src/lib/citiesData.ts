import { cache } from "react";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { targetCities as staticCities } from "@/config/site";

export interface CityRecord {
  id: string;
  slug: string;
  name: string;
  heroImageUrl: string;
  galleryMediaUrls: string[];
  published: boolean;
  sortOrder: number;
}

function fromRow(row: Record<string, unknown>): CityRecord {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    heroImageUrl: (row.hero_image_url as string) ?? "",
    galleryMediaUrls: (row.gallery_media_urls as string[]) ?? [],
    published: Boolean(row.published),
    sortOrder: (row.sort_order as number) ?? 0,
  };
}

function fromStatic(c: { slug: string; name: string }, i: number): CityRecord {
  return { id: c.slug, slug: c.slug, name: c.name, heroImageUrl: "", galleryMediaUrls: [], published: true, sortOrder: i };
}

/** Public list — DB rows override their static counterpart (including publish state); DB-only cities included too. */
export const getPublishedCities = cache(async (): Promise<CityRecord[]> => {
  const staticList = staticCities.map(fromStatic);
  const supabase = getSupabaseAdmin();
  if (!supabase) return staticList;

  const { data, error } = await supabase.from("cities").select("*").order("sort_order", { ascending: true });
  if (error || !data) return staticList;

  const dbBySlug = new Map(data.map((row) => [row.slug as string, fromRow(row)]));
  const merged = staticList.map((c) => dbBySlug.get(c.slug) ?? c).filter((c) => c.published);
  for (const row of data) {
    const parsed = fromRow(row);
    if (parsed.published && !merged.some((m) => m.slug === parsed.slug)) merged.push(parsed);
  }
  return merged;
});

export async function getPublishedCityBySlug(slug: string): Promise<CityRecord | undefined> {
  const all = await getPublishedCities();
  return all.find((c) => c.slug === slug);
}

export async function getAllCitiesForAdmin(): Promise<CityRecord[]> {
  const staticList = staticCities.map(fromStatic);
  const supabase = getSupabaseAdmin();
  if (!supabase) return staticList;

  const { data, error } = await supabase.from("cities").select("*").order("sort_order", { ascending: true });
  if (error || !data) return staticList;

  const dbBySlug = new Map(data.map((row) => [row.slug as string, fromRow(row)]));
  const merged = staticList.map((c) => dbBySlug.get(c.slug) ?? c);
  for (const row of data) {
    if (!merged.some((m) => m.slug === (row.slug as string))) merged.push(fromRow(row));
  }
  return merged;
}
