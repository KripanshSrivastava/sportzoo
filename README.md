# Sportzoo — Corporate Event Management Website

A Next.js (App Router) + TypeScript + Tailwind CSS website for Sportzoo, a corporate event management
company covering corporate events, artist booking & entertainment, venue booking, and event rentals &
equipment. See [SEO-STRATEGY.md](./SEO-STRATEGY.md) for the keyword-to-page map and content plan.

## Tech stack

- Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- Zod for form validation (shared client + server schema)
- No CMS — content lives in typed config/content files under `src/config` and `src/content`
- Deployed to Vercel

## 1. Local development

```bash
npm install
cp .env.example .env.local   # then fill in what you have; everything else can stay blank locally
npm run dev
```

Open http://localhost:3000.

Useful scripts:

```bash
npm run lint       # ESLint
npx tsc --noEmit   # TypeScript check
npm run build      # production build
npm run start      # run the production build locally
```

## 2. How to update business details

Everything business-specific lives in **`src/config/site.ts`**. Update the placeholders there:

```ts
phone, whatsapp, email, officeAddress, primaryCity, mapUrl, social.*
```

Nothing else in the codebase should hardcode a phone number, email, or address — if you find one, it's a bug.

`whatsappLinkForPage()` in the same file builds a WhatsApp deep link with a message pre-filled based on the
current page; it's used by the floating WhatsApp button, the mobile sticky bar, and every `WhatsAppButton`.

## 3. How to add or edit services

Service content lives in **`src/config/services.ts`** as four arrays: `corporateEventServices`,
`artistBookingServices`, `venueBookingServices`, and `eventRentalServices`. Each entry is a `ServicePage`
object with intro copy, problems, inclusions, process steps, benefits, use cases, and FAQs — the object shape
drives the entire page via `src/components/sections/ServicePageTemplate.tsx`. To add a new service:

1. Add a new `ServicePage` entry to the relevant array in `services.ts` (copy an existing entry as a
   starting point and rewrite every field — no filler copy). Its `category` and `parentSlug` must match the
   array it lives in (`corporate-events`, `artist-booking`, `venue-booking`, or `event-rentals`).
2. If the service name doesn't exactly match one of the `serviceOptions` in `src/lib/leadSchema.ts`, add it
   there too, and add a mapping in `formServiceNameBySlug` in `ServicePageTemplate.tsx`.
3. That's it — the route (e.g. `/corporate-events/[slug]`, `/artist-booking/[slug]`), sitemap entry, nav
   dropdown, and footer links are all generated automatically from the array.

To add an entirely new category (a 5th vertical beyond the current four), add a new value to the
`ServiceCategory` union in `services.ts`, a new array, a new `[slug]` dynamic route + pillar page under
`src/app/`, and a new dropdown/entry in `src/config/nav.ts` — follow the existing `artist-booking` folder as
the template.

## 4. How to add cities (local SEO pages)

City data lives in **`src/config/site.ts`** as `targetCities`. Each entry needs a URL-safe `slug` (no spaces
or brackets) and a display `name`. Adding a city automatically generates `/corporate-event-management/[slug]`
and adds it to the sitemap, footer, and homepage service-locations section. Only add cities where Sportzoo
has genuine local knowledge to offer — see the local SEO notes in `SEO-STRATEGY.md`.

## 5. Lead form integration

The "Plan Your Event or Booking" form (`src/components/forms/QuoteForm.tsx`) posts to `POST /api/lead`
(`src/app/api/lead/route.ts`), which:

1. Rate-limits by IP (`src/lib/rateLimit.ts` — in-memory, fine for a single Vercel instance; swap for a
   shared store like Upstash Redis if you scale to multiple regions/instances).
2. Re-validates the payload server-side with the same Zod schema used client-side
   (`src/lib/leadSchema.ts`), including a honeypot field.
3. Hands the validated lead to `deliverLead()` in `src/lib/leadIntegration.ts`.

**To wire up real lead delivery**, set `LEAD_WEBHOOK_URL` in your environment to a webhook endpoint (Zapier,
Make, a serverless function, your CRM's inbound webhook, etc.) that accepts a JSON POST. Until that's set,
leads are only logged server-side — the form still works end to end (validation, honeypot, rate limiting,
success/error states, thank-you redirect), it just doesn't leave the server. This is the only file you need
to touch to change where leads go (email, CRM, database — swap the implementation, keep the function
signature).

UTM parameters, landing page, and referrer are captured client-side (`src/lib/utm.ts`) on first page load per
session and attached to every form submission automatically.

## 6. Analytics setup

Analytics only load once you set the relevant environment variable — nothing fires with a blank `.env`.

| Variable | Effect |
|---|---|
| `NEXT_PUBLIC_GA4_ID` | Loads gtag.js and GA4, if `NEXT_PUBLIC_GTM_ID` is not set |
| `NEXT_PUBLIC_GTM_ID` | Loads Google Tag Manager (takes priority over GA4 direct) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Reserved — not wired up yet; add the Pixel snippet to `AnalyticsScripts.tsx` guarded by this variable when ready |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Adds the Search Console HTML-tag verification meta tag |

Conversion events are pushed to `window.dataLayer` via `trackEvent()` in `src/lib/analytics.ts`, already
wired into every call/WhatsApp/quote button and the lead form's submit handler:

- `form_submit`, `quote_button_click`, `call_click`, `whatsapp_click`, `email_click`, `download_click`

Configure these as GA4 conversion events / GTM triggers once GTM is live. Every primary CTA also carries
`data-cta` / `data-location` attributes for click tracking outside GTM if needed.

## 7. Deployment (Vercel)

1. Push this repository to GitHub/GitLab/Bitbucket and import it in Vercel.
2. Set environment variables in the Vercel project (Project Settings → Environment Variables):
   - `NEXT_PUBLIC_SITE_ENV=production` on the Production environment **only** — leave it unset (or any
     other value) on Preview deployments so preview URLs stay out of search engines
     (`src/app/robots.ts` and `src/lib/seo.ts` both key off this).
   - `LEAD_WEBHOOK_URL`, analytics IDs, etc. as needed.
3. Deploy. Vercel auto-detects Next.js — no custom build command required.
4. Point `sportzoo.in` at the Vercel project and confirm HTTPS is issued.

## 8. Google Search Console setup

1. Add `sportzoo.in` as a property in Search Console (Domain property recommended).
2. Use the "HTML tag" verification method, copy the `content` value, and set it as
   `NEXT_PUBLIC_GSC_VERIFICATION` in Vercel production env vars, then redeploy.
3. Submit `https://sportzoo.in/sitemap.xml` under Sitemaps.
4. Confirm `https://sportzoo.in/robots.txt` allows crawling (it only does once
   `NEXT_PUBLIC_SITE_ENV=production` is set — check this first if verification or indexing seems stuck).

## 9. Project structure

```
src/
  app/                     Routes (App Router) — pages, layout, sitemap.ts, robots.ts, api/lead
  components/
    layout/                Header, Footer, AnnouncementBar
    cta/                   WhatsApp float, mobile sticky bar, reusable CTA buttons
    forms/                 QuoteForm (the lead form)
    sections/              Homepage + service-page section building blocks
    seo/                   JSON-LD builders, Breadcrumbs, AnalyticsScripts
    ui/                    Button, Container, Section primitives
  config/
    site.ts                Central business config — phone, email, address, cities, WhatsApp link builder
    services.ts             All service content across the 4 categories (events, artists, venues, rentals)
    nav.ts                  Header/footer navigation, derived from services.ts
  content/
    blog.ts                 Blog posts (3 complete articles)
    caseStudies.ts           Case study templates (placeholder — see below)
  lib/
    seo.ts, leadSchema.ts, leadIntegration.ts, rateLimit.ts, utm.ts, analytics.ts
```

## 10. What's a placeholder right now

See the final quality report delivered alongside this codebase for the full list. In short: every contact
detail in `src/config/site.ts`, the three target cities, all client logos/testimonials/case studies, and all
photography are placeholders clearly marked in the UI and code — replace before launch.
