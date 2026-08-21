import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { getServicePageForAdminById } from "@/lib/servicePagesData";

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
    published: body.published !== false,
    sort_order: typeof body.sortOrder === "number" ? body.sortOrder : 0,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("service_pages").upsert(payload, { onConflict: "slug" });

  if (error) {
    console.error("[elephant-corporate] Saving service page failed:", error.message);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
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
  return NextResponse.json({ ok: true });
}
