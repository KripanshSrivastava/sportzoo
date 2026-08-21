import { NextRequest, NextResponse } from "next/server";
import { eventRegistrationSchema } from "@/lib/registrationSchema";
import { isRateLimited } from "@/lib/rateLimit";
import { getPublishedEventBySlug } from "@/lib/eventsData";
import { notifyEventRegistration } from "@/lib/eventRegistrationIntegration";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { createPaymentOrder } from "@/lib/paymentGateway";

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  const event = await getPublishedEventBySlug(slug);
  if (!event) {
    return NextResponse.json({ ok: false, message: "This event could not be found." }, { status: 404 });
  }
  if (!event.registrationOpen) {
    return NextResponse.json({ ok: false, message: "Registration for this event is closed." }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  const parsed = eventRegistrationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please check the form for errors.", errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Honeypot tripped — silently pretend success so bots don't learn the field is checked.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true, paymentStatus: "free" });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ ok: false, message: "Registrations aren't available right now." }, { status: 500 });
  }

  const isFree = event.price <= 0;
  const totalAmount = event.price * parsed.data.attendeeCount;
  const paymentStatus: "free" | "pending" = isFree ? "free" : "pending";

  let paymentOrder: Awaited<ReturnType<typeof createPaymentOrder>> | null = null;
  if (!isFree) {
    paymentOrder = await createPaymentOrder({
      amount: totalAmount,
      currency: event.currency,
      receipt: `${event.slug}-${parsed.data.email}`,
    });
  }

  const { error } = await supabase.from("event_registrations").insert({
    event_id: event.id,
    full_name: parsed.data.fullName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    company_name: parsed.data.companyName || "",
    attendee_count: parsed.data.attendeeCount,
    notes: parsed.data.notes || "",
    amount: totalAmount,
    currency: event.currency,
    payment_status: paymentStatus,
    payment_provider: paymentOrder?.provider ?? null,
    payment_reference: paymentOrder?.orderId ?? null,
  });

  if (error) {
    console.error("[elephant-corporate] Saving event registration failed:", error.message);
    return NextResponse.json(
      { ok: false, message: "We couldn't complete your registration. Please call or WhatsApp us instead." },
      { status: 502 }
    );
  }

  try {
    await notifyEventRegistration(event, parsed.data, paymentStatus);
  } catch (err) {
    console.error("[elephant-corporate] Event registration notification failed:", err);
  }

  return NextResponse.json({
    ok: true,
    paymentStatus,
    checkoutUrl: paymentOrder?.checkoutUrl ?? null,
  });
}
