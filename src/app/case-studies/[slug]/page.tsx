import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { getPublishedCaseStudyBySlug } from "@/lib/caseStudiesData";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getPublishedCaseStudyBySlug(slug);
  if (!c) return {};
  return buildMetadata({ title: `${c.title} | Elephant Corporate`, description: c.summary, path: `/case-studies/${c.slug}`, noIndex: true });
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getPublishedCaseStudyBySlug(slug);
  if (!c) notFound();

  return (
    <>
      <Breadcrumbs items={[{ name: "Our Work", path: "/case-studies" }, { name: c.title, path: `/case-studies/${c.slug}` }]} />

      <section className="bg-[color:var(--color-navy-950)] py-14 text-white sm:py-20">
        <div className="container-page">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">{c.category}</p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{c.title}</h1>
          <p className="mt-4 max-w-2xl text-slate-300">{c.clientDescriptor}</p>
        </div>
      </section>

      {c.coverImageUrl && (
        <div className="relative aspect-[21/9] w-full">
          <MediaFrame url={c.coverImageUrl} alt={c.title} sizes="100vw" priority />
        </div>
      )}

      <Section className="bg-white">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Challenge" title="The challenge" />
            <p className="mt-4 text-sm leading-relaxed text-slate-700">{c.challenge}</p>
          </div>
          <div>
            <SectionHeading eyebrow="Solution" title="Our solution" />
            <p className="mt-4 text-sm leading-relaxed text-slate-700">{c.solution}</p>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <SectionHeading eyebrow="Execution" title="How it came together" />
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-700">{c.execution}</p>
      </Section>

      <Section className="bg-white">
        <SectionHeading eyebrow="Outcomes" title="Results" />
        <ul className="mt-6 space-y-2">
          {c.outcomes.map((o) => (
            <li key={o} className="flex gap-3 text-sm text-slate-700">
              <span className="text-emerald-600" aria-hidden="true">✓</span>
              {o}
            </li>
          ))}
        </ul>
        {c.testimonial && (
          <figure className="mt-8 max-w-2xl rounded-xl border border-slate-200 bg-slate-50 p-6">
            <blockquote className="text-sm italic text-slate-600">&ldquo;{c.testimonial.quote}&rdquo;</blockquote>
            <figcaption className="mt-3 text-sm font-semibold text-[color:var(--color-navy-900)]">
              {c.testimonial.attribution}
            </figcaption>
          </figure>
        )}
      </Section>

      {c.galleryMediaUrls.length > 0 && (
        <Section className="bg-slate-50">
          <SectionHeading eyebrow="Gallery" title="From the event" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {c.galleryMediaUrls.map((url, i) => (
              <div key={i} className="relative aspect-video overflow-hidden rounded-lg bg-slate-200">
                <MediaFrame url={url} alt={`${c.title} — ${i + 1}`} sizes="(min-width: 640px) 50vw, 100vw" />
              </div>
            ))}
          </div>
        </Section>
      )}

      <LeadFormSection sourcePage={c.title} />
      <FinalCta />
    </>
  );
}
