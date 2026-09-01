import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { getAllClientLogosForAdmin } from "@/lib/clientLogosData";

export async function GET() {
  const logos = await getAllClientLogosForAdmin();
  return NextResponse.json({ ok: true, logos });
}

export async function POST(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? "").trim().slice(0, 120);
  const logoUrl = body?.logoUrl ? String(body.logoUrl).slice(0, 500) : null;
  if (!name && !logoUrl) {
    return NextResponse.json({ ok: false, message: "Add a company name or a logo." }, { status: 400 });
  }

  const { count } = await supabase.from("client_logos").select("*", { count: "exact", head: true });
  const { data, error } = await supabase
    .from("client_logos")
    .insert({ name, logo_url: logoUrl, sort_order: count ?? 0 })
    .select()
    .single();

  if (error) {
    console.error("[elephant-corporate] Creating client logo failed:", error.message);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, logo: data });
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
    const { error } = await supabase.from("client_logos").update({ sort_order: i }).eq("id", body[i]);
    if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
