import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { isPathHidden } from "@/lib/hiddenPages";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FinalCta } from "@/components/sections/FinalCta";
import { getPublishedEvents } from "@/lib/eventsData";

// ISR: served from cache; admin saves call revalidateSite() to push changes live immediately.
export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Upcoming Events | Elephant Corporate",
  description: "Register for upcoming Elephant Corporate events — corporate sports days, meetups, and community events across India.",
  path: "/events",
});

export default async function EventsPage() {
  if (await isPathHidden("/events")) notFound();

  const events = await getPublishedEvents();

  return (
    <>
      <Breadcrumbs items={[{ name: "Events", path: "/events" }]} />

      <section className="bg-[color:var(--color-navy-950)] py-14 text-white sm:py-20">
        <div className="container-page">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Upcoming Events
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Browse and register for events organised by Elephant Corporate.
          </p>
        </div>
      </section>

      <Section className="bg-white">
        {events.length === 0 ? (
          <p className="card p-6 text-sm">No events are open for registration right now — check back soon.</p>
        ) : (
          <>
            <SectionHeading eyebrow="Events" title="Register for an upcoming event" />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {events.map((ev) => (
                <Link
                  key={ev.slug}
                  href={`/events/${ev.slug}`}
                  className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] bg-slate-100">
                    {ev.coverImageUrl && (
                      <Image
                        src={ev.coverImageUrl}
                        alt={ev.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-muted m-0 text-xs font-semibold uppercase tracking-wide">
                      {ev.city}
                      {ev.eventDate ? ` · ${new Date(ev.eventDate).toLocaleDateString("en-IN", { dateStyle: "medium" })}` : ""}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-[color:var(--color-navy-900)]">{ev.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{ev.price > 0 ? `₹${ev.price} per attendee` : "Free"}</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </Section>

      <FinalCta />
    </>
  );
}
