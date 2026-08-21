import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { caseStudies } from "@/content/caseStudies";

export const metadata = buildMetadata({
  title: "Our Work | Corporate Event Case Studies | Sportzoo",
  description: "Case studies from Sportzoo's corporate event, artist booking, and venue booking engagements.",
  path: "/case-studies",
  noIndex: true,
});

export default function CaseStudiesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Our Work", path: "/case-studies" }]} />

      <section className="bg-[color:var(--color-navy-950)] py-14 text-white sm:py-20">
        <div className="container-page">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Our Work
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            A look at how we approach corporate event, artist booking, and venue booking engagements from
            brief to execution.
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <SectionHeading
          eyebrow="Note"
          title="Case studies are being finalised"
          description="The entries below are structural templates awaiting real client work and permission to publish. Once completed engagements are confirmed for publication, they will replace this placeholder content — see each entry's fields for what's pending."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {caseStudies.map((c) => (
            <Link
              key={c.slug}
              href={`/case-studies/${c.slug}`}
              className="flex flex-col overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50 transition-shadow hover:shadow-md"
            >
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-accent-dark)]">
                  {c.category}
                </p>
                <h3 className="mt-2 text-base font-semibold text-[color:var(--color-navy-900)]">{c.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{c.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <LeadFormSection sourcePage="Our Work" />
      <FinalCta />
    </>
  );
}
