import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";
import { getBusinessSettings } from "@/lib/businessSettings";
import { resilientUpsert } from "@/lib/resilientUpsert";

export async function GET() {
  const settings = await getBusinessSettings();
  return NextResponse.json({ ok: true, settings, supabaseConfigured: isSupabaseConfigured() });
}

export async function PUT(req: NextRequest) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, message: "Supabase isn't configured yet — set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const row = {
    id: 1,
    brand: String(body.brand ?? "").slice(0, 200) || null,
    legal_name: String(body.legalName ?? "").slice(0, 300) || null,
    tagline: String(body.tagline ?? "").slice(0, 300) || null,
    short_tagline: String(body.shortTagline ?? "").slice(0, 200) || null,
    description: String(body.description ?? "").slice(0, 1000) || null,
    owner_name: String(body.ownerName ?? "").slice(0, 100) || null,
    phone: String(body.phone ?? "").slice(0, 40) || null,
    whatsapp: String(body.whatsapp ?? "").slice(0, 40) || null,
    email: String(body.email ?? "").slice(0, 200) || null,
    office_address: String(body.officeAddress ?? "").slice(0, 500) || null,
    primary_city: String(body.primaryCity ?? "").slice(0, 100) || null,
    service_area: String(body.serviceArea ?? "").slice(0, 100) || null,
    map_url: String(body.mapUrl ?? "").slice(0, 500) || null,
    business_hours: String(body.businessHours ?? "").slice(0, 200) || null,
    response_promise: String(body.responsePromise ?? "").slice(0, 120) || null,
    logo_url: body.logoUrl ? String(body.logoUrl).slice(0, 500) : null,
    linkedin_url: String(body.linkedinUrl ?? "").slice(0, 500) || null,
    instagram_url: String(body.instagramUrl ?? "").slice(0, 500) || null,
    facebook_url: String(body.facebookUrl ?? "").slice(0, 500) || null,
    youtube_url: String(body.youtubeUrl ?? "").slice(0, 500) || null,
    google_business_url: String(body.googleBusinessUrl ?? "").slice(0, 500) || null,
    google_rating: String(body.googleRating ?? "").slice(0, 10) || null,
    google_review_count: String(body.googleReviewCount ?? "").slice(0, 20) || null,
    updated_at: new Date().toISOString(),
  };

  const { error, skipped } = await resilientUpsert(supabase, "business_settings", row);
  if (error) {
    console.error("[elephant-corporate] Saving business_settings failed:", error.message);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    message: skipped.length
      ? `Saved. Note: ${skipped.length} newer field(s) weren't stored because the database is on an older version — run supabase/schema.sql to enable them.`
      : undefined,
  });
}
