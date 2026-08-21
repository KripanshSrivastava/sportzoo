import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";
import { getBusinessSettings } from "@/lib/businessSettings";

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
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("business_settings").upsert(row);
  if (error) {
    console.error("[elephant-corporate] Saving business_settings failed:", error.message);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
