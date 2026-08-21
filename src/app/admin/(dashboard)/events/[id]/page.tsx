"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { EventForm, type EventFormValues } from "@/components/admin/EventForm";

export default function EditEventPage() {
  const params = useParams<{ id: string }>();
  const [initial, setInitial] = useState<EventFormValues | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/events/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.ok) {
          setError(data.message ?? "Not found.");
          return;
        }
        const ev = data.event;
        setInitial({
          id: ev.id,
          slug: ev.slug,
          title: ev.title,
          city: ev.city ?? "",
          venue: ev.venue ?? "",
          eventDate: ev.event_date ?? "",
          eventTime: ev.event_time ?? "",
          description: ev.description ?? "",
          coverImageUrl: ev.cover_image_url ?? "",
          price: Number(ev.price ?? 0),
          capacity: ev.capacity == null ? "" : String(ev.capacity),
          registrationOpen: ev.registration_open,
          published: ev.published,
        });
      })
      .catch(() => setError("Couldn't load this event."));
  }, [params.id]);

  return (
    <div>
      <h1>Edit Event</h1>
      {error && <p style={{ color: "#b3261e" }}>{error}</p>}
      {!initial && !error && <p className="text-muted text-sm">Loading…</p>}
      {initial && <EventForm initial={initial} />}
    </div>
  );
}
