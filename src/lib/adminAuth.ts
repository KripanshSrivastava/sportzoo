import "server-only";
import { cookies } from "next/headers";
import { buildSessionToken, isValidSessionToken as verifyToken } from "@/lib/sessionToken";

const COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set — required to sign admin session cookies.");
  }
  return secret;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(COOKIE_NAME)?.value, getSecret());
}

/** Constant-time-ish password check via the Web Crypto helper, reusing its comparison. */
export async function checkAdminPassword(password: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  if (password.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= password.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

export async function createAdminSession() {
  const store = await cookies();
  const token = await buildSessionToken(getSecret(), SESSION_TTL_MS);
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
