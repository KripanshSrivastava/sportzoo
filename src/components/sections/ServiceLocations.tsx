import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { targetCities, siteConfig } from "@/config/site";

export function ServiceLocations() {
  return (
    <Section className="bg-slate-50">
      <SectionHeading
        eyebrow="Where We Work"
        title="Service locations"
        description={`Headquartered in ${siteConfig.primaryCity}, with corporate event management, artist booking, venue booking, and event rentals delivered across India.`}
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {targetCities.map((c) => (
          <div key={c.slug} className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-semibold text-[color:var(--color-navy-900)]">{c.name}</h3>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <Link href={`/corporate-event-management/${c.slug}`} className="text-[color:var(--color-electric)] hover:underline">
                Corporate events →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
