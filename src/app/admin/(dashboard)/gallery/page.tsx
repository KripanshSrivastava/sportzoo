"use client";

import { useEffect, useRef, useState } from "react";
import type { GalleryImageRow } from "@/lib/galleryData";

const CATEGORIES = ["Corporate Offsites", "Recognition Ceremonies", "Annual Day", "Sports Days", "Team Building", "Conferences"];

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImageRow[] | null>(null);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function load() {
    fetch("/api/admin/gallery")
      .then((r) => r.json())
      .then((data) => setImages(data.images))
      .catch(() => setError("Couldn't load gallery images."));
  }

  useEffect(load, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "gallery");
      const uploadRes = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || !uploadData.ok) {
        setError(uploadData.message ?? "Upload failed.");
        return;
      }

      const createRes = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, imageUrl: uploadData.url }),
      });
      const createData = await createRes.json();
      if (!createRes.ok || !createData.ok) {
        setError(createData.message ?? "Failed to save image.");
        return;
      }
      load();
    } catch {
      setError("Couldn't reach the server.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this photo?")) return;
    const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  const grouped = (images ?? []).reduce<Record<string, GalleryImageRow[]>>((acc, img) => {
    acc[img.category] = acc[img.category] || [];
    acc[img.category].push(img);
    return acc;
  }, {});

  return (
    <div>
      <h1>Gallery</h1>
      <p className="text-muted mb-6 text-sm">Photos shown on the public Gallery page, grouped by category.</p>

      <div className="card mb-8 flex flex-wrap items-end gap-3 p-4">
        <div className="field" style={{ minWidth: 220 }}>
          <label htmlFor="category">Category</label>
          <select id="category" className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="field" style={{ minWidth: 220 }}>
          <label>Upload photo</label>
          <input ref={inputRef} type="file" accept="image/*" className="input" onChange={handleUpload} disabled={uploading} />
        </div>
        {uploading && <p className="text-muted text-xs">Uploading…</p>}
      </div>

      {error && (
        <p className="mb-4 text-sm font-medium" style={{ color: "#b3261e" }}>
          {error}
        </p>
      )}

      {!images ? (
        <p className="text-muted text-sm">Loading…</p>
      ) : images.length === 0 ? (
        <p className="card p-6 text-sm">
          No photos in the database yet — the public Gallery page is showing built-in placeholder photos. Upload
          your first real one above.
        </p>
      ) : (
        Object.entries(grouped).map(([cat, imgs]) => (
          <div key={cat} className="mb-8">
            <h3>{cat}</h3>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {imgs.map((img) => (
                <div key={img.id} className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.imageUrl} alt="" className="aspect-square w-full object-cover" style={{ border: "1px solid var(--color-divider)" }} />
                  <button
                    type="button"
                    className="btn btn-secondary mt-1 w-full"
                    onClick={() => handleDelete(img.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
