import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FAQSection } from "@/components/sections/FAQSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { CallButton, QuoteButton, WhatsAppButton } from "@/components/cta/CtaLinks";
import { JsonLd, serviceJsonLd } from "@/components/seo/JsonLd";
import type { ServicePage, ServiceCategory } from "@/config/services";
import {
  corporateEventServices,
  artistBookingServices,
  venueBookingServices,
  eventRentalServices,
} from "@/config/services";
import { serviceOptions } from "@/lib/leadSchema";
import { placeholderPhoto } from "@/lib/placeholderImages";

// Nav labels are kept short; the lead form needs the exact enum value.
const formServiceNameBySlug: Record<string, (typeof serviceOptions)[number]> = {
  "corporate-offsite-planning": "Corporate Offsite Planning",
  "rewards-and-recognition-events": "Rewards and Recognition Events",
  "corporate-annual-day-management": "Corporate Annual Day",
  "corporate-sports-day-management": "Corporate Sports Day",
  "corporate-outings-and-team-building": "Corporate Outings and Team Building",
  "corporate-gifting": "Corporate Gifting",
  "conferences-and-corporate-meetings": "Conferences and Corporate Meetings",
  "live-music-and-dj-booking": "Live Music & DJ Booking",
  "anchors-and-emcees": "Anchors & Emcees",
  "speakers-comedians-and-specialty-acts": "Speakers, Comedians & Specialty Acts",
  "conference-and-meeting-venues": "Conference & Meeting Venues",
  "offsite-and-retreat-venues": "Offsite & Retreat Venues",
  "banquet-and-large-format-venues": "Banquet & Large-Format Venues",
  "audio-visual-and-production-equipment": "Audio Visual & Production Equipment",
  "event-decor-tent-and-branding": "Event Decor, Tent & Branding",
  "event-games-and-engagement-activities": "Event Games & Engagement Activities",
};

const parentLabelByCategory: Record<ServiceCategory, string> = {
  "corporate-events": "Corporate Events",
  "artist-booking": "Artist Booking & Entertainment",
  "venue-booking": "Venue Booking & Management",
  "event-rentals": "Event Rentals & Equipment",
};

const servicePoolByCategory: Record<ServiceCategory, ServicePage[]> = {
  "corporate-events": corporateEventServices,
  "artist-booking": artistBookingServices,
  "venue-booking": venueBookingServices,
  "event-rentals": eventRentalServices,
};

export function ServicePageTemplate({ service }: { service: ServicePage }) {
  const parentLabel = parentLabelByCategory[service.category];
  const formServiceName = formServiceNameBySlug[service.slug] ?? "Not sure / need advice";
  const path = `/${service.parentSlug}/${service.slug}`;
  const siblingPool = servicePoolByCategory[service.category];
  const related = siblingPool.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={serviceJsonLd({ name: service.name, description: service.metaDescription, path })} />
      <Breadcrumbs
        items={[
          { name: parentLabel, path: `/${service.parentSlug}` },
          { name: service.name, path },
        ]}
      />

      <section className="bg-[color:var(--color-navy-950)] py-14 text-white sm:py-20">
        <div className="container-page">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">{parentLabel}</p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {service.h1}
          </h1>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <QuoteButton />
            <WhatsAppButton pageLabel={service.name} variant="outline" size="lg" />
            <CallButton variant="outline" size="lg" />
          </div>
        </div>
      </section>

      <Section className="bg-white">
        <div className="prose-none max-w-3xl space-y-4 text-base leading-relaxed text-slate-700">
          {service.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50">
        <SectionHeading eyebrow="The Problem" title="Challenges companies face without a dedicated partner" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {service.problems.map((p) => (
            <li key={p} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
              <span aria-hidden="true" className="text-[color:var(--color-accent)]">✕</span>
              {p}
            </li>
          ))}
        </ul>
      </Section>

      <Section className="bg-white">
        <SectionHeading eyebrow="What's Included" title="Services and inclusions" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {service.inclusions.map((inc) => (
            <div key={inc.title} className="rounded-xl border border-slate-200 p-5">
              <h3 className="text-base font-semibold text-[color:var(--color-navy-900)]">{inc.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{inc.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50">
        <SectionHeading eyebrow="How It Works" title="Our planning and booking process" />
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {service.process.map((step, i) => (
            <li key={step.title} className="rounded-xl border border-slate-200 bg-white p-5">
              <span className="text-2xl font-bold text-[color:var(--color-accent)]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-sm font-semibold text-[color:var(--color-navy-900)]">{step.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{step.desc}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="bg-white">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Benefits" title={`Why choose Elephant Corporate for ${service.name.toLowerCase()}`} />
            <ul className="mt-6 space-y-3">
              {service.benefits.map((b) => (
                <li key={b} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                  <span aria-hidden="true" className="mt-0.5 text-emerald-600">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Use Cases" title="Suited for" />
            <ul className="mt-6 space-y-3">
              {service.useCases.map((u) => (
                <li key={u} className="rounded-lg bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <SectionHeading eyebrow="Gallery" title="Project examples" />
        {/* DEMO PHOTOS — replace with real project photography before launch */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={placeholderPhoto(`${service.slug}-${i}`, 500, 500)}
                alt={`${service.name} example ${i + 1}`}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      </Section>

      <FAQSection faqs={service.faqs} title={`FAQs about ${service.name.toLowerCase()}`} />

      <Section className="bg-white">
        <SectionHeading eyebrow="Related Services" title="You might also need" />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/${r.parentSlug}/${r.slug}`}
              className="rounded-lg border border-slate-200 p-5 text-sm font-semibold text-[color:var(--color-navy-900)] transition-colors hover:border-[color:var(--color-electric)] hover:text-[color:var(--color-electric)]"
            >
              {r.name} →
            </Link>
          ))}
        </div>
      </Section>

      <LeadFormSection defaultService={formServiceName} sourcePage={service.name} />
      <FinalCta pageLabel={service.name} title={`Let's plan your ${service.name.toLowerCase()}`} />
    </>
  );
}
