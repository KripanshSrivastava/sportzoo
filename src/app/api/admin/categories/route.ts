import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { getAllServiceCategoriesForAdmin } from "@/lib/serviceCategoriesData";
import { slugify, validateCategorySlug } from "@/lib/categorySlug";
import { revalidateSite } from "@/lib/revalidate";

export async function GET() {
  const categories = await getAllServiceCategoriesForAdmin();
  return NextResponse.json({ ok: true, categories });
}

export async function POST(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? "").trim().slice(0, 120);
  if (!name) return NextResponse.json({ ok: false, message: "Name is required." }, { status: 400 });

  const slug = slugify(String(body?.slug || name));
  const slugError = validateCategorySlug(slug);
  if (slugError) return NextResponse.json({ ok: false, message: slugError }, { status: 400 });

  const { count } = await supabase.from("service_categories").select("*", { count: "exact", head: true });
  const { data, error } = await supabase
    .from("service_categories")
    .insert({
      slug,
      name,
      h1: String(body?.h1 ?? "").slice(0, 200),
      intro: String(body?.intro ?? "").slice(0, 500),
      meta_title: String(body?.metaTitle ?? "").slice(0, 200),
      meta_description: String(body?.metaDescription ?? "").slice(0, 300),
      hero_image_url: body?.heroImageUrl ? String(body.heroImageUrl).slice(0, 500) : null,
      published: body?.published !== false,
      sort_order: count ?? 0,
    })
    .select()
    .single();

  if (error) {
    const message = /duplicate key/i.test(error.message) ? "That slug is already in use." : error.message;
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
  revalidateSite();
  return NextResponse.json({ ok: true, category: data });
}

/** Reorder — body is an array of ids in the desired order. */
export async function PUT(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const body = await req.json().catch(() => null);
  if (!Array.isArray(body)) {
    return NextResponse.json({ ok: false, message: "Expected an array of ids." }, { status: 400 });
  }
  for (let i = 0; i < body.length; i++) {
    const { error } = await supabase.from("service_categories").update({ sort_order: i }).eq("id", body[i]);
    if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
  revalidateSite();
  return NextResponse.json({ ok: true });
}
