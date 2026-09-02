import { cache } from "react";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import type { CaseStudy } from "@/content/caseStudies";

export interface AdminCaseStudy extends CaseStudy {
  id: string;
  coverImageUrl: string | null;
  galleryMediaUrls: string[];
  published: boolean;
  sortOrder: number;
}

function fromRow(row: Record<string, unknown>): AdminCaseStudy {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    category: row.category as string,
    clientDescriptor: (row.client_descriptor as string) ?? "",
    summary: (row.summary as string) ?? "",
    challenge: (row.challenge as string) ?? "",
    solution: (row.solution as string) ?? "",
    execution: (row.execution as string) ?? "",
    outcomes: (row.outcomes as string[]) ?? [],
    testimonial: row.testimonial_quote
      ? { quote: row.testimonial_quote as string, attribution: (row.testimonial_attribution as string) ?? "" }
      : undefined,
    coverImageUrl: (row.cover_image_url as string) ?? null,
    galleryMediaUrls: (row.gallery_media_urls as string[]) ?? [],
    published: Boolean(row.published),
    sortOrder: (row.sort_order as number) ?? 0,
  };
}

/**
 * Public-facing list — published Supabase rows only. There is NO demo/template
 * fallback: if the owner hasn't added real, permissioned case studies, "Our
 * Work" shows a neutral empty state rather than manufacturing proof (spec §9).
 */
export const getPublishedCaseStudies = cache(async (): Promise<AdminCaseStudy[]> => {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error || !data) return [];
  return data.map(fromRow);
});

export async function getPublishedCaseStudyBySlug(slug: string): Promise<AdminCaseStudy | undefined> {
  const all = await getPublishedCaseStudies();
  return all.find((c) => c.slug === slug);
}

/** Admin list — every row regardless of published state. Requires Supabase; returns [] otherwise. */
export async function getAllCaseStudiesForAdmin(): Promise<AdminCaseStudy[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  const { data, error } = await supabase.from("case_studies").select("*").order("sort_order", { ascending: true });
  if (error || !data) return [];
  return data.map(fromRow);
}
