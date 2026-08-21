"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { EventRegistrationRecord } from "@/lib/eventsData";

const STATUS_OPTIONS = ["pending", "free", "paid", "failed"] as const;

export default function EventRegistrationsPage() {
  const params = useParams<{ id: string }>();
  const [items, setItems] = useState<EventRegistrationRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  function load() {
    fetch(`/api/admin/events/${params.id}/registrations`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.ok) {
          setError(data.message ?? "Couldn't load registrations.");
          return;
        }
        setItems(data.registrations);
      })
      .catch(() => setError("Couldn't load registrations."));
  }

  useEffect(load, [params.id]);

  async function updateStatus(registrationId: string, paymentStatus: string) {
    const res = await fetch(`/api/admin/events/${params.id}/registrations`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ registrationId, paymentStatus }),
    });
    if (res.ok) load();
  }

  async function handleDelete(registrationId: string, name: string) {
    if (!confirm(`Delete the registration for "${name}"? This can't be undone.`)) return;
    const res = await fetch(
      `/api/admin/events/${params.id}/registrations?registrationId=${registrationId}`,
      { method: "DELETE" }
    );
    if (res.ok) load();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="m-0">Registrations</h1>
          <p className="text-muted text-sm">Everyone who has registered for this event.</p>
        </div>
        <Link href="/admin/events" className="btn btn-secondary">
          ← Back to Events
        </Link>
      </div>

      {error && <p style={{ color: "#b3261e" }}>{error}</p>}

      {!items ? (
        <p className="text-muted text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <p className="card p-6 text-sm">No registrations yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((r) => (
            <div key={r.id} className="card flex items-center justify-between gap-4 p-4">
              <div>
                <p className="m-0 text-sm font-semibold">{r.fullName}</p>
                <p className="text-muted m-0 text-xs">
                  {r.email} · {r.phone}
                  {r.companyName && ` · ${r.companyName}`} · {r.attendeeCount} attendee(s)
                </p>
                {r.notes && <p className="text-muted m-0 mt-1 text-xs italic">&quot;{r.notes}&quot;</p>}
                {r.amount > 0 && (
                  <p className="m-0 mt-1 text-xs font-medium">
                    {r.currency} {r.amount}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <select
                  className="input"
                  value={r.paymentStatus}
                  onChange={(e) => updateStatus(r.id, e.target.value)}
                  style={{ width: "auto" }}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <button type="button" className="btn btn-secondary" onClick={() => handleDelete(r.id, r.fullName)}>
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
