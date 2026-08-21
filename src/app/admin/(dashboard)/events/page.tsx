"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { EventRecord } from "@/lib/eventsData";

export default function AdminEventsPage() {
  const [items, setItems] = useState<EventRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  function load() {
    fetch("/api/admin/events")
      .then((r) => r.json())
      .then((data) => setItems(data.events))
      .catch(() => setError("Couldn't load events."));
  }

  useEffect(load, []);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This also deletes all its registrations and can't be undone.`)) return;
    const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="m-0">Events</h1>
          <p className="text-muted text-sm">
            Standalone event pages (e.g. a city sports day) with their own registration form.
          </p>
        </div>
        <Link href="/admin/events/new" className="btn btn-primary">
          + New Event
        </Link>
      </div>

      {error && <p style={{ color: "#b3261e" }}>{error}</p>}

      {!items ? (
        <p className="text-muted text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <p className="card p-6 text-sm">No events yet. Create your first one above.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((ev) => (
            <div key={ev.id} className="card flex items-center justify-between p-4">
              <div>
                <p className="m-0 text-sm font-semibold">
                  {ev.title} {!ev.published && <span className="text-muted">(unpublished)</span>}
                </p>
                <p className="text-muted m-0 text-xs">
                  /events/{ev.slug} · {ev.city || "No city set"} · {ev.price > 0 ? `₹${ev.price}` : "Free"}
                  {!ev.registrationOpen && " · registration closed"}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/events/${ev.id}/registrations`} className="btn btn-secondary">
                  Registrations
                </Link>
                <Link href={`/admin/events/${ev.id}`} className="btn btn-secondary">
                  Edit
                </Link>
                <button type="button" className="btn btn-secondary" onClick={() => handleDelete(ev.id, ev.title)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
