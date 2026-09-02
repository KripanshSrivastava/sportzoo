import { cache } from "react";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export interface GoogleReviewRow {
  id: string;
  author: string;
  rating: number;
  text: string;
  whenLabel: string;
  sortOrder: number;
}

function fromRow(row: Record<string, unknown>): GoogleReviewRow {
  return {
    id: row.id as string,
    author: (row.author as string) ?? "",
    rating: Number(row.rating) || 5,
    text: (row.text as string) ?? "",
    whenLabel: (row.when_label as string) ?? "",
    sortOrder: (row.sort_order as number) ?? 0,
  };
}

/** Public list — review cards shown on the site, in order. */
export const getGoogleReviews = cache(async (): Promise<GoogleReviewRow[]> => {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  const { data, error } = await supabase.from("google_reviews").select("*").order("sort_order", { ascending: true });
  if (error || !data) return [];
  return data.map(fromRow).filter((r) => r.text.trim());
});

export async function getAllGoogleReviewsForAdmin(): Promise<GoogleReviewRow[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  const { data, error } = await supabase.from("google_reviews").select("*").order("sort_order", { ascending: true });
  if (error || !data) return [];
  return data.map(fromRow);
}
