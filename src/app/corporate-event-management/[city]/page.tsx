import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FAQSection } from "@/components/sections/FAQSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { QuoteButton, WhatsAppButton } from "@/components/cta/CtaLinks";
import { targetCities } from "@/config/site";
import { corporateEventServices } from "@/config/services";

export function generateStaticParams() {
  return targetCities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityData = targetCities.find((c) => c.slug === city);
  if (!cityData) return {};
  return buildMetadata({
    title: `Corporate Event Organisers in ${cityData.name} | Sportzoo`,
    description: `Sportzoo plans and manages corporate events in ${cityData.name} — offsites, annual day, recognition ceremonies, and team building. Request a quote.`,
    path: `/corporate-event-management/${cityData.slug}`,
  });
}

export default async function CityEventPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityData = targetCities.find((c) => c.slug === city);
  if (!cityData) notFound();

  const faqs = [
    {
      q: `Does Sportzoo have local vendors and venues in ${cityData.name}?`,
      a: `Yes, we work with venues and vendors across ${cityData.name} and evaluate them against AV capability, capacity, and accessibility before shortlisting for your event.`,
    },
    {
      q: `Can you manage events for companies based outside ${cityData.name} who want to host an event there?`,
      a: `Yes, we regularly plan events in ${cityData.name} for companies headquartered elsewhere, including full logistics for outstation attendees.`,
    },
    {
      q: `What corporate event services are available in ${cityData.name}?`,
      a: "All our corporate event services — offsites, recognition ceremonies, annual day, sports day, team building, gifting, and conferences — are available in this city.",
    },
  ];

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Corporate Events", path: "/corporate-events" },
          { name: cityData.name, path: `/corporate-event-management/${cityData.slug}` },
        ]}
      />

      <section className="bg-[color:var(--color-navy-950)] py-14 text-white sm:py-20">
        <div className="container-page">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Corporate Event Organisers in {cityData.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Sportzoo plans and executes corporate events in {cityData.name} — offsites, annual day
            celebrations, recognition ceremonies, sports days, team building, and conferences — with local
            venue knowledge and full on-ground execution.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <QuoteButton label={`Get a Quote for ${cityData.name}`} />
            <WhatsAppButton pageLabel={`corporate events in ${cityData.name}`} variant="outline" size="lg" />
          </div>
        </div>
      </section>

      <Section className="bg-white">
        <SectionHeading
          eyebrow={`Corporate Events in ${cityData.name}`}
          title={`Why companies choose Sportzoo in ${cityData.name}`}
          description={`Planning an event in ${cityData.name} means navigating local venue availability, traffic and access considerations, and vendor reliability. Our team handles all three, whether you're a local company or planning a ${cityData.name} event from another city.`}
        />
      </Section>

      <Section className="bg-slate-50">
        <SectionHeading eyebrow="Services Available" title={`Corporate event services in ${cityData.name}`} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {corporateEventServices.map((s) => (
            <Link
              key={s.slug}
              href={`/corporate-events/${s.slug}`}
              className="rounded-lg border border-slate-200 bg-white p-4 text-sm font-semibold text-[color:var(--color-navy-900)] hover:border-[color:var(--color-electric)] hover:text-[color:var(--color-electric)]"
            >
              {s.name} in {cityData.name} →
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHeading
          eyebrow="Venue Considerations"
          title={`What to check before booking a venue in ${cityData.name}`}
        />
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
          <li>AV and connectivity capability matched to your session format.</li>
          <li>Accessibility from the airport or railway station for outstation attendees.</li>
          <li>Parking and ground transport for larger guest counts.</li>
          <li>Backup and contingency options for weather-dependent outdoor formats.</li>
        </ul>
      </Section>

      <FAQSection faqs={faqs} title={`FAQs about corporate events in ${cityData.name}`} />
      <LeadFormSection sourcePage={`Corporate Events – ${cityData.name}`} />
      <FinalCta pageLabel={`corporate events in ${cityData.name}`} />
    </>
  );
}
