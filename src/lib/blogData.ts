import { cache } from "react";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { blogPosts as staticPosts, type BlogPost, type BlogBlock } from "@/content/blog";

export interface AdminBlogPost extends BlogPost {
  id: string;
  coverImageUrl: string;
  published: boolean;
  sortOrder: number;
}

function fromStatic(p: BlogPost, i: number): AdminBlogPost {
  return { ...p, id: p.slug, coverImageUrl: p.coverImageUrl ?? "", published: true, sortOrder: i };
}

function fromRow(row: Record<string, unknown>): AdminBlogPost {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    description: (row.description as string) ?? "",
    cluster: (row.cluster as string) ?? "",
    coverImageUrl: (row.cover_image_url as string) ?? "",
    body: (row.body as BlogBlock[]) ?? [],
    relatedServicePath: (row.related_service_path as string) ?? "",
    relatedServiceLabel: (row.related_service_label as string) ?? "",
    datePublished: (row.date_published as string) ?? "",
    dateModified: (row.date_modified as string) ?? "",
    published: Boolean(row.published),
    sortOrder: (row.sort_order as number) ?? 0,
  };
}

function byNewest(a: AdminBlogPost, b: AdminBlogPost) {
  return (b.datePublished || "").localeCompare(a.datePublished || "");
}

async function mergedPosts(includeUnpublished: boolean): Promise<AdminBlogPost[]> {
  const staticList = staticPosts.map(fromStatic);
  const supabase = getSupabaseAdmin();
  if (!supabase) return staticList;

  const { data, error } = await supabase.from("blog_posts").select("*");
  if (error || !data) return staticList;

  const dbBySlug = new Map(data.map((r) => [r.slug as string, fromRow(r)]));
  const merged = staticList.map((p) => dbBySlug.get(p.slug) ?? p);
  for (const r of data) {
    const p = fromRow(r);
    if (!merged.some((m) => m.slug === p.slug)) merged.push(p);
  }
  return (includeUnpublished ? merged : merged.filter((p) => p.published)).sort(byNewest);
}

/** Public list — published posts (DB overrides the built-in ones), newest first. */
export const getPublishedBlogPosts = cache(() => mergedPosts(false));

export async function getPublishedBlogPostBySlug(slug: string): Promise<AdminBlogPost | undefined> {
  return (await getPublishedBlogPosts()).find((p) => p.slug === slug);
}

/** Admin list — every post including unpublished. */
export async function getAllBlogPostsForAdmin(): Promise<AdminBlogPost[]> {
  return mergedPosts(true);
}

export async function getBlogPostForAdminById(id: string): Promise<AdminBlogPost | undefined> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { data } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();
    if (data) return fromRow(data);
  }
  const all = await getAllBlogPostsForAdmin();
  return all.find((p) => p.id === id || p.slug === id);
}
