import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { getPublishedCaseStudies } from "@/lib/caseStudiesData";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Our Work | Corporate Event Case Studies | Elephant Corporate",
  description: "Case studies from Elephant Corporate's corporate event, artist booking, and venue booking engagements.",
  path: "/case-studies",
  noIndex: true,
});

export default async function CaseStudiesPage() {
  const caseStudies = await getPublishedCaseStudies();

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
        {caseStudies.length === 0 ? (
          <div className="max-w-2xl">
            <SectionHeading eyebrow="Our Work" title="Case studies are on the way" />
            <p className="text-muted mt-3 text-[15px]">
              We&apos;re preparing a set of recent engagements to share here. In the meantime, tell us about your
              requirement and we&apos;ll walk you through comparable work on a call.
            </p>
          </div>
        ) : (
          <div className="mt-2 grid gap-6 md:grid-cols-3">
            {caseStudies.map((c) => (
            <Link
              key={c.slug}
              href={`/case-studies/${c.slug}`}
              className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[16/10] bg-slate-100">
                {c.coverImageUrl && (
                  <Image
                    src={c.coverImageUrl}
                    alt={c.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                    unoptimized
                  />
                )}
              </div>
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
        )}
      </Section>

      <LeadFormSection sourcePage="Our Work" />
      <FinalCta />
    </>
  );
}
