/**
 * Is this build serving the real, public production site?
 *
 * Controls whether pages are indexable (see src/lib/seo.ts) and whether
 * robots.txt allows crawling (see src/app/robots.ts).
 *
 * History: this used to require `NEXT_PUBLIC_SITE_ENV === "production"` to be
 * set explicitly. When that variable was missing on the production deployment
 * the whole site shipped `Disallow: /` + `noindex`, so Google showed
 * "No information is available for this page". It now **defaults to production**
 * and only steps down to non-production when something explicitly says so:
 *
 *   - NEXT_PUBLIC_SITE_ENV is set to a non-"production" value
 *     ("preview" / "development" / "staging"), or
 *   - Vercel reports this as a preview / development deployment
 *     (VERCEL_ENV, set automatically on every Vercel deploy).
 */
export const isProduction: boolean = (() => {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV?.trim().toLowerCase();
  if (siteEnv) return siteEnv === "production";

  const vercelEnv = process.env.VERCEL_ENV?.trim().toLowerCase();
  if (vercelEnv) return vercelEnv === "production";

  // No explicit signal — assume this is the real site so it stays indexable.
  return true;
})();
