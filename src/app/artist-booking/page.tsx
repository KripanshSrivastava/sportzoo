import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FAQSection } from "@/components/sections/FAQSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { QuoteButton, WhatsAppButton } from "@/components/cta/CtaLinks";
import { getServicePagesForCategory } from "@/lib/servicePagesData";
import { getPageContent, textOr, listOr } from "@/lib/pageContent";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Artist Booking & Entertainment for Corporate Events | Elephant Corporate",
  description:
    "Elephant Corporate books singers, bands, DJs, anchors, speakers, and comedians for corporate events — vetted, briefed, and coordinated end to end.",
  path: "/artist-booking",
});

const defaultFaqs = [
  {
    q: "What kinds of performers can Elephant Corporate book for corporate events?",
    a: "Live singers and bands, DJs, anchors and emcees, motivational speakers, stand-up comedians, and specialty acts — see each service page for details.",
  },
  {
    q: "Are the performers verified for corporate event experience?",
    a: "Yes, we work from a vetted talent network and screen for corporate-appropriate content and prior corporate event experience.",
  },
  {
    q: "Can artist booking be combined with an event you're managing for us?",
    a: "Yes — this is common for annual day, recognition ceremonies, and conferences we manage end to end.",
  },
];

export default async function ArtistBookingPage() {
  const artistBookingServices = await getServicePagesForCategory("artist-booking");
  const content = await getPageContent("artist-booking-overview");
  const heroTitle = textOr(content, "heroTitle", "Artist Booking & Entertainment for Corporate Events");
  const heroDescription = textOr(
    content,
    "heroDescription",
    "Elephant Corporate books singers, live bands, DJs, anchors, speakers, and comedians for corporate events — curated from a vetted talent network, briefed on your event, and coordinated end to end."
  );
  const servicesEyebrow = textOr(content, "servicesEyebrow", "Our Talent Services");
  const servicesTitle = textOr(content, "servicesTitle", "Every act, one booking team");
  const servicesDescription = textOr(
    content,
    "servicesDescription",
    "Whichever performer or presenter you need, the same Elephant Corporate team handles shortlisting, contracting, technical requirements, and on-day coordination."
  );
  const whyEyebrow = textOr(content, "whyEyebrow", "");
  const whyTitle = textOr(content, "whyTitle", "");
  const whyDescription = textOr(content, "whyDescription", "");
  const faqs = listOr(content, "faqs", defaultFaqs);

  return (
    <>
      <Breadcrumbs items={[{ name: "Artist Booking & Entertainment", path: "/artist-booking" }]} />

      <section className="bg-[color:var(--color-navy-950)] py-14 text-white sm:py-20">
        <div className="container-page">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">{heroDescription}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <QuoteButton />
            <WhatsAppButton pageLabel="artist booking" variant="outline" size="lg" />
          </div>
        </div>
      </section>

      <Section className="bg-white">
        <SectionHeading eyebrow={servicesEyebrow} title={servicesTitle} description={servicesDescription} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artistBookingServices.map((s) => (
            <Link
              key={s.slug}
              href={`/artist-booking/${s.slug}`}
              className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[color:var(--color-electric)] hover:shadow-lg"
            >
              <h3 className="text-base font-semibold text-[color:var(--color-navy-900)] group-hover:text-[color:var(--color-electric)]">
                {s.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.intro[0]?.slice(0, 110)}…</p>
              <span className="mt-4 inline-block text-sm font-semibold text-[color:var(--color-accent-dark)]">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {whyEyebrow && (
        <Section className="bg-slate-50">
          <SectionHeading eyebrow={whyEyebrow} title={whyTitle} description={whyDescription} />
        </Section>
      )}

      <FAQSection faqs={faqs} />
      <LeadFormSection sourcePage="Artist Booking" />
      <FinalCta pageLabel="artist booking" />
    </>
  );
}
