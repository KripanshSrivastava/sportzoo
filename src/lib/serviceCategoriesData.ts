import { cache } from "react";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { CATEGORY_SEEDS } from "@/config/services";

export interface ServiceCategoryRecord {
  id: string;
  slug: string;
  name: string;
  h1: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  heroImageUrl: string;
  published: boolean;
  sortOrder: number;
}

/**
 * Top-level route slugs that are real pages or system files — a category can
 * never use one of these, or it would shadow (or be shadowed by) that route.
 * Enforced on create/rename in the admin API.
 */
export const RESERVED_CATEGORY_SLUGS = [
  "about",
  "admin",
  "api",
  "blog",
  "case-studies",
  "contact",
  "corporate-event-management",
  "events",
  "gallery",
  "privacy-policy",
  "request-a-quote",
  "terms-and-conditions",
  "thank-you",
  "og-default",
  "icon.png",
  "apple-icon.png",
  "robots.txt",
  "sitemap.xml",
  "sitemap",
  "robots",
  "_next",
];

function fromRow(row: Record<string, unknown>): ServiceCategoryRecord {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: (row.name as string) ?? "",
    h1: (row.h1 as string) ?? "",
    intro: (row.intro as string) ?? "",
    metaTitle: (row.meta_title as string) ?? "",
    metaDescription: (row.meta_description as string) ?? "",
    heroImageUrl: (row.hero_image_url as string) ?? "",
    published: Boolean(row.published),
    sortOrder: (row.sort_order as number) ?? 0,
  };
}

function fromSeed(s: (typeof CATEGORY_SEEDS)[number], i: number): ServiceCategoryRecord {
  return {
    id: s.slug,
    slug: s.slug,
    name: s.name,
    h1: s.h1,
    intro: s.intro,
    metaTitle: s.metaTitle,
    metaDescription: s.metaDescription,
    heroImageUrl: "",
    published: true,
    sortOrder: i,
  };
}

const seedRecords = () => CATEGORY_SEEDS.map(fromSeed);

/** Published categories for the public site (nav, routing, sitemap). Falls back to the four seeds. */
export const getServiceCategories = cache(async (): Promise<ServiceCategoryRecord[]> => {
  const supabase = getSupabaseAdmin();
  if (!supabase) return seedRecords();

  const { data, error } = await supabase.from("service_categories").select("*").order("sort_order", { ascending: true });
  if (error || !data || data.length === 0) return seedRecords();

  return data
    .map(fromRow)
    .filter((c) => c.published)
    .sort((a, b) => a.sortOrder - b.sortOrder);
});

export const getServiceCategoryBySlug = cache(async (slug: string): Promise<ServiceCategoryRecord | undefined> => {
  return (await getServiceCategories()).find((c) => c.slug === slug);
});

/** Admin list — every row (incl. hidden), or the seeds if the table is empty/unreachable. */
export async function getAllServiceCategoriesForAdmin(): Promise<ServiceCategoryRecord[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return seedRecords();

  const { data, error } = await supabase.from("service_categories").select("*").order("sort_order", { ascending: true });
  if (error || !data || data.length === 0) return seedRecords();
  return data.map(fromRow);
}

export async function getServiceCategoryForAdminById(id: string): Promise<ServiceCategoryRecord | undefined> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { data } = await supabase.from("service_categories").select("*").eq("id", id).maybeSingle();
    if (data) return fromRow(data);
  }
  return (await getAllServiceCategoriesForAdmin()).find((c) => c.id === id);
}
