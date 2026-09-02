import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { getBlogPostForAdminById } from "@/lib/blogData";
import { resilientUpsert } from "@/lib/resilientUpsert";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getBlogPostForAdminById(id);
  if (!post) return NextResponse.json({ ok: false, message: "Not found." }, { status: 404 });
  return NextResponse.json({ ok: true, post });
}

/** Upsert keyed by slug — editing a built-in post creates its first DB row here. */
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await params;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const body = await req.json().catch(() => null);
  if (!body?.slug || !body?.title) return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  const today = new Date().toISOString().slice(0, 10);

  const { error } = await resilientUpsert(
    supabase,
    "blog_posts",
    {
      slug: body.slug,
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
    console.error("[elephant-corporate] Saving blog post failed:", error.message);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
