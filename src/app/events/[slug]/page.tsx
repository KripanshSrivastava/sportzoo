import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { JsonLd, serviceJsonLd } from "@/components/seo/JsonLd";
import { EventRegistrationForm } from "@/components/forms/EventRegistrationForm";
import { getPublishedEventBySlug } from "@/lib/eventsData";

// ISR: served from cache; admin saves call revalidateSite() to push changes live immediately.
export const revalidate = 3600;

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

      {ev.coverImageUrl && (
        <div className="relative aspect-[21/9] w-full">
          <MediaFrame url={ev.coverImageUrl} alt={ev.title} sizes="100vw" priority />
        </div>
      )}

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

      {ev.galleryMediaUrls.length > 0 && (
        <Section className="bg-slate-50">
          <SectionHeading eyebrow="Gallery" title="Photos &amp; video" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ev.galleryMediaUrls.map((url, i) => (
              <div key={i} className="relative aspect-video overflow-hidden rounded-lg bg-slate-200">
                <MediaFrame url={url} alt={`${ev.title} — ${i + 1}`} sizes="(min-width: 640px) 33vw, 100vw" />
              </div>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
