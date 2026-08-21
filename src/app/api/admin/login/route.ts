import { NextRequest, NextResponse } from "next/server";
import { checkAdminPassword, createAdminSession } from "@/lib/adminAuth";
import { isRateLimited } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(`admin-login:${ip}`)) {
    return NextResponse.json({ ok: false, message: "Too many attempts. Please wait a minute and try again." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";

  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json(
      { ok: false, message: "Admin login isn't configured yet — set ADMIN_PASSWORD and ADMIN_SESSION_SECRET." },
      { status: 500 }
    );
  }

  const valid = await checkAdminPassword(password);
  if (!valid) {
    return NextResponse.json({ ok: false, message: "Incorrect password." }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}
