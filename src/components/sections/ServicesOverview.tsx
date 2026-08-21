import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { corporateEventServices, artistBookingServices, venueBookingServices, eventRentalServices } from "@/config/services";

function CategoryCard({ title, blurb, size = "md" }: { title: string; blurb: string; size?: "md" | "sm" }) {
  return (
    <div className="card elev-sm p-3.5">
      <p className="card-title" style={size === "sm" ? { fontSize: "15px" } : undefined}>
        {title}
      </p>
      <p className="card-body">{blurb}</p>
    </div>
  );
}

export function ServicesOverview() {
  const events = corporateEventServices.slice(0, 4);
  const [artist1, artist2, artist3] = artistBookingServices;
  const venues = venueBookingServices;
  const rentals = eventRentalServices;

  return (
    <Section className="bg-transparent">
      <h6 style={{ color: "var(--color-accent-700)" }}>What We Do</h6>
      <h2 className="mt-1.5 max-w-xl">Four disciplines, one accountable partner</h2>
      <p className="text-muted max-w-xl text-[15px]">
        Sportzoo plans corporate events end to end and books the artists, venues, and equipment behind them —
        so your event is planned by one team, not stitched together across separate vendors.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        {/* PLAN */}
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="tag tag-accent">Plan</span>
              <h3 className="m-0 text-[19px]">Corporate Events</h3>
            </div>
            <Link href="/corporate-events" className="text-[13px] font-semibold">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {events.map((s) => (
              <Link key={s.slug} href={`/corporate-events/${s.slug}`} className="block">
                <CategoryCard title={s.name} blurb={s.intro[0].slice(0, 100) + "…"} />
              </Link>
            ))}
          </div>
        </div>

        {/* PERFORM */}
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="tag tag-accent-2">Perform</span>
              <h3 className="m-0 text-[19px]">Artist Booking &amp; Entertainment</h3>
            </div>
            <Link href="/artist-booking" className="text-[13px] font-semibold">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <Link href={`/artist-booking/${artist1.slug}`} className="block">
              <CategoryCard title={artist1.name} blurb={artist1.intro[0].slice(0, 100) + "…"} />
            </Link>
            <Link href={`/artist-booking/${artist2.slug}`} className="block">
              <CategoryCard title={artist2.name} blurb={artist2.intro[0].slice(0, 100) + "…"} />
            </Link>
            <Link href={`/artist-booking/${artist3.slug}`} className="block sm:col-span-2">
              <CategoryCard title={artist3.name} blurb={artist3.intro[0].slice(0, 130) + "…"} />
            </Link>
          </div>
        </div>

        {/* HOST */}
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="tag tag-accent">Host</span>
              <h3 className="m-0 text-[19px]">Venue Booking &amp; Management</h3>
            </div>
            <Link href="/venue-booking" className="text-[13px] font-semibold">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
            {venues.map((s) => (
              <Link key={s.slug} href={`/venue-booking/${s.slug}`} className="block">
                <CategoryCard title={s.name} blurb={s.intro[0].slice(0, 60) + "…"} size="sm" />
              </Link>
            ))}
          </div>
        </div>

        {/* EQUIP */}
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="tag tag-accent-2">Equip</span>
              <h3 className="m-0 text-[19px]">Event Rentals &amp; Equipment</h3>
            </div>
            <Link href="/event-rentals" className="text-[13px] font-semibold">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
            {rentals.map((s) => (
              <Link key={s.slug} href={`/event-rentals/${s.slug}`} className="block">
                <CategoryCard title={s.name} blurb={s.intro[0].slice(0, 60) + "…"} size="sm" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
