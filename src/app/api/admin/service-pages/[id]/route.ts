import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { getServicePageForAdminById } from "@/lib/servicePagesData";
import { getAllServiceCategoriesForAdmin } from "@/lib/serviceCategoriesData";
import { resilientUpsert } from "@/lib/resilientUpsert";
import { revalidateSite } from "@/lib/revalidate";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const servicePage = await getServicePageForAdminById(id);
  if (!servicePage) return NextResponse.json({ ok: false, message: "Not found." }, { status: 404 });
  return NextResponse.json({ ok: true, servicePage });
}

/**
 * Edits are always upserts keyed by slug: a static page (id === its slug, no
 * DB row yet) gets its first DB row created here on first save, which is
 * what makes it admin-editable from then on. A page already backed by a DB
 * row is simply updated.
 */
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await params;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });

  const validCategories = (await getAllServiceCategoriesForAdmin()).map((c) => c.slug);
  if (body.category && !validCategories.includes(body.category)) {
    return NextResponse.json({ ok: false, message: "Pick an existing category." }, { status: 400 });
  }

  const payload = {
    slug: body.slug,
    category: body.category,
    name: body.name,
    h1: body.h1 ?? "",
    meta_title: body.metaTitle ?? "",
    meta_description: body.metaDescription ?? "",
    intro: Array.isArray(body.intro) ? body.intro : [],
    problems: Array.isArray(body.problems) ? body.problems : [],
    inclusions: Array.isArray(body.inclusions) ? body.inclusions : [],
    process: Array.isArray(body.process) ? body.process : [],
    benefits: Array.isArray(body.benefits) ? body.benefits : [],
    use_cases: Array.isArray(body.useCases) ? body.useCases : [],
    faqs: Array.isArray(body.faqs) ? body.faqs : [],
    hero_image_url: body.heroImageUrl || null,
    gallery_image_urls: Array.isArray(body.galleryImageUrls) ? body.galleryImageUrls : [],
    published: body.published !== false,
    sort_order: typeof body.sortOrder === "number" ? body.sortOrder : 0,
    updated_at: new Date().toISOString(),
  };

  const { error, skipped } = await resilientUpsert(supabase, "service_pages", payload, { onConflict: "slug" });

  if (error) {
    console.error("[elephant-corporate] Saving service page failed:", error.message);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
  revalidateSite();
  return NextResponse.json({
    ok: true,
    message: skipped.includes("hero_image_url") || skipped.includes("gallery_image_urls")
      ? "Saved — but images weren't stored because the database is on an older version. Run supabase/schema.sql, then save again."
      : undefined,
  });
}

/**
 * Quick publish toggle from the list. Body: { published: boolean }.
 * Preserves the page's current effective content — for a built-in page with no
 * DB row yet, this creates its first row (with the built-in content) so the
 * hidden state sticks.
 */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const body = await req.json().catch(() => null);
  if (typeof body?.published !== "boolean") {
    return NextResponse.json({ ok: false, message: "Expected { published: boolean }." }, { status: 400 });
  }

  const current = await getServicePageForAdminById(id);
  if (!current) return NextResponse.json({ ok: false, message: "Not found." }, { status: 404 });

  const payload = {
    slug: current.slug,
    category: current.category,
    name: current.name,
    h1: current.h1 ?? "",
    meta_title: current.metaTitle ?? "",
    meta_description: current.metaDescription ?? "",
    intro: current.intro ?? [],
    problems: current.problems ?? [],
    inclusions: current.inclusions ?? [],
    process: current.process ?? [],
    benefits: current.benefits ?? [],
    use_cases: current.useCases ?? [],
    faqs: current.faqs ?? [],
    hero_image_url: current.heroImageUrl || null,
    gallery_image_urls: current.galleryImageUrls ?? [],
    published: body.published,
    sort_order: current.sortOrder ?? 0,
    updated_at: new Date().toISOString(),
  };

  const { error } = await resilientUpsert(supabase, "service_pages", payload, { onConflict: "slug" });
  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  revalidateSite();
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const { error } = await supabase.from("service_pages").delete().eq("id", id);
  if (error) {
    console.error("[elephant-corporate] Deleting service page failed:", error.message);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
  revalidateSite();
  return NextResponse.json({ ok: true });
}
