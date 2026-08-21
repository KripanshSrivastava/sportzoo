import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { getServicePagesForCategory } from "@/lib/servicePagesData";
import type { ServiceCategory } from "@/config/services";

const VALID_CATEGORIES: ServiceCategory[] = ["corporate-events", "artist-booking", "venue-booking", "event-rentals"];

export async function ServicesGridBlock({
  eyebrow,
  title,
  description,
  category,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  category: string;
}) {
  if (!VALID_CATEGORIES.includes(category as ServiceCategory)) return null;
  const services = await getServicePagesForCategory(category as ServiceCategory);

  return (
    <Section className="bg-white">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/${category}/${s.slug}`}
            className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[color:var(--color-electric)] hover:shadow-lg"
          >
            <h3 className="text-base font-semibold text-[color:var(--color-navy-900)] group-hover:text-[color:var(--color-electric)]">
              {s.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{(s.intro[0] ?? "").slice(0, 110)}…</p>
            <span className="mt-4 inline-block text-sm font-semibold text-[color:var(--color-accent-dark)]">Learn more →</span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
