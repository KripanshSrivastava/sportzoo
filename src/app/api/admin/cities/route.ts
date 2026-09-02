import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { getAllCitiesForAdmin } from "@/lib/citiesData";
import { revalidateSite } from "@/lib/revalidate";

export async function GET() {
  const rows = await getAllCitiesForAdmin();
  return NextResponse.json({ ok: true, cities: rows });
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const body = await req.json().catch(() => null);
  if (!body?.name || typeof body.name !== "string") {
    return NextResponse.json({ ok: false, message: "City name is required." }, { status: 400 });
  }

  const slug = body.slug ? slugify(String(body.slug)) : slugify(body.name);

  const { data, error } = await supabase
    .from("cities")
    .insert({ slug, name: body.name, published: body.published !== false, sort_order: body.sortOrder ?? 0 })
    .select()
    .single();

  if (error) {
    console.error("[elephant-corporate] Creating city failed:", error.message);
    const message = /duplicate key/i.test(error.message) ? "That city slug already exists." : error.message;
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
  revalidateSite();
  return NextResponse.json({ ok: true, city: data });
}
