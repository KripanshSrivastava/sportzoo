import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });

  const patch: Record<string, unknown> = {};
  if (typeof body.name === "string") patch.name = body.name.trim().slice(0, 120);
  if ("logoUrl" in body) patch.logo_url = body.logoUrl ? String(body.logoUrl).slice(0, 500) : null;

  const { error } = await supabase.from("client_logos").update(patch).eq("id", id);
  if (error) {
    console.error("[elephant-corporate] Updating client logo failed:", error.message);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const { error } = await supabase.from("client_logos").delete().eq("id", id);
  if (error) {
    console.error("[elephant-corporate] Deleting client logo failed:", error.message);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
