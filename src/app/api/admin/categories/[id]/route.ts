import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { revalidateSite } from "@/lib/revalidate";
import { slugify, validateCategorySlug } from "@/lib/categorySlug";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });

  const patch: Record<string, unknown> = {};
  if (typeof body.name === "string") patch.name = body.name.trim().slice(0, 120);
  if (typeof body.h1 === "string") patch.h1 = body.h1.slice(0, 200);
  if (typeof body.intro === "string") patch.intro = body.intro.slice(0, 500);
  if (typeof body.metaTitle === "string") patch.meta_title = body.metaTitle.slice(0, 200);
  if (typeof body.metaDescription === "string") patch.meta_description = body.metaDescription.slice(0, 300);
  if ("heroImageUrl" in body) patch.hero_image_url = body.heroImageUrl ? String(body.heroImageUrl).slice(0, 500) : null;
  if (typeof body.published === "boolean") patch.published = body.published;

  if (typeof body.slug === "string" && body.slug.trim()) {
    const slug = slugify(body.slug);
    const slugError = validateCategorySlug(slug);
    if (slugError) return NextResponse.json({ ok: false, message: slugError }, { status: 400 });
    patch.slug = slug;
  }

  const { error } = await supabase.from("service_categories").update(patch).eq("id", id);
  if (error) {
    const message = /duplicate key/i.test(error.message) ? "That slug is already in use." : error.message;
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
  revalidateSite();
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  // Look up the slug so we can report how many service pages are affected.
  const { data: cat } = await supabase.from("service_categories").select("slug").eq("id", id).maybeSingle();

  const { error } = await supabase.from("service_categories").delete().eq("id", id);
  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });

  let orphaned = 0;
  if (cat?.slug) {
    const { count } = await supabase
      .from("service_pages")
      .select("*", { count: "exact", head: true })
      .eq("category", cat.slug);
    orphaned = count ?? 0;
  }
  revalidateSite();
  return NextResponse.json({ ok: true, orphaned });
}
