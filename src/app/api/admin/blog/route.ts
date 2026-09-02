import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { getAllBlogPostsForAdmin } from "@/lib/blogData";
import { resilientUpsert } from "@/lib/resilientUpsert";
import { revalidateSite } from "@/lib/revalidate";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  const posts = await getAllBlogPostsForAdmin();
  return NextResponse.json({ ok: true, posts });
}

export async function POST(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const body = await req.json().catch(() => null);
  if (!body?.title || typeof body.title !== "string") {
    return NextResponse.json({ ok: false, message: "Title is required." }, { status: 400 });
  }
  const slug = body.slug ? slugify(String(body.slug)) : slugify(body.title);
  const today = new Date().toISOString().slice(0, 10);

  const { error } = await resilientUpsert(
    supabase,
    "blog_posts",
    {
      slug,
      title: body.title,
      description: body.description || "",
      cluster: body.cluster || "",
      cover_image_url: body.coverImageUrl || null,
      body: Array.isArray(body.body) ? body.body : [],
      related_service_path: body.relatedServicePath || "",
      related_service_label: body.relatedServiceLabel || "",
      date_published: body.datePublished || today,
      date_modified: today,
      published: body.published !== false,
      sort_order: typeof body.sortOrder === "number" ? body.sortOrder : 0,
    },
    { onConflict: "slug" }
  );

  if (error) {
    const message = /duplicate key/i.test(error.message) ? "That URL slug is already used by another post." : error.message;
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
  revalidateSite();
  return NextResponse.json({ ok: true, slug });
}
