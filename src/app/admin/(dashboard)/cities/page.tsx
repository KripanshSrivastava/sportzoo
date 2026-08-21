"use client";

import { useEffect, useState } from "react";
import type { CityRecord } from "@/lib/citiesData";

export default function AdminCitiesPage() {
  const [items, setItems] = useState<CityRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);

  function load() {
    fetch("/api/admin/cities")
      .then((r) => r.json())
      .then((data) => setItems(data.cities))
      .catch(() => setError("Couldn't load cities."));
  }

  useEffect(load, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setAdding(true);
    const res = await fetch("/api/admin/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim() }),
    });
    setAdding(false);
    if (res.ok) {
      setNewName("");
      load();
    } else {
      const data = await res.json().catch(() => null);
      setError(data?.message ?? "Couldn't add city.");
    }
  }

  async function handleRename(city: CityRecord, name: string) {
    await fetch(`/api/admin/cities/${city.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: city.slug, name, published: city.published, sortOrder: city.sortOrder }),
    });
    load();
  }

  async function handleTogglePublished(city: CityRecord) {
    await fetch(`/api/admin/cities/${city.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: city.slug, name: city.name, published: !city.published, sortOrder: city.sortOrder }),
    });
    load();
  }

  async function handleDelete(city: CityRecord) {
    if (!confirm(`Remove "${city.name}"? Its /corporate-event-management/${city.slug} page will stop being listed.`)) return;
    const res = await fetch(`/api/admin/cities/${city.id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="m-0">Cities</h1>
        <p className="text-muted text-sm">
          Each city gets its own local SEO page at /corporate-event-management/[city]. Renaming or unpublishing here
          updates that page immediately.
        </p>
      </div>

      <form onSubmit={handleAdd} className="mb-6 flex items-end gap-3">
        <div className="field m-0">
          <label htmlFor="newCity">Add a city</label>
          <input
            id="newCity"
            className="input"
            placeholder="e.g. Pune"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={adding}>
          {adding ? "Adding…" : "+ Add City"}
        </button>
      </form>

      {error && <p style={{ color: "#b3261e" }}>{error}</p>}
      {!items && !error && <p className="text-muted text-sm">Loading…</p>}

      {items && (
        <div className="flex flex-col gap-3">
          {items.map((city) => {
            const hasOverride = city.id !== city.slug;
            return (
              <div key={city.slug} className="card flex items-center justify-between gap-4 p-4">
                <div className="flex-1">
                  <input
                    className="input"
                    defaultValue={city.name}
                    onBlur={(e) => e.target.value !== city.name && handleRename(city, e.target.value)}
                  />
                  <p className="text-muted m-0 mt-1 text-xs">
                    /corporate-event-management/{city.slug} {!city.published && "· unpublished"}
                    {!hasOverride && " · built-in"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="btn btn-secondary" onClick={() => handleTogglePublished(city)}>
                    {city.published ? "Unpublish" : "Publish"}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => handleDelete(city)}>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
