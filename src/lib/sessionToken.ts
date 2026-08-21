/**
 * Signs/verifies the admin session token using Web Crypto (crypto.subtle),
 * which is available in both the Edge middleware runtime and Node — unlike
 * Node's `crypto` module, which Edge middleware can't use. No JWT library
 * needed for a single signed "expiry.signature" pair.
 */

async function importKey(secret: string) {
  const keyData = new TextEncoder().encode(secret);
  return crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function signValue(value: string, secret: string): Promise<string> {
  const key = await importKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return toHex(signature);
}

export async function buildSessionToken(secret: string, ttlMs: number): Promise<string> {
  const expiry = String(Date.now() + ttlMs);
  const signature = await signValue(expiry, secret);
  return `${expiry}.${signature}`;
}

export async function isValidSessionToken(token: string | undefined, secret: string): Promise<boolean> {
  if (!token) return false;
  const [expiry, signature] = token.split(".");
  if (!expiry || !signature) return false;
  if (Date.now() > Number(expiry)) return false;
  if (!/^[0-9a-f]+$/i.test(signature)) return false;

  const expected = await signValue(expiry, secret);
  if (expected.length !== signature.length) return false;

  // Constant-time compare (crypto.subtle has no built-in timingSafeEqual).
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return diff === 0;
}
