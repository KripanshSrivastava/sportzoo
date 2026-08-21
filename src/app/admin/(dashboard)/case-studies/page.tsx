"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AdminCaseStudy } from "@/lib/caseStudiesData";

export default function AdminCaseStudiesPage() {
  const [items, setItems] = useState<AdminCaseStudy[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  function load() {
    fetch("/api/admin/case-studies")
      .then((r) => r.json())
      .then((data) => setItems(data.caseStudies))
      .catch(() => setError("Couldn't load case studies."));
  }

  useEffect(load, []);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
    const res = await fetch(`/api/admin/case-studies/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="m-0">Our Work</h1>
          <p className="text-muted text-sm">Case studies shown on the public &quot;Our Work&quot; page and homepage.</p>
        </div>
        <Link href="/admin/case-studies/new" className="btn btn-primary">
          + New Case Study
        </Link>
      </div>

      {error && <p style={{ color: "#b3261e" }}>{error}</p>}

      {!items ? (
        <p className="text-muted text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <p className="card p-6 text-sm">
          No case studies in the database yet — the public site is showing the built-in demo entries. Add
          your first real one above.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((c) => (
            <div key={c.id} className="card flex items-center justify-between p-4">
              <div>
                <p className="m-0 text-sm font-semibold">
                  {c.title} {!c.published && <span className="text-muted">(unpublished)</span>}
                </p>
                <p className="text-muted m-0 text-xs">{c.category} · /case-studies/{c.slug}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/case-studies/${c.id}`} className="btn btn-secondary">
                  Edit
                </Link>
                <button type="button" className="btn btn-secondary" onClick={() => handleDelete(c.id, c.title)}>
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
