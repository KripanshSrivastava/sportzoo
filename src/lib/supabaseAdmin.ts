import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service-role key, which bypasses
 * Row Level Security. Only ever import this from Server Components, Route
 * Handlers, or Server Actions — never from a "use client" file, and never
 * expose SUPABASE_SERVICE_ROLE_KEY with a NEXT_PUBLIC_ prefix.
 *
 * Returns null when Supabase isn't configured (or misconfigured — e.g. the
 * URL isn't a real URL), so every caller must handle that and fall back to
 * static defaults. The site must keep rendering even with bad Supabase env
 * vars, not 500 — a typo in .env.local should never take the whole site down.
 */
export function isSupabaseConfigured() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// No generated Database types for this project's small schema — typed as
// `any` deliberately so `.from("table_name")` doesn't resolve to `never`.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedClient: ReturnType<typeof createClient<any, any, any>> | null = null;
let loggedConfigWarning = false;

export function getSupabaseAdmin() {
  if (!isSupabaseConfigured()) {
    // SUPABASE_URL/KEY are set but invalid (e.g. a key pasted into the URL
    // field) — warn once server-side so it's easy to spot in logs, without
    // spamming every request.
    if (process.env.SUPABASE_URL && !loggedConfigWarning) {
      loggedConfigWarning = true;
      try {
        new URL(process.env.SUPABASE_URL);
      } catch {
        console.error(
          `[elephant-corporate] SUPABASE_URL isn't a valid URL ("${process.env.SUPABASE_URL.slice(0, 20)}…"). ` +
            "It should look like https://xxxxx.supabase.co — find it in Supabase → Project Settings → Data API → Project URL."
        );
      }
    }
    return null;
  }
  if (cachedClient) return cachedClient;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cachedClient = createClient<any, any, any>(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
  } catch (err) {
    console.error("[elephant-corporate] Failed to create Supabase client:", err);
    return null;
  }
  return cachedClient;
}

export const MEDIA_BUCKET = "media";
