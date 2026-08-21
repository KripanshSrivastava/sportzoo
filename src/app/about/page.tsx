import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: "About Sportzoo | Corporate Event Management Company",
  description:
    "Sportzoo is a corporate event management company built for HR, admin, and founders' teams who need one accountable partner for events, artists, venues, and rentals — not five vendors.",
  path: "/about",
});

const values = [
  {
    title: "Accountability over hand-offs",
    desc: "One team owns your event from brief to bill — we don't sub-contract the parts that are hard to coordinate.",
  },
  {
    title: "Transparent costing",
    desc: "Every proposal is itemised. You know exactly what you're paying for at venue, artist, and production level.",
  },
  {
    title: "Built for corporate process",
    desc: "GST-compliant invoicing, structured proposals, and documentation that works with how procurement and finance teams actually operate.",
  },
  {
    title: "On-ground, not just on paper",
    desc: "A Sportzoo coordinator is physically present at every event we manage.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "About", path: "/about" }]} />

      <section className="bg-[color:var(--color-navy-950)] py-14 text-white sm:py-20">
        <div className="container-page">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            About Sportzoo
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Sportzoo exists because corporate events are usually planned by people whose actual job is
            something else — HR, admin, or the founder&apos;s office. We take that work off your plate, end
            to end.
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="max-w-3xl space-y-5 text-base leading-relaxed text-slate-700">
          <p>
            Sportzoo is a corporate event management company serving companies across{" "}
            {siteConfig.primaryCity} and India. We work with HR managers, admin teams, founders, office
            managers, and procurement teams who need a single, accountable partner — not a list of vendors to
            coordinate independently.
          </p>
          <p>
            Our work spans four connected disciplines: corporate events (offsites, recognition ceremonies,
            annual day, sports days, team building, gifting, and conferences), artist booking and
            entertainment, venue booking and management, and event rentals and equipment. Because all four
            sit under one team, an offsite that needs a venue and entertainment, or a conference that needs
            AV production, is planned as one engagement — not handed off between separate agencies.
          </p>
          <p>
            We built Sportzoo around what corporate clients actually need from an events partner: fast,
            costed proposals; transparent line-item pricing; a dedicated point of contact; and on-ground
            execution that doesn&apos;t require your team to manage the day itself.
          </p>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <SectionHeading eyebrow="How We Work" title="What we stand for" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-base font-semibold text-[color:var(--color-navy-900)]">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <SectionHeading eyebrow="Founder" title={`Led by ${siteConfig.ownerName}`} />
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
          Sportzoo is run by {siteConfig.ownerName}, who oversees every engagement personally — from the
          first call through final execution — so clients have one accountable point of contact throughout.
        </p>
      </Section>

      <LeadFormSection sourcePage="About" />
      <FinalCta />
    </>
  );
}
