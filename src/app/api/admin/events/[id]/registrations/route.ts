import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { getRegistrationsForEvent } from "@/lib/eventsData";
import { revalidateSite } from "@/lib/revalidate";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rows = await getRegistrationsForEvent(id);
  return NextResponse.json({ ok: true, registrations: rows });
}

const VALID_STATUSES = ["pending", "free", "paid", "failed"];

/** Body: { registrationId, paymentStatus } — used to manually mark a registration paid/failed. */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: eventId } = await params;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const body = await req.json().catch(() => null);
  if (!body?.registrationId || !VALID_STATUSES.includes(body?.paymentStatus)) {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const { error } = await supabase
    .from("event_registrations")
    .update({ payment_status: body.paymentStatus })
    .eq("id", body.registrationId)
    .eq("event_id", eventId);

  if (error) {
    console.error("[elephant-corporate] Updating registration failed:", error.message);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

/** Query string: ?registrationId=... — deletes a single registration. */
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: eventId } = await params;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false, message: "Supabase isn't configured yet." }, { status: 500 });

  const registrationId = req.nextUrl.searchParams.get("registrationId");
  if (!registrationId) return NextResponse.json({ ok: false, message: "Missing registrationId." }, { status: 400 });

  const { error } = await supabase
    .from("event_registrations")
    .delete()
    .eq("id", registrationId)
    .eq("event_id", eventId);

  if (error) {
    console.error("[elephant-corporate] Deleting registration failed:", error.message);
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }
  revalidateSite();
  return NextResponse.json({ ok: true });
}
