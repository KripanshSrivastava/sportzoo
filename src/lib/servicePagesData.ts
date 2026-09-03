import { cache } from "react";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import {
  corporateEventServices,
  artistBookingServices,
  venueBookingServices,
  eventRentalServices,
  type ServicePage,
} from "@/config/services";

export interface AdminServicePage extends ServicePage {
  id: string;
  published: boolean;
  sortOrder: number;
  /** True when this slug ships as built-in content in code (deleting only reverts it). */
  builtIn: boolean;
}

const STATIC_SLUGS = new Set(
  [...corporateEventServices, ...artistBookingServices, ...venueBookingServices, ...eventRentalServices].map((s) => s.slug)
);

const staticServices: ServicePage[] = [
  ...corporateEventServices,
  ...artistBookingServices,
  ...venueBookingServices,
  ...eventRentalServices,
];

function fromRow(row: Record<string, unknown>): AdminServicePage {
  return {
    id: row.id as string,
    slug: row.slug as string,
    category: row.category as string,
    parentSlug: row.category as string,
    name: row.name as string,
    h1: (row.h1 as string) ?? "",
    metaTitle: (row.meta_title as string) ?? "",
    metaDescription: (row.meta_description as string) ?? "",
    primaryKeyword: "",
    secondaryKeywords: [],
    intro: (row.intro as string[]) ?? [],
    problems: (row.problems as string[]) ?? [],
    inclusions: (row.inclusions as { title: string; desc: string }[]) ?? [],
    process: (row.process as { title: string; desc: string }[]) ?? [],
    benefits: (row.benefits as string[]) ?? [],
    useCases: (row.use_cases as string[]) ?? [],
    faqs: (row.faqs as { q: string; a: string }[]) ?? [],
    heroImageUrl: (row.hero_image_url as string) ?? "",
    galleryImageUrls: (row.gallery_image_urls as string[]) ?? [],
    body: Array.isArray(row.body) ? (row.body as AdminServicePage["body"]) : [],
    published: Boolean(row.published),
    sortOrder: (row.sort_order as number) ?? 0,
    builtIn: STATIC_SLUGS.has(row.slug as string),
  };
}

function fromStatic(s: ServicePage, i: number): AdminServicePage {
  return { ...s, id: s.slug, published: true, sortOrder: i, builtIn: true };
}

/** Every service page — DB row where one exists for a slug, else the static seed. Cached per request. */
const getAllServicePages = cache(async (): Promise<AdminServicePage[]> => {
  const supabase = getSupabaseAdmin();
  const bySlug = new Map<string, AdminServicePage>();
  staticServices.forEach((s, i) => bySlug.set(s.slug, fromStatic(s, i)));

  if (supabase) {
    const { data } = await supabase.from("service_pages").select("*");
    for (const row of data ?? []) bySlug.set(row.slug as string, fromRow(row));
  }
  return [...bySlug.values()];
});

/** Published service pages for a category slug, ordered by sort order then name. */
export const getServicePagesForCategory = cache(async (category: string): Promise<AdminServicePage[]> => {
  return (await getAllServicePages())
    .filter((s) => s.published && s.category === category)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
});

export async function getServicePageBySlug(category: string, slug: string): Promise<AdminServicePage | undefined> {
  const page = (await getAllServicePages()).find((s) => s.slug === slug && s.category === category);
  return page && page.published ? page : undefined;
}

/** Admin list — every DB row plus every static seed with no DB override yet, across all categories. */
export async function getAllServicePagesForAdmin(): Promise<AdminServicePage[]> {
  const supabase = getSupabaseAdmin();
  const allStatic = staticServices.map(fromStatic);
  if (!supabase) return allStatic;

  const { data, error } = await supabase.from("service_pages").select("*").order("sort_order", { ascending: true });
  if (error || !data) return allStatic;

  const dbBySlug = new Map(data.map((row) => [row.slug as string, fromRow(row)]));
  const merged = allStatic.map((s) => dbBySlug.get(s.slug) ?? s);
  for (const row of data) {
    if (!merged.some((m) => m.slug === row.slug)) merged.push(fromRow(row));
  }
  return merged;
}

export async function getServicePageForAdminById(id: string): Promise<AdminServicePage | undefined> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { data } = await supabase.from("service_pages").select("*").eq("id", id).maybeSingle();
    if (data) return fromRow(data);
  }
  const all = await getAllServicePagesForAdmin();
  return all.find((s) => s.id === id);
}
