"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AdminBlogPost } from "@/lib/blogData";

export default function AdminBlogPage() {
  const [items, setItems] = useState<AdminBlogPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  function load() {
    fetch("/api/admin/blog")
      .then((r) => r.json())
      .then((data) => setItems(data.posts))
      .catch(() => setError("Couldn't load blog posts."));
  }
  useEffect(load, []);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
    const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="m-0">Blog</h1>
          <p className="text-muted text-sm">Articles at /blog. Only published posts appear on the site, feed and sitemap.</p>
        </div>
        <Link href="/admin/blog/new" className="btn btn-primary">
          + New Post
        </Link>
      </div>

      {error && <p style={{ color: "#b3261e" }}>{error}</p>}

      {!items ? (
        <p className="text-muted text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <p className="card p-6 text-sm">No posts yet — add your first one above.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((p) => (
            <div key={p.id} className="card flex items-center justify-between p-4">
              <div>
                <p className="m-0 text-sm font-semibold">
                  {p.title} {!p.published && <span className="text-muted">(unpublished)</span>}
                </p>
                <p className="text-muted m-0 text-xs">
                  /blog/{p.slug}
                  {p.datePublished ? ` · ${p.datePublished}` : ""}
                  {p.cluster ? ` · ${p.cluster}` : ""}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/blog/${p.id}`} className="btn btn-secondary">
                  Edit
                </Link>
                <button type="button" className="btn btn-secondary" onClick={() => handleDelete(p.id, p.title)}>
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
