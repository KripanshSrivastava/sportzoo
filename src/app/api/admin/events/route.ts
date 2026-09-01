import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { getAllEventsForAdmin } from "@/lib/eventsData";
import { resilientInsert } from "@/lib/resilientUpsert";

export async function GET() {
  const rows = await getAllEventsForAdmin();
  return NextResponse.json({ ok: true, events: rows });
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

  const { data, error } = await resilientInsert(supabase, "events", {
    slug,
    title: body.title,
    city: body.city || "",
    venue: body.venue || "",
    event_date: body.eventDate || null,
    event_time: body.eventTime || "",
    description: body.description || "",
    cover_image_url: body.coverImageUrl || null,
    gallery_media_urls: Array.isArray(body.galleryMediaUrls) ? body.galleryMediaUrls : [],
    price: typeof body.price === "number" ? body.price : Number(body.price) || 0,
    currency: body.currency || "INR",
    capacity: body.capacity === "" || body.capacity == null ? null : Number(body.capacity),
    registration_open: body.registrationOpen !== false,
    published: body.published !== false,
    sort_order: typeof body.sortOrder === "number" ? body.sortOrder : 0,
  });

  if (error) {
    console.error("[elephant-corporate] Creating event failed:", error.message);
    const message = /duplicate key/i.test(error.message)
      ? "That URL slug is already used by another event."
      : error.message;
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, event: data });
}
