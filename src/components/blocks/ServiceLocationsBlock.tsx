import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { getPublishedCities } from "@/lib/citiesData";

export async function ServiceLocationsBlock({ eyebrow, title }: { eyebrow?: string; title?: string }) {
  const cities = await getPublishedCities();

  return (
    <Section style={{ background: "var(--color-surface)" }}>
      <SectionHeading
        eyebrow={eyebrow || "Where We Work"}
        title={title || `${siteConfig.serviceArea} Service Coverage`}
        description={`Headquartered in ${siteConfig.primaryCity}, Elephant Corporate delivers corporate event management, artist booking, venue booking, and event rentals anywhere in India.`}
      />
      <div className="card mt-8 inline-flex items-center gap-2.5 px-4 py-2.5">
        <span className="tag tag-accent">Pan India</span>
        <span className="text-sm" style={{ color: "var(--color-neutral-700)" }}>
          No matter which city your event, venue, or booking is in — we cover it.
        </span>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((c) => (
          <div key={c.slug} className="card p-4">
            <h3 className="m-0 text-base font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
              {c.name}
            </h3>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <Link href={`/corporate-event-management/${c.slug}`} className="hover:underline">
                Corporate events →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
