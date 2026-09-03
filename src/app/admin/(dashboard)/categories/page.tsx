"use client";

import { useEffect, useState } from "react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

interface Category {
  id: string;
  slug: string;
  name: string;
  h1: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  heroImageUrl: string;
  published: boolean;
  sortOrder: number;
}

const BLANK = {
  name: "",
  slug: "",
  h1: "",
  intro: "",
  metaTitle: "",
  metaDescription: "",
  heroImageUrl: "",
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState({ ...BLANK });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [seedMode, setSeedMode] = useState(false);

  function load() {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then((d) => {
        setCategories(d.categories ?? []);
        // Seed rows have their slug as their id — that means the DB table is empty / not migrated.
        setSeedMode((d.categories ?? []).some((c: Category) => c.id === c.slug));
      })
      .catch(() => setError("Couldn't load categories."));
  }
  useEffect(load, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.message ?? "Couldn't create the category.");
        return;
      }
      setDraft({ ...BLANK });
      load();
    } finally {
      setBusy(false);
    }
  }

  async function save(id: string, patch: Partial<Category>) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.message ?? "Couldn't save.");
        return;
      }
      load();
    } finally {
      setBusy(false);
    }
  }

  async function remove(cat: Category) {
    if (!confirm(`Delete "${cat.name}"?\n\nIts overview page (/${cat.slug}) and every service page under it will stop showing on the site.`)) {
      return;
    }
    const res = await fetch(`/api/admin/categories/${cat.id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.ok && data.orphaned > 0) {
      alert(`Deleted. ${data.orphaned} service page(s) were under this category — reassign them from Service Pages, or they'll stay hidden.`);
    }
    load();
  }

  async function reorder(index: number, dir: -1 | 1) {
    if (!categories) return;
    const next = [...categories];
    const t = index + dir;
    if (t < 0 || t >= next.length) return;
    [next[index], next[t]] = [next[t], next[index]];
    setCategories(next);
    await fetch("/api/admin/categories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next.map((c) => c.id)),
    });
  }

  return (
    <div>
      <h1>Categories</h1>
      <p className="text-muted mb-1 text-sm">
        The top-level service groups — each is a page at <code>/its-slug</code> plus a nav dropdown. Service pages are
        assigned to a category from <strong>Service Pages</strong>.
      </p>
      {seedMode && (
        <p className="mb-6 rounded p-3 text-sm" style={{ background: "#fff4e5", color: "#8a5a00" }}>
          Showing the four built-in categories. To rename, reorder, add or delete categories, run the latest{" "}
          <code>supabase/schema.sql</code> in your database first.
        </p>
      )}

      {error && (
        <p className="mb-4 text-sm font-medium" style={{ color: "#b3261e" }}>
          {error}
        </p>
      )}

      <form onSubmit={create} className="card mb-8 flex flex-col gap-3 p-4">
        <p className="m-0 text-sm font-semibold">Add a category</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="field m-0">
            <label htmlFor="c-name">Name (nav label) *</label>
            <input
              id="c-name"
              className="input"
              required
              value={draft.name}
              onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
              placeholder="e.g. Wedding Events"
            />
          </div>
          <div className="field m-0">
            <label htmlFor="c-slug">URL slug (optional — from name if blank)</label>
            <input
              id="c-slug"
              className="input"
              value={draft.slug}
              onChange={(e) => setDraft((d) => ({ ...d, slug: e.target.value }))}
              placeholder="wedding-events"
            />
          </div>
        </div>
        <div className="field m-0">
          <label htmlFor="c-intro">Intro line (shown under the heading)</label>
          <textarea
            id="c-intro"
            className="input"
            rows={2}
            value={draft.intro}
            onChange={(e) => setDraft((d) => ({ ...d, intro: e.target.value }))}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={busy || seedMode} style={{ width: "fit-content" }}>
          {busy ? "Saving…" : "+ Add category"}
        </button>
      </form>

      {!categories ? (
        <p className="text-muted text-sm">Loading…</p>
      ) : (
        <div className="flex flex-col gap-3">
          {categories.map((cat, i) => (
            <div key={cat.id} className="card p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="m-0 text-sm font-semibold">
                    {cat.name}
                    {!cat.published && <span className="text-muted"> — hidden</span>}
                  </p>
                  <p className="text-muted m-0 text-xs">/{cat.slug}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button type="button" className="btn btn-secondary" onClick={() => reorder(i, -1)} disabled={i === 0 || seedMode}>
                    ↑
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => reorder(i, 1)}
                    disabled={i === categories.length - 1 || seedMode}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => save(cat.id, { published: !cat.published })}
                    disabled={seedMode}
                  >
                    {cat.published ? "Hide" : "Show"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditingId(editingId === cat.id ? null : cat.id)}
                  >
                    {editingId === cat.id ? "Close" : "Edit"}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => remove(cat)} disabled={seedMode}>
                    Delete
                  </button>
                </div>
              </div>

              {editingId === cat.id && (
                <CategoryEditor cat={cat} disabled={seedMode} onSave={(patch) => save(cat.id, patch)} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryEditor({
  cat,
  disabled,
  onSave,
}: {
  cat: Category;
  disabled: boolean;
  onSave: (patch: Partial<Category>) => void;
}) {
  const [form, setForm] = useState({
    name: cat.name,
    slug: cat.slug,
    h1: cat.h1,
    intro: cat.intro,
    metaTitle: cat.metaTitle,
    metaDescription: cat.metaDescription,
    heroImageUrl: cat.heroImageUrl,
  });

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  return (
    <div className="mt-4 flex flex-col gap-3 border-t pt-4" style={{ borderColor: "var(--color-divider)" }}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="field m-0">
          <label>Name</label>
          <input className="input" value={form.name} onChange={(e) => set("name", e.target.value)} />
        </div>
        <div className="field m-0">
          <label>URL slug</label>
          <input className="input" value={form.slug} onChange={(e) => set("slug", e.target.value)} />
          <p className="text-muted mt-1 text-xs">Changing this changes the page URL — old links will 404.</p>
        </div>
      </div>
      <div className="field m-0">
        <label>Overview page heading (H1)</label>
        <input className="input" value={form.h1} onChange={(e) => set("h1", e.target.value)} />
      </div>
      <div className="field m-0">
        <label>Intro line</label>
        <textarea className="input" rows={2} value={form.intro} onChange={(e) => set("intro", e.target.value)} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="field m-0">
          <label>Meta title</label>
          <input className="input" value={form.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} />
        </div>
        <div className="field m-0">
          <label>Meta description</label>
          <input
            className="input"
            value={form.metaDescription}
            onChange={(e) => set("metaDescription", e.target.value)}
          />
        </div>
      </div>
      <ImageUploadField
        label="Overview header image or video (optional)"
        folder="categories"
        spec="serviceHero"
        allowVideo
        value={form.heroImageUrl}
        onChange={(url) => set("heroImageUrl", url)}
      />
      <button
        type="button"
        className="btn btn-primary"
        disabled={disabled}
        style={{ width: "fit-content" }}
        onClick={() => onSave(form)}
      >
        Save changes
      </button>
      <p className="text-muted text-xs">
        The four original categories (Corporate Events, Artist Booking, Venue Booking, Event Rentals) show their
        page-builder overview page, edited under <strong>Pages</strong>. New categories show a heading, this intro, and
        their service list. Meta title / description apply to every category.
      </p>
    </div>
  );
}
