import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/adminAuth";
import { isValidSessionToken } from "@/lib/sessionToken";

const PUBLIC_ADMIN_PATHS = ["/admin/login", "/api/admin/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ADMIN_PATHS.includes(pathname)) return NextResponse.next();

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const secret = process.env.ADMIN_SESSION_SECRET;
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const valid = secret ? await isValidSessionToken(token, secret) : false;

    if (!valid) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json({ ok: false, message: "Not authenticated." }, { status: 401 });
      }
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
