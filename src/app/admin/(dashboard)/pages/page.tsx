"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HIDEABLE_PAGES } from "@/lib/hideablePages";

const BUILDER_PAGES: { key: string; label: string; path: string; canHide: boolean; note?: string }[] = [
  { key: "home", label: "Home", path: "/", canHide: false, note: "The site's front page — always visible." },
  { key: "about", label: "About", path: "/about", canHide: true },
  { key: "contact", label: "Contact", path: "/contact", canHide: true },
  { key: "corporate-events-overview", label: "Corporate Events (overview)", path: "/corporate-events", canHide: false, note: "Hide via Categories" },
  { key: "artist-booking-overview", label: "Artist Booking (overview)", path: "/artist-booking", canHide: false, note: "Hide via Categories" },
  { key: "venue-booking-overview", label: "Venue Booking (overview)", path: "/venue-booking", canHide: false, note: "Hide via Categories" },
  { key: "event-rentals-overview", label: "Event Rentals (overview)", path: "/event-rentals", canHide: false, note: "Hide via Categories" },
];

const OTHER_PAGES = HIDEABLE_PAGES.filter((p) => p.path !== "/about" && p.path !== "/contact");

export default function AdminPagesPage() {
  const [hidden, setHidden] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function load() {
    fetch("/api/admin/pages")
      .then((r) => r.json())
      .then((d) => {
        setHidden(d.hidden ?? []);
        setReady(true);
      })
      .catch(() => setError("Couldn't load page visibility."));
  }
  useEffect(load, []);

  async function toggle(path: string, makeHidden: boolean) {
    setHidden((h) => (makeHidden ? [...h, path] : h.filter((p) => p !== path)));
    const res = await fetch("/api/admin/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, hidden: makeHidden }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) {
      setError(data.message ?? "Couldn't update. Run supabase/schema.sql if you haven't.");
      load();
    }
  }

  function HideButton({ path }: { path: string }) {
    const isHidden = hidden.includes(path);
    return (
      <button type="button" className="btn btn-secondary" disabled={!ready} onClick={() => toggle(path, !isHidden)}>
        {isHidden ? "Show" : "Hide"}
      </button>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="m-0">Pages</h1>
        <p className="text-muted text-sm">
          Edit a page&apos;s sections, or hide a page to take it off the live site (it returns a 404 while hidden). Service
          pages are under <Link href="/admin/service-pages">Service Pages</Link>; categories under{" "}
          <Link href="/admin/categories">Categories</Link>.
        </p>
      </div>

      {error && (
        <p className="mb-4 text-sm font-medium" style={{ color: "#b3261e" }}>
          {error}
        </p>
      )}

      <h6 className="mb-3" style={{ color: "var(--color-accent-700)" }}>
        Editable pages
      </h6>
      <div className="mb-8 flex flex-col gap-3">
        {BUILDER_PAGES.map((p) => (
          <div key={p.key} className="card flex flex-wrap items-center justify-between gap-2 p-4">
            <div>
              <p className="m-0 text-sm font-semibold">
                {p.label}
                {hidden.includes(p.path) && <span className="text-muted"> — hidden</span>}
              </p>
              <p className="text-muted m-0 text-xs">
                {p.path}
                {p.note ? ` · ${p.note}` : ""}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href={`/admin/pages/${p.key}`} className="btn btn-secondary">
                Edit
              </Link>
              {p.canHide && <HideButton path={p.path} />}
            </div>
          </div>
        ))}
      </div>

      <h6 className="mb-3" style={{ color: "var(--color-accent-700)" }}>
        Other pages — show or hide
      </h6>
      <div className="flex flex-col gap-3">
        {OTHER_PAGES.map((p) => (
          <div key={p.path} className="card flex flex-wrap items-center justify-between gap-2 p-4">
            <div>
              <p className="m-0 text-sm font-semibold">
                {p.label}
                {hidden.includes(p.path) && <span className="text-muted"> — hidden</span>}
              </p>
              <p className="text-muted m-0 text-xs">{p.path}</p>
            </div>
            <HideButton path={p.path} />
          </div>
        ))}
      </div>
    </div>
  );
}
