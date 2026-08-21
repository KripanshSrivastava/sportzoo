import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { corporateEventServices, artistBookingServices, venueBookingServices, eventRentalServices } from "@/config/services";

function ServiceCard({ href, name, blurb }: { href: string; name: string; blurb: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[color:var(--color-electric)] hover:shadow-lg"
    >
      <h3 className="text-base font-semibold text-[color:var(--color-navy-900)] group-hover:text-[color:var(--color-electric)]">
        {name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{blurb}</p>
      <span className="mt-4 text-sm font-semibold text-[color:var(--color-accent-dark)]">Learn more →</span>
    </Link>
  );
}

const categories = [
  { key: "corporate-events", label: "Corporate Events", href: "/corporate-events", services: corporateEventServices },
  { key: "artist-booking", label: "Artist Booking & Entertainment", href: "/artist-booking", services: artistBookingServices },
  { key: "venue-booking", label: "Venue Booking & Management", href: "/venue-booking", services: venueBookingServices },
  { key: "event-rentals", label: "Event Rentals & Equipment", href: "/event-rentals", services: eventRentalServices },
];

export function ServicesOverview() {
  return (
    <Section className="bg-white">
      <SectionHeading
        eyebrow="What We Do"
        title="Four disciplines, one accountable partner"
        description="Sportzoo plans corporate events end to end and books the artists, venues, and equipment behind them — so your event is planned by one team, not stitched together across separate vendors."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {categories.map((cat) => (
          <div key={cat.key}>
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[color:var(--color-navy-900)]">{cat.label}</h3>
              <Link href={cat.href} className="text-sm font-semibold text-[color:var(--color-electric)]">
                View all
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {cat.services.slice(0, 4).map((s) => (
                <ServiceCard
                  key={s.slug}
                  href={`/${s.parentSlug}/${s.slug}`}
                  name={s.name}
                  blurb={s.intro[0].slice(0, 96) + "…"}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
