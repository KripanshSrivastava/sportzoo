import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FAQSection } from "@/components/sections/FAQSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { QuoteButton, WhatsAppButton } from "@/components/cta/CtaLinks";
import { venueBookingServices } from "@/config/services";

export const metadata = buildMetadata({
  title: "Corporate Venue Booking & Management | Elephant Corporate",
  description:
    "Elephant Corporate sources and books conference halls, offsite resorts, and banquet venues for corporate events — capacity and AV verified before you commit.",
  path: "/venue-booking",
});

const faqs = [
  {
    q: "What kinds of venues does Elephant Corporate book?",
    a: "Conference halls and meeting venues, offsite and retreat venues, and banquet or large-format venues — see each service page for details.",
  },
  {
    q: "Do you verify capacity and AV before booking?",
    a: "Yes, we verify usable capacity, AV, and connectivity before shortlisting a venue, not after you've committed.",
  },
  {
    q: "Can venue booking be combined with equipment and production?",
    a: "Yes — see our event rentals and equipment services for AV, decor, and production add-ons.",
  },
];

export default function VenueBookingPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Venue Booking & Management", path: "/venue-booking" }]} />

      <section className="bg-[color:var(--color-navy-950)] py-14 text-white sm:py-20">
        <div className="container-page">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Venue Booking & Management for Corporate Events
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Elephant Corporate sources and books conference halls, offsite resorts, and banquet venues — with capacity,
            AV, and access verified before you commit, and rates negotiated on your behalf.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <QuoteButton />
            <WhatsAppButton pageLabel="venue booking" variant="outline" size="lg" />
          </div>
        </div>
      </section>

      <Section className="bg-white">
        <SectionHeading
          eyebrow="Our Venue Services"
          title="Every venue type, one sourcing team"
          description="Whichever format you need, the same Elephant Corporate team verifies capacity and AV, negotiates rates, and coordinates the venue relationship through your event."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {venueBookingServices.map((s) => (
            <Link
              key={s.slug}
              href={`/venue-booking/${s.slug}`}
              className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[color:var(--color-electric)] hover:shadow-lg"
            >
              <h3 className="text-base font-semibold text-[color:var(--color-navy-900)] group-hover:text-[color:var(--color-electric)]">
                {s.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.intro[0].slice(0, 110)}…</p>
              <span className="mt-4 inline-block text-sm font-semibold text-[color:var(--color-accent-dark)]">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <FAQSection faqs={faqs} />
      <LeadFormSection sourcePage="Venue Booking" />
      <FinalCta pageLabel="venue booking" />
    </>
  );
}
