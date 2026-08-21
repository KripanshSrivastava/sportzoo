import { notFound } from "next/navigation";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd, serviceJsonLd } from "@/components/seo/JsonLd";
import { EventRegistrationForm } from "@/components/forms/EventRegistrationForm";
import { getPublishedEventBySlug } from "@/lib/eventsData";
import { placeholderPhoto } from "@/lib/placeholderImages";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ev = await getPublishedEventBySlug(slug);
  if (!ev) return {};
  return buildMetadata({
    title: `${ev.title} | Elephant Corporate`,
    description: ev.description || `Register for ${ev.title} in ${ev.city}, organised by Elephant Corporate.`,
    path: `/events/${ev.slug}`,
  });
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ev = await getPublishedEventBySlug(slug);
  if (!ev) notFound();

  const dateLabel = ev.eventDate
    ? new Date(ev.eventDate).toLocaleDateString("en-IN", { dateStyle: "long" })
    : null;

  return (
    <>
      <Breadcrumbs items={[{ name: "Events", path: "/events" }, { name: ev.title, path: `/events/${ev.slug}` }]} />
      <JsonLd
        data={serviceJsonLd({
          name: ev.title,
          description: ev.description || ev.title,
          path: `/events/${ev.slug}`,
        })}
      />

      <section className="bg-[color:var(--color-navy-950)] py-14 text-white sm:py-20">
        <div className="container-page">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">
            {ev.city}
            {dateLabel ? ` · ${dateLabel}` : ""}
            {ev.eventTime ? ` · ${ev.eventTime}` : ""}
          </p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{ev.title}</h1>
          {ev.venue && <p className="mt-4 max-w-2xl text-slate-300">{ev.venue}</p>}
        </div>
      </section>

      <div className="relative aspect-[21/9] w-full">
        <Image
          src={ev.coverImageUrl || placeholderPhoto(`${ev.slug}-hero`, 1400, 600)}
          alt={ev.title}
          fill
          sizes="100vw"
          className="object-cover"
          unoptimized
        />
      </div>

      <Section className="bg-white">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="About" title="About this event" />
            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-700">{ev.description}</p>
            <p className="mt-6 text-sm font-semibold text-[color:var(--color-navy-900)]">
              {ev.price > 0 ? `₹${ev.price} per attendee` : "Free to attend"}
              {ev.capacity ? ` · Limited to ${ev.capacity} attendees` : ""}
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Register" title={ev.registrationOpen ? "Reserve your spot" : "Registration closed"} />
            <div className="mt-4">
              {ev.registrationOpen ? (
                <EventRegistrationForm event={ev} />
              ) : (
                <p className="card p-6 text-sm">
                  Registration for this event is currently closed. Contact us if you&apos;d like to be notified when it
                  reopens.
                </p>
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
