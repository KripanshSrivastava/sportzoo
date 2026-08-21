import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FAQSection } from "@/components/sections/FAQSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { QuoteButton, WhatsAppButton } from "@/components/cta/CtaLinks";
import { artistBookingServices } from "@/config/services";

export const metadata = buildMetadata({
  title: "Artist Booking & Entertainment for Corporate Events | Sportzoo",
  description:
    "Sportzoo books singers, bands, DJs, anchors, speakers, and comedians for corporate events — vetted, briefed, and coordinated end to end.",
  path: "/artist-booking",
});

const faqs = [
  {
    q: "What kinds of performers can Sportzoo book for corporate events?",
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

export default function ArtistBookingPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Artist Booking & Entertainment", path: "/artist-booking" }]} />

      <section className="bg-[color:var(--color-navy-950)] py-14 text-white sm:py-20">
        <div className="container-page">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Artist Booking & Entertainment for Corporate Events
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Sportzoo books singers, live bands, DJs, anchors, speakers, and comedians for corporate events —
            curated from a vetted talent network, briefed on your event, and coordinated end to end.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <QuoteButton />
            <WhatsAppButton pageLabel="artist booking" variant="outline" size="lg" />
          </div>
        </div>
      </section>

      <Section className="bg-white">
        <SectionHeading
          eyebrow="Our Talent Services"
          title="Every act, one booking team"
          description="Whichever performer or presenter you need, the same Sportzoo team handles shortlisting, contracting, technical requirements, and on-day coordination."
        />
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
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.intro[0].slice(0, 110)}…</p>
              <span className="mt-4 inline-block text-sm font-semibold text-[color:var(--color-accent-dark)]">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <FAQSection faqs={faqs} />
      <LeadFormSection sourcePage="Artist Booking" />
      <FinalCta pageLabel="artist booking" />
    </>
  );
}
