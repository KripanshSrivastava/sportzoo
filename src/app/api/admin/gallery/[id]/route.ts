import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const { error } = await supabase.from("gallery_images").delete().eq("id", id);
  if (error) {
    console.error("[elephant-corporate] Deleting gallery image failed:", error.message);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
