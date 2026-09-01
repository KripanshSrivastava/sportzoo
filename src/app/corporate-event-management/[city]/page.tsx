import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { isVideoUrl } from "@/lib/media";
import { FAQSection } from "@/components/sections/FAQSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { QuoteButton, WhatsAppButton } from "@/components/cta/CtaLinks";
import { getPublishedCityBySlug } from "@/lib/citiesData";
import { getServicePagesForCategory } from "@/lib/servicePagesData";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityData = await getPublishedCityBySlug(city);
  if (!cityData) return {};
  return buildMetadata({
    title: `Corporate Event Organisers in ${cityData.name} | Elephant Corporate`,
    description: `Elephant Corporate plans and manages corporate events in ${cityData.name} — offsites, annual day, recognition ceremonies, and team building. Request a quote.`,
    path: `/corporate-event-management/${cityData.slug}`,
  });
}

export default async function CityEventPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityData = await getPublishedCityBySlug(city);
  if (!cityData) notFound();
  const corporateEventServices = await getServicePagesForCategory("corporate-events");

  const faqs = [
    {
      q: `Does Elephant Corporate have local vendors and venues in ${cityData.name}?`,
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

      <section className="relative overflow-hidden bg-[color:var(--color-navy-950)] py-14 text-white sm:py-20">
        {cityData.heroImageUrl && !isVideoUrl(cityData.heroImageUrl) && (
          <>
            <Image src={cityData.heroImageUrl} alt="" fill sizes="100vw" className="object-cover opacity-30" priority unoptimized />
            <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-navy-950)] via-[color:var(--color-navy-950)]/85 to-transparent" />
          </>
        )}
        <div className="container-page relative">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Corporate Event Organisers in {cityData.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Elephant Corporate plans and executes corporate events in {cityData.name} — offsites, annual day
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
          title={`Why companies choose Elephant Corporate in ${cityData.name}`}
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

      {cityData.heroImageUrl && isVideoUrl(cityData.heroImageUrl) && (
        <div className="relative aspect-video w-full bg-black">
          <MediaFrame url={cityData.heroImageUrl} alt={cityData.name} sizes="100vw" />
        </div>
      )}

      {cityData.galleryMediaUrls.length > 0 && (
        <Section className="bg-slate-50">
          <SectionHeading eyebrow="Gallery" title={`Our work in ${cityData.name}`} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cityData.galleryMediaUrls.map((url, i) => (
              <div key={i} className="relative aspect-video overflow-hidden rounded-lg bg-slate-200">
                <MediaFrame url={url} alt={`${cityData.name} — ${i + 1}`} sizes="(min-width: 640px) 33vw, 100vw" />
              </div>
            ))}
          </div>
        </Section>
      )}

      <FAQSection faqs={faqs} title={`FAQs about corporate events in ${cityData.name}`} />
      <LeadFormSection sourcePage={`Corporate Events – ${cityData.name}`} />
      <FinalCta pageLabel={`corporate events in ${cityData.name}`} />
    </>
  );
}
