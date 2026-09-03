"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AdminServicePage } from "@/lib/servicePagesData";

export default function AdminServicePagesPage() {
  const [items, setItems] = useState<AdminServicePage[] | null>(null);
  const [categoryLabels, setCategoryLabels] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  function load() {
    fetch("/api/admin/service-pages")
      .then((r) => r.json())
      .then((data) => setItems(data.servicePages))
      .catch(() => setError("Couldn't load service pages."));
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then((d) => {
        const map: Record<string, string> = {};
        for (const c of d.categories ?? []) map[c.slug] = c.name;
        setCategoryLabels(map);
      })
      .catch(() => {});
  }

  useEffect(load, []);

  async function togglePublished(s: AdminServicePage) {
    await fetch(`/api/admin/service-pages/${s.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !s.published }),
    });
    load();
  }

  async function handleDelete(s: AdminServicePage) {
    const hasOverride = s.id !== s.slug;
    const msg = s.builtIn
      ? hasOverride
        ? `Delete your edits to "${s.name}"? It reverts to the original built-in content (still visible — use Hide to take it off the site).`
        : `"${s.name}" is a built-in page and can't be deleted. Use Hide to take it off the live site.`
      : `Permanently delete "${s.name}"? This can't be undone.`;
    if (s.builtIn && !hasOverride) {
      alert(msg);
      return;
    }
    if (!confirm(msg)) return;
    const res = await fetch(`/api/admin/service-pages/${s.id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  const grouped = items?.reduce<Record<string, AdminServicePage[]>>((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {});

  // Show known categories first (in nav order), then any leftover/orphaned category slugs.
  const groupOrder = grouped
    ? [
        ...Object.keys(categoryLabels).filter((c) => grouped[c]),
        ...Object.keys(grouped).filter((c) => !(c in categoryLabels)),
      ]
    : [];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="m-0">Service Pages</h1>
          <p className="text-muted text-sm">
            Every service detail page, grouped by category. <strong>Hide</strong> takes a page off the live site;{" "}
            <strong>Delete</strong> removes a page you created; <strong>Reset</strong> drops your edits to a built-in
            page. Manage the categories themselves under <Link href="/admin/categories">Categories</Link>.
          </p>
        </div>
        <Link href="/admin/service-pages/new" className="btn btn-primary">
          + New Service Page
        </Link>
      </div>

      {error && <p style={{ color: "#b3261e" }}>{error}</p>}
      {!items && !error && <p className="text-muted text-sm">Loading…</p>}

      {grouped &&
        groupOrder.map((cat) => (
          <div key={cat} className="mb-8">
            <h2 className="mb-3 text-base font-semibold">
              {categoryLabels[cat] ?? cat}
              {!(cat in categoryLabels) && <span className="text-muted text-xs"> — no category (hidden on site)</span>}
            </h2>
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
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/admin/service-pages/${s.id}`} className="btn btn-secondary">
                        Edit
                      </Link>
                      <button type="button" className="btn btn-secondary" onClick={() => togglePublished(s)}>
                        {s.published ? "Hide" : "Show"}
                      </button>
                      {hasOverride && s.builtIn && (
                        <button type="button" className="btn btn-secondary" onClick={() => handleDelete(s)}>
                          Reset
                        </button>
                      )}
                      {!s.builtIn && (
                        <button type="button" className="btn btn-secondary" onClick={() => handleDelete(s)}>
                          Delete
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
