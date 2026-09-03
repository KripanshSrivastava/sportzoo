import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { getHiddenPaths } from "@/lib/hiddenPages";
import { HIDEABLE_PATHS } from "@/lib/hideablePages";
import { revalidateSite } from "@/lib/revalidate";

export async function GET() {
  const hidden = await getHiddenPaths();
  return NextResponse.json({ ok: true, hidden });
}

/** Hide or show a page. Body: { path: string, hidden: boolean }. */
export async function POST(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const body = await req.json().catch(() => null);
  const path = String(body?.path ?? "");
  if (!HIDEABLE_PATHS.includes(path)) {
    return NextResponse.json({ ok: false, message: "That page can't be hidden." }, { status: 400 });
  }

  if (body?.hidden) {
    const { error } = await supabase.from("hidden_pages").upsert({ path }, { onConflict: "path" });
    if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  } else {
    const { error } = await supabase.from("hidden_pages").delete().eq("path", path);
    if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
  revalidateSite();
  return NextResponse.json({ ok: true });
}
