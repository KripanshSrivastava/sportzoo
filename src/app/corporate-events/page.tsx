import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FAQSection } from "@/components/sections/FAQSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { QuoteButton, WhatsAppButton } from "@/components/cta/CtaLinks";
import { corporateEventServices } from "@/config/services";
import { siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: "Corporate Event Management Company | Sportzoo",
  description:
    "Sportzoo is a corporate event management company handling offsites, annual day, recognition ceremonies, sports days, team building, gifting, and conferences — end to end.",
  path: "/corporate-events",
});

const faqs = [
  {
    q: "What types of corporate events does Sportzoo manage?",
    a: "Corporate offsites, rewards and recognition ceremonies, annual day events, corporate sports days, team-building outings, corporate gifting, and conferences or meetings — see each service page for details.",
  },
  {
    q: "Can you handle events for both small teams and large organisations?",
    a: "Yes, we plan events from 15-person leadership offsites to company-wide gatherings of several hundred people.",
  },
  {
    q: `Do you organise corporate events outside ${siteConfig.primaryCity}?`,
    a: "Yes, we plan and execute events across India, and can coordinate outstation logistics as part of the engagement.",
  },
  {
    q: "Can you also book the venue, entertainment, and equipment for our event?",
    a: "Yes — see our venue booking, artist booking, and event rentals services, which we frequently combine with event planning for offsites, annual day, and conferences.",
  },
];

export default function CorporateEventsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Corporate Events", path: "/corporate-events" }]} />

      <section className="bg-[color:var(--color-navy-950)] py-14 text-white sm:py-20">
        <div className="container-page">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Corporate Event Management, Planned Around What Your Company Actually Needs
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            From leadership offsites to company-wide annual day celebrations, Sportzoo plans and executes
            corporate events end to end — venue, logistics, production, and on-ground management — so your
            HR and admin teams can focus on the outcome, not the operations.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <QuoteButton />
            <WhatsAppButton pageLabel="corporate events" variant="outline" size="lg" />
          </div>
        </div>
      </section>

      <Section className="bg-white">
        <SectionHeading
          eyebrow="Our Event Services"
          title="Every corporate event, one planning team"
          description="Each service below is planned and executed by the same Sportzoo team, so venue, catering, production, and logistics stay consistent across every event you run with us."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {corporateEventServices.map((s) => (
            <Link
              key={s.slug}
              href={`/corporate-events/${s.slug}`}
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

      <Section className="bg-slate-50">
        <SectionHeading
          eyebrow="Why Sportzoo"
          title="A planning process built for corporate accountability"
          description="Every engagement follows the same structure: a discovery call, a costed proposal within 24–48 hours, confirmed planning, on-ground execution, and a post-event report — so procurement and finance always know where things stand."
        />
      </Section>

      <FAQSection faqs={faqs} />
      <LeadFormSection sourcePage="Corporate Events" />
      <FinalCta pageLabel="corporate events" />
    </>
  );
}
