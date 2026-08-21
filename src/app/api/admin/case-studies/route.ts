import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { getAllCaseStudiesForAdmin } from "@/lib/caseStudiesData";

export async function GET() {
  const rows = await getAllCaseStudiesForAdmin();
  return NextResponse.json({ ok: true, caseStudies: rows });
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
  if (!supabase) {
    return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.title || typeof body.title !== "string") {
    return NextResponse.json({ ok: false, message: "Title is required." }, { status: 400 });
  }

  const slug = body.slug ? slugify(String(body.slug)) : slugify(body.title);

  const { data, error } = await supabase
    .from("case_studies")
    .insert({
      slug,
      title: body.title,
      category: body.category || "Corporate Event",
      client_descriptor: body.clientDescriptor || "",
      summary: body.summary || "",
      challenge: body.challenge || "",
      solution: body.solution || "",
      execution: body.execution || "",
      outcomes: Array.isArray(body.outcomes) ? body.outcomes : [],
      testimonial_quote: body.testimonialQuote || null,
      testimonial_attribution: body.testimonialAttribution || null,
      cover_image_url: body.coverImageUrl || null,
      published: body.published !== false,
      sort_order: typeof body.sortOrder === "number" ? body.sortOrder : 0,
    })
    .select()
    .single();

  if (error) {
    console.error("[elephant-corporate] Creating case study failed:", error.message);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, caseStudy: data });
}
