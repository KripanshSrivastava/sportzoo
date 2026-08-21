import { NextRequest, NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/leadSchema";
import { isRateLimited } from "@/lib/rateLimit";
import { deliverLead } from "@/lib/leadIntegration";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const parsed = leadFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please check the form for errors.", errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Honeypot tripped — silently pretend success so bots don't learn the field is checked.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  try {
    await deliverLead({ ...parsed.data, submittedAt: new Date().toISOString(), ip });
  } catch (err) {
    console.error("[elephant-corporate] Lead delivery failed:", err);
    return NextResponse.json(
      { ok: false, message: "We couldn't submit your enquiry right now. Please call or WhatsApp us instead." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
