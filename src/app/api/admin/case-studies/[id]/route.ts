import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const { data, error } = await supabase.from("case_studies").select("*").eq("id", id).maybeSingle();
  if (error || !data) return NextResponse.json({ ok: false, message: "Not found." }, { status: 404 });
  return NextResponse.json({ ok: true, caseStudy: data });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });

  const { error } = await supabase
    .from("case_studies")
    .update({
      title: body.title,
      category: body.category,
      client_descriptor: body.clientDescriptor ?? "",
      summary: body.summary ?? "",
      challenge: body.challenge ?? "",
      solution: body.solution ?? "",
      execution: body.execution ?? "",
      outcomes: Array.isArray(body.outcomes) ? body.outcomes : [],
      testimonial_quote: body.testimonialQuote || null,
      testimonial_attribution: body.testimonialAttribution || null,
      cover_image_url: body.coverImageUrl || null,
      published: body.published !== false,
      sort_order: typeof body.sortOrder === "number" ? body.sortOrder : 0,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("[elephant-corporate] Updating case study failed:", error.message);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const { error } = await supabase.from("case_studies").delete().eq("id", id);
  if (error) {
    console.error("[elephant-corporate] Deleting case study failed:", error.message);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
