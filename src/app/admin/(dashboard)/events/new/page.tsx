"use client";

import { EventForm, emptyEvent } from "@/components/admin/EventForm";

export default function NewEventPage() {
  return (
    <div>
      <h1>New Event</h1>
      <EventForm initial={emptyEvent} />
    </div>
  );
}
