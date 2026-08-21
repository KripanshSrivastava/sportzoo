# Sportzoo SEO Strategy

This document maps keywords to pages, defines search intent, and lists supporting content. Treat it as a living document — update it as rankings data and new service lines come in.

## 1. Keyword-to-Page Map

| Page | URL | Primary Keyword | Secondary Keywords | Intent |
|---|---|---|---|---|
| Home | `/` | corporate event management company | corporate event organisers in [city], event planning company | Commercial |
| Corporate Events (pillar) | `/corporate-events` | corporate event management company | corporate event planners, corporate event organisers | Commercial |
| Corporate Offsite Planning | `/corporate-events/corporate-offsite-planning` | corporate offsite planning company | corporate offsite planners, corporate offsite management, leadership offsite planning | Commercial |
| Rewards & Recognition Events | `/corporate-events/rewards-and-recognition-events` | rewards and recognition event management | employee recognition event planners, corporate awards ceremony organisers | Commercial |
| Corporate Annual Day | `/corporate-events/corporate-annual-day-management` | corporate annual day organisers | corporate annual day management company, annual day event planners | Commercial |
| Corporate Sports Day | `/corporate-events/corporate-sports-day-management` | corporate sports day organisers | corporate sports day management, office sports day planners | Commercial |
| Corporate Outings & Team Building | `/corporate-events/corporate-outings-and-team-building` | corporate team-building activities | corporate outing planners, team outing management company | Commercial |
| Corporate Gifting | `/corporate-events/corporate-gifting` | corporate gifting company | corporate gift sourcing, employee gifting services, bulk corporate gift delivery | Commercial |
| Conferences & Meetings | `/corporate-events/conferences-and-corporate-meetings` | corporate conference management company | corporate meeting planners, conference organiser | Commercial |
| Artist Booking (pillar) | `/artist-booking` | corporate event artist booking | book artist for corporate event | Commercial |
| Live Music & DJ Booking | `/artist-booking/live-music-and-dj-booking` | corporate event artist booking | book DJ for corporate event, live band booking for corporate events | Commercial |
| Anchors & Emcees | `/artist-booking/anchors-and-emcees` | corporate event anchor booking | emcee for corporate event, hire anchor for conference | Commercial |
| Speakers, Comedians & Specialty Acts | `/artist-booking/speakers-comedians-and-specialty-acts` | corporate motivational speaker booking | corporate stand-up comedian booking, hire speaker for corporate event | Commercial |
| Venue Booking (pillar) | `/venue-booking` | corporate venue booking | conference hall booking, banquet hall booking | Commercial |
| Conference & Meeting Venues | `/venue-booking/conference-and-meeting-venues` | corporate conference venue booking | conference hall booking, corporate meeting venue booking | Commercial |
| Offsite & Retreat Venues | `/venue-booking/offsite-and-retreat-venues` | corporate offsite venue booking | offsite resort booking for companies, corporate retreat venue | Commercial |
| Banquet & Large-Format Venues | `/venue-booking/banquet-and-large-format-venues` | banquet hall booking for corporate event | large event venue booking, exhibition center booking | Commercial |
| Event Rentals (pillar) | `/event-rentals` | event equipment rental | corporate event production company | Commercial |
| Audio Visual & Production Equipment | `/event-rentals/audio-visual-and-production-equipment` | event AV equipment rental | sound system rental for corporate event, LED wall rental for events | Commercial |
| Event Decor, Tent & Branding | `/event-rentals/event-decor-tent-and-branding` | corporate event decor and branding | event tent rental for corporate event, event branding and fabrication | Commercial |
| Event Games & Engagement Activities | `/event-rentals/event-games-and-engagement-activities` | corporate event games rental | engagement activities for corporate events, VR experience rental for events | Commercial |
| City event page | `/corporate-event-management/[city]` | corporate event organisers in [city] | corporate event planners in [city] | Local commercial |
| Blog: Offsite guide | `/blog/how-to-plan-a-successful-corporate-offsite` | how to plan a corporate offsite | corporate offsite checklist, offsite planning guide | Informational |
| Blog: Annual day checklist | `/blog/corporate-annual-day-planning-checklist` | corporate annual day checklist | annual day planning guide | Informational |
| Blog: Venue selection guide | `/blog/how-to-choose-a-corporate-event-venue` | how to choose a corporate event venue | corporate venue checklist, event venue selection | Informational |
| About | `/about` | corporate event management company | — | Navigational/Trust |
| Request a Quote | `/request-a-quote` | (no target keyword — conversion page) | — | Transactional |

**Cannibalization guardrails:** each service page owns exactly one primary keyword; city pages target `[keyword] in [city]` variants, never the unqualified national keyword; blog posts target informational long-tail queries and internally link to — never compete with — their related commercial page.

## 2. Content Priority (build order)

1. Home, Corporate Events, Artist Booking, Venue Booking, Event Rentals pillar pages — highest search volume, anchor internal linking.
2. Corporate Offsite Planning, Live Music & DJ Booking, Conference & Meeting Venues, AV & Production Equipment — highest commercial intent among sub-services.
3. Remaining sub-services across all four categories.
4. City location pages, starting with the primary city, then expanding as real target cities are confirmed.
5. Blog content, prioritising posts that support the highest-intent service pages.

## 3. Internal Linking Recommendations

- Every service page links to 2–3 related services within the same category (implemented via the "Related Services" section in `ServicePageTemplate`).
- Service pages across categories cross-link where the offerings naturally combine — e.g. conference/meeting pages link to venue booking and AV rentals; annual day and recognition pages link to artist booking.
- Every blog post links to exactly one primary related service page (avoid diluting link equity across many links).
- City pages link back to the corporate events pillar and to each specific event service page in the context of that city.
- Footer links to every service across all four categories and every city page site-wide, providing crawl depth of 1 click from any page to any service.
- Home page links to all four pillars and a sample of services, cities, and case studies.

## 4. On-Page SEO Checklist (applied to every page)

- One `<h1>` per page, matching the mapped primary keyword's intent (not necessarily the exact-match string).
- Unique `<title>` and meta description per route via `buildMetadata()` in `src/lib/seo.ts`.
- Canonical URL set on every page.
- Open Graph + Twitter Card metadata.
- Breadcrumb navigation with `BreadcrumbList` JSON-LD.
- FAQ sections with `FAQPage` JSON-LD where genuine FAQs exist.
- `Service` JSON-LD on every service detail page.
- `Article` JSON-LD on every blog post.
- `ProfessionalService` (Organization) + `WebSite` JSON-LD site-wide.
- No `Review`/`AggregateRating` schema until genuine review data exists.

## 5. Supporting Blog Topics (15-idea content calendar)

**Cluster: Corporate Event Planning**
1. How to Plan a Successful Corporate Offsite: A Step-by-Step Guide — *published*
2. Corporate Event Budget Planning Guide: What Things Actually Cost
3. Event Planning Checklist: 30 Days Out to Event Day

**Cluster: Corporate Offsites**
4. Leadership Offsite vs Team Offsite: Choosing the Right Format
5. How to Choose a Corporate Event Venue (Without Regretting It Later) — *published*

**Cluster: Employee Engagement**
6. Best Team-Building Activities for Employees, by Team Size
7. How to Design a Sports Day That Isn't Just for the Fit Few

**Cluster: Rewards & Recognition**
8. Corporate Annual Day Planning Checklist: 10 Things to Confirm Before the Big Day — *published*
9. How to Structure Award Categories for an Employee Recognition Ceremony

**Cluster: Artist & Entertainment Booking**
10. How to Book the Right Anchor for Your Corporate Event
11. Live Band vs DJ: Choosing Entertainment for a Corporate Event

**Cluster: Venue & Production**
12. What to Check Before Booking a Conference Venue (AV Checklist)
13. How Much Does Corporate Event Production Actually Cost?

**Cluster: Corporate Gifting**
14. Festival Corporate Gifting: Planning Diwali and Year-End Gifting at Scale

**Cluster: Event Rentals**
15. Event Equipment Rental Checklist: What to Confirm Before the Vendor Arrives

Three of the fifteen are complete, launch-ready articles in `src/content/blog.ts`. The remaining twelve are scoped and ready to write — add them to the same file following the existing `BlogPost` structure.

## 6. Local SEO Notes

- Location pages are generated from `src/config/site.ts` → `targetCities`. Only add cities where Sportzoo has genuine, useful local information to offer (venue familiarity, vendor relationships, or real service delivery) — do not mass-produce thin pages for SEO volume alone.
- Each location page includes locally-relevant content (venue considerations, service availability) rather than swapping only the city name into templated copy.
- Google Business Profile setup (not part of this codebase) should be completed for the primary city and any city with a physical presence, and linked from the Contact page once the Map URL is configured.
- Hire4Event-style city×category directory scale (dozens of cities × every service) was deliberately not replicated — see the scope decision in the project history. If demand later justifies it, add venue/artist/rental city pages the same way `corporate-event-management/[city]` was built, one category at a time, with genuinely unique local content per page.

## 7. Measurement

- Verify Search Console via `NEXT_PUBLIC_GSC_VERIFICATION` (see `.env.example` and README).
- Track conversion events (form submit, quote click, call click, WhatsApp click, email click, download click) via GA4/GTM — wired in `src/lib/analytics.ts` and fired from CTA components.
- Monitor `sitemap.xml` coverage and indexing status in Search Console monthly.
