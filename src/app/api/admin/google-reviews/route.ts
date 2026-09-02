import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { getAllGoogleReviewsForAdmin } from "@/lib/googleReviewsData";
import { revalidateSite } from "@/lib/revalidate";

export async function GET() {
  const reviews = await getAllGoogleReviewsForAdmin();
  return NextResponse.json({ ok: true, reviews });
}

export async function POST(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const body = await req.json().catch(() => null);
  const { count } = await supabase.from("google_reviews").select("*", { count: "exact", head: true });

  const { data, error } = await supabase
    .from("google_reviews")
    .insert({
      author: String(body?.author ?? "").slice(0, 120),
      rating: Math.min(5, Math.max(1, Number(body?.rating) || 5)),
      text: String(body?.text ?? "").slice(0, 2000),
      when_label: String(body?.whenLabel ?? "").slice(0, 60),
      sort_order: count ?? 0,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  revalidateSite();
  return NextResponse.json({ ok: true, review: data });
}

/** Reorder — body is an array of ids in the desired order. */
export async function PUT(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const body = await req.json().catch(() => null);
  if (!Array.isArray(body)) return NextResponse.json({ ok: false, message: "Expected an array of ids." }, { status: 400 });

  for (let i = 0; i < body.length; i++) {
    const { error } = await supabase.from("google_reviews").update({ sort_order: i }).eq("id", body[i]);
    if (error) return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
  revalidateSite();
  return NextResponse.json({ ok: true });
}
