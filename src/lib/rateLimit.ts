/**
 * Minimal in-memory rate limiter for the lead form API route.
 * Suitable for a single-instance Vercel deployment on the hobby/pro tier.
 * For multi-instance or edge deployments, replace with a shared store (e.g. Upstash Redis).
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(identifier) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    hits.set(identifier, timestamps);
    return true;
  }

  timestamps.push(now);
  hits.set(identifier, timestamps);

  if (hits.size > 5000) {
    const cutoff = now - WINDOW_MS;
    for (const [key, times] of hits) {
      if (times.every((t) => t < cutoff)) hits.delete(key);
    }
  }

  return false;
}
