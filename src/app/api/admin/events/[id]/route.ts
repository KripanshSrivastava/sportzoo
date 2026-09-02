import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { resilientUpdate } from "@/lib/resilientUpsert";
import { revalidateSite } from "@/lib/revalidate";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const { data, error } = await supabase.from("events").select("*").eq("id", id).maybeSingle();
  if (error || !data) return NextResponse.json({ ok: false, message: "Not found." }, { status: 404 });
  return NextResponse.json({ ok: true, event: data });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });

  const { error, skipped } = await resilientUpdate(
    supabase,
    "events",
    {
      title: body.title,
      city: body.city ?? "",
      venue: body.venue ?? "",
      event_date: body.eventDate || null,
      event_time: body.eventTime ?? "",
      description: body.description ?? "",
      cover_image_url: body.coverImageUrl || null,
      gallery_media_urls: Array.isArray(body.galleryMediaUrls) ? body.galleryMediaUrls : [],
      price: typeof body.price === "number" ? body.price : Number(body.price) || 0,
      currency: body.currency || "INR",
      capacity: body.capacity === "" || body.capacity == null ? null : Number(body.capacity),
      registration_open: body.registrationOpen !== false,
      published: body.published !== false,
      sort_order: typeof body.sortOrder === "number" ? body.sortOrder : 0,
      updated_at: new Date().toISOString(),
    },
    { id }
  );

  if (error) {
    console.error("[elephant-corporate] Updating event failed:", error.message);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
  return NextResponse.json({
    ok: true,
    message: skipped.includes("gallery_media_urls")
      ? "Saved — but the photo/video gallery wasn't stored because the database is on an older version. Run supabase/schema.sql."
      : undefined,
  });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  // event_registrations has ON DELETE CASCADE, so this also removes its registrations.
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) {
    console.error("[elephant-corporate] Deleting event failed:", error.message);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
  revalidateSite();
  return NextResponse.json({ ok: true });
}
