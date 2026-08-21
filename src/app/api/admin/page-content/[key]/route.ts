import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { PAGE_KEYS, type PageKey } from "@/lib/pageContent";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!PAGE_KEYS.includes(key as PageKey)) {
    return NextResponse.json({ ok: false, message: "Unknown page." }, { status: 404 });
  }
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: true, content: {} });

  const { data, error } = await supabase.from("page_content").select("content").eq("page_key", key).maybeSingle();
  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, content: data?.content ?? {} });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!PAGE_KEYS.includes(key as PageKey)) {
    return NextResponse.json({ ok: false, message: "Unknown page." }, { status: 404 });
  }
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const { error } = await supabase
    .from("page_content")
    .upsert({ page_key: key, content: body, updated_at: new Date().toISOString() }, { onConflict: "page_key" });

  if (error) {
    console.error("[elephant-corporate] Saving page content failed:", error.message);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
