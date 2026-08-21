import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FAQSection } from "@/components/sections/FAQSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { QuoteButton, WhatsAppButton } from "@/components/cta/CtaLinks";
import { eventRentalServices } from "@/config/services";

export const metadata = buildMetadata({
  title: "Event Rentals & Equipment for Corporate Events | Elephant Corporate",
  description:
    "Elephant Corporate rents and manages AV equipment, decor and branding, and engagement activities for corporate events — staffed on-site, not just dropped off.",
  path: "/event-rentals",
});

const faqs = [
  {
    q: "What kinds of equipment and services does Elephant Corporate rent?",
    a: "Audio visual and production equipment, decor/tent/branding, and event games and engagement activities — see each service page for details.",
  },
  {
    q: "Does rental include staff to operate the equipment?",
    a: "Yes, our rentals include on-site technicians or attendants, not just equipment drop-off.",
  },
  {
    q: "Can event rentals be booked for a venue you didn't source for us?",
    a: "Yes, equipment and production services can be booked independently of who booked the venue.",
  },
];

export default function EventRentalsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Event Rentals & Equipment", path: "/event-rentals" }]} />

      <section className="bg-[color:var(--color-navy-950)] py-14 text-white sm:py-20">
        <div className="container-page">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Event Rentals & Equipment for Corporate Events
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Elephant Corporate rents and manages AV equipment, decor and branding, and engagement activities for
            corporate events — staffed on-site through setup, the live event, and teardown.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <QuoteButton />
            <WhatsAppButton pageLabel="event rentals and equipment" variant="outline" size="lg" />
          </div>
        </div>
      </section>

      <Section className="bg-white">
        <SectionHeading
          eyebrow="Our Rental Services"
          title="Every rental category, one production team"
          description="Whichever equipment or activity you need, the same Elephant Corporate team handles sourcing, setup, on-site staffing, and teardown."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {eventRentalServices.map((s) => (
            <Link
              key={s.slug}
              href={`/event-rentals/${s.slug}`}
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
      <LeadFormSection sourcePage="Event Rentals & Equipment" />
      <FinalCta pageLabel="event rentals and equipment" />
    </>
  );
}
