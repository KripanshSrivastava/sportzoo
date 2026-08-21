import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { getAllServicePagesForAdmin } from "@/lib/servicePagesData";

export async function GET() {
  const rows = await getAllServicePagesForAdmin();
  return NextResponse.json({ ok: true, servicePages: rows });
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const VALID_CATEGORIES = ["corporate-events", "artist-booking", "venue-booking", "event-rentals"];

export async function POST(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.name || typeof body.name !== "string") {
    return NextResponse.json({ ok: false, message: "Name is required." }, { status: 400 });
  }
  if (!VALID_CATEGORIES.includes(body.category)) {
    return NextResponse.json({ ok: false, message: "Invalid category." }, { status: 400 });
  }

  const slug = body.slug ? slugify(String(body.slug)) : slugify(body.name);

  const { data, error } = await supabase
    .from("service_pages")
    .insert({
      slug,
      category: body.category,
      name: body.name,
      h1: body.h1 || "",
      meta_title: body.metaTitle || "",
      meta_description: body.metaDescription || "",
      intro: Array.isArray(body.intro) ? body.intro : [],
      problems: Array.isArray(body.problems) ? body.problems : [],
      inclusions: Array.isArray(body.inclusions) ? body.inclusions : [],
      process: Array.isArray(body.process) ? body.process : [],
      benefits: Array.isArray(body.benefits) ? body.benefits : [],
      use_cases: Array.isArray(body.useCases) ? body.useCases : [],
      faqs: Array.isArray(body.faqs) ? body.faqs : [],
      published: body.published !== false,
      sort_order: typeof body.sortOrder === "number" ? body.sortOrder : 0,
    })
    .select()
    .single();

  if (error) {
    console.error("[elephant-corporate] Creating service page failed:", error.message);
    const message = /duplicate key/i.test(error.message)
      ? "That URL slug is already used by another page."
      : error.message;
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, servicePage: data });
}
