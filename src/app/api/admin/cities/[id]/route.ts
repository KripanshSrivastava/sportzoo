import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

/** Upsert keyed by slug — a static city (id === slug) gets its first DB row created here. */
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await params;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const body = await req.json().catch(() => null);
  if (!body?.slug || !body?.name) return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });

  const { error } = await supabase
    .from("cities")
    .upsert(
      { slug: body.slug, name: body.name, published: body.published !== false, sort_order: body.sortOrder ?? 0 },
      { onConflict: "slug" }
    );

  if (error) {
    console.error("[elephant-corporate] Saving city failed:", error.message);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const { error } = await supabase.from("cities").delete().eq("id", id);
  if (error) {
    console.error("[elephant-corporate] Deleting city failed:", error.message);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
