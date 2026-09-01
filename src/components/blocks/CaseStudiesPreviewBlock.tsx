import Link from "next/link";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getPublishedCaseStudies } from "@/lib/caseStudiesData";

export async function CaseStudiesPreviewBlock({ eyebrow, title }: { eyebrow?: string; title?: string }) {
  const caseStudies = await getPublishedCaseStudies();
  if (caseStudies.length === 0) return null;

  return (
    <Section className="bg-slate-50">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow={eyebrow || "Our Work"} title={title || "Recent engagements"} />
        <Link href="/case-studies" className="text-sm font-semibold text-[color:var(--color-electric)]">
          View all case studies →
        </Link>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {caseStudies.slice(0, 3).map((c) => (
          <Link
            key={c.slug}
            href={`/case-studies/${c.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-[16/10] bg-slate-100">
              {c.coverImageUrl && (
                <Image
                  src={c.coverImageUrl}
                  alt={c.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform group-hover:scale-105"
                  unoptimized
                />
              )}
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-accent-dark)]">{c.category}</p>
              <h3 className="mt-2 text-base font-semibold text-[color:var(--color-navy-900)] group-hover:text-[color:var(--color-electric)]">
                {c.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{c.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
