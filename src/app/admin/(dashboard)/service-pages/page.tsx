"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AdminServicePage } from "@/lib/servicePagesData";

const CATEGORY_LABELS: Record<string, string> = {
  "corporate-events": "Corporate Events",
  "artist-booking": "Artist Booking",
  "venue-booking": "Venue Booking",
  "event-rentals": "Event Rentals",
};

export default function AdminServicePagesPage() {
  const [items, setItems] = useState<AdminServicePage[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  function load() {
    fetch("/api/admin/service-pages")
      .then((r) => r.json())
      .then((data) => setItems(data.servicePages))
      .catch(() => setError("Couldn't load service pages."));
  }

  useEffect(load, []);

  async function handleDelete(id: string, name: string, hasOverride: boolean) {
    if (!hasOverride) return;
    if (!confirm(`Delete your edits to "${name}"? This reverts the page back to its original built-in content.`)) return;
    const res = await fetch(`/api/admin/service-pages/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  const grouped = items?.reduce<Record<string, AdminServicePage[]>>((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="m-0">Service Pages</h1>
          <p className="text-muted text-sm">
            Every /corporate-events, /artist-booking, /venue-booking, and /event-rentals page. Editing one creates a
            live override — the built-in copy stays as a fallback in code either way.
          </p>
        </div>
        <Link href="/admin/service-pages/new" className="btn btn-primary">
          + New Service Page
        </Link>
      </div>

      {error && <p style={{ color: "#b3261e" }}>{error}</p>}
      {!items && !error && <p className="text-muted text-sm">Loading…</p>}

      {grouped &&
        Object.entries(CATEGORY_LABELS).map(([cat, label]) => (
          <div key={cat} className="mb-8">
            <h2 className="mb-3 text-base font-semibold">{label}</h2>
            <div className="flex flex-col gap-3">
              {(grouped[cat] ?? []).map((s) => {
                const hasOverride = s.id !== s.slug;
                return (
                  <div key={s.slug} className="card flex items-center justify-between p-4">
                    <div>
                      <p className="m-0 text-sm font-semibold">
                        {s.name} {!s.published && <span className="text-muted">(unpublished)</span>}
                      </p>
                      <p className="text-muted m-0 text-xs">
                        /{s.parentSlug}/{s.slug} {hasOverride ? "· customized" : "· built-in default"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/admin/service-pages/${s.id}`} className="btn btn-secondary">
                        Edit
                      </Link>
                      {hasOverride && (
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => handleDelete(s.id, s.name, hasOverride)}
                        >
                          Revert
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
              {(grouped[cat] ?? []).length === 0 && <p className="text-muted text-sm">No pages in this category.</p>}
            </div>
          </div>
        ))}
    </div>
  );
}
