import { cache } from "react";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import {
  corporateEventServices,
  artistBookingServices,
  venueBookingServices,
  eventRentalServices,
  type ServicePage,
  type ServiceCategory,
} from "@/config/services";

export interface AdminServicePage extends ServicePage {
  id: string;
  published: boolean;
  sortOrder: number;
}

const staticByCategory: Record<ServiceCategory, ServicePage[]> = {
  "corporate-events": corporateEventServices,
  "artist-booking": artistBookingServices,
  "venue-booking": venueBookingServices,
  "event-rentals": eventRentalServices,
};

function fromRow(row: Record<string, unknown>): AdminServicePage {
  return {
    id: row.id as string,
    slug: row.slug as string,
    category: row.category as ServiceCategory,
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
    published: Boolean(row.published),
    sortOrder: (row.sort_order as number) ?? 0,
  };
}

function fromStatic(s: ServicePage, i: number): AdminServicePage {
  return { ...s, id: s.slug, published: true, sortOrder: i };
}

/** Every service page for a category — DB row if one exists for a slug, else the static fallback. */
export const getServicePagesForCategory = cache(async (category: ServiceCategory): Promise<AdminServicePage[]> => {
  const staticList = staticByCategory[category].map(fromStatic);
  const supabase = getSupabaseAdmin();
  if (!supabase) return staticList;

  const { data, error } = await supabase.from("service_pages").select("*").eq("category", category);
  if (error || !data) return staticList;

  const dbBySlug = new Map(data.map((row) => [row.slug as string, fromRow(row)]));
  // A DB row overrides its static counterpart entirely, including whether it's published.
  const merged = staticList
    .map((s) => dbBySlug.get(s.slug) ?? s)
    .filter((s) => s.published);
  // Include any DB-only, published service pages (created directly in the admin) too.
  for (const row of data) {
    const parsed = fromRow(row);
    if (parsed.published && !merged.some((m) => m.slug === parsed.slug)) merged.push(parsed);
  }
  return merged;
});

export async function getServicePageBySlug(category: ServiceCategory, slug: string): Promise<AdminServicePage | undefined> {
  const all = await getServicePagesForCategory(category);
  return all.find((s) => s.slug === slug);
}

/** Admin list — every DB row plus every static page that has no DB override yet, across all categories. */
export async function getAllServicePagesForAdmin(): Promise<AdminServicePage[]> {
  const supabase = getSupabaseAdmin();
  const allStatic = (Object.keys(staticByCategory) as ServiceCategory[]).flatMap((cat) =>
    staticByCategory[cat].map(fromStatic)
  );
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
  // id can also be a static slug (no DB row yet) — the admin "Edit" link uses whichever id it was shown.
  const all = await getAllServicePagesForAdmin();
  return all.find((s) => s.id === id);
}
