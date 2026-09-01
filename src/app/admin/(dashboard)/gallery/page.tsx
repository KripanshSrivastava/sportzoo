"use client";

import { useEffect, useRef, useState } from "react";
import type { GalleryImageRow } from "@/lib/galleryData";
import { IMAGE_SPECS, specSummary } from "@/lib/imageSpecs";
import { isVideoUrl } from "@/lib/media";

const CATEGORIES = ["Corporate Offsites", "Recognition Ceremonies", "Annual Day", "Sports Days", "Team Building", "Conferences"];

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImageRow[] | null>(null);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function addToGallery(url: string) {
    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, imageUrl: url }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      setError(data.message ?? "Failed to save.");
      return false;
    }
    load();
    return true;
  }

  async function handleAddVideo() {
    const v = videoUrl.trim();
    if (!v) return;
    setUploading(true);
    setError(null);
    try {
      if (await addToGallery(v)) setVideoUrl("");
    } finally {
      setUploading(false);
    }
  }

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

      await addToGallery(uploadData.url);
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
      <p className="text-muted mb-1 text-sm">Photos shown on the public Gallery page, grouped by category.</p>
      <p className="text-muted mb-6 text-xs">
        {specSummary(IMAGE_SPECS.galleryPhoto)} — {IMAGE_SPECS.galleryPhoto.note}
      </p>

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
          <input ref={inputRef} type="file" accept={IMAGE_SPECS.galleryPhoto.accept} className="input" onChange={handleUpload} disabled={uploading} />
        </div>
        <div className="field" style={{ minWidth: 260, flex: 1 }}>
          <label htmlFor="videoUrl">…or add a video (YouTube / Vimeo / MP4 link)</label>
          <div className="flex gap-2">
            <input
              id="videoUrl"
              type="url"
              className="input"
              placeholder="https://youtube.com/watch?v=…"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
            <button type="button" className="btn btn-secondary" onClick={handleAddVideo} disabled={uploading || !videoUrl.trim()}>
              Add
            </button>
          </div>
        </div>
        {uploading && <p className="text-muted text-xs">Saving…</p>}
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
                  {isVideoUrl(img.imageUrl) ? (
                    <div
                      className="flex aspect-square w-full items-center justify-center bg-slate-100 p-2 text-center text-[11px] font-medium text-slate-600"
                      style={{ border: "1px solid var(--color-divider)" }}
                    >
                      🎬 Video<br />
                      <span className="block break-all">{img.imageUrl}</span>
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={img.imageUrl} alt="" className="aspect-square w-full object-cover" style={{ border: "1px solid var(--color-divider)" }} />
                  )}
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
