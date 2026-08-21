import { cache } from "react";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { siteImages } from "@/config/images";

export interface GalleryImageRow {
  id: string;
  category: string;
  imageUrl: string;
  sortOrder: number;
}

/** Public-facing, grouped by category — Supabase rows if configured and non-empty, else the static fallback. */
export const getGalleryByCategory = cache(async (): Promise<Record<string, string[]>> => {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error && data && data.length > 0) {
      const grouped: Record<string, string[]> = {};
      for (const row of data) {
        const category = row.category as string;
        grouped[category] = grouped[category] || [];
        grouped[category].push(row.image_url as string);
      }
      return grouped;
    }
  }
  return siteImages.gallery;
});

export async function getAllGalleryImagesForAdmin(): Promise<GalleryImageRow[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  const { data, error } = await supabase.from("gallery_images").select("*").order("sort_order", { ascending: true });
  if (error || !data) return [];
  return data.map((row) => ({
    id: row.id as string,
    category: row.category as string,
    imageUrl: row.image_url as string,
    sortOrder: (row.sort_order as number) ?? 0,
  }));
}
