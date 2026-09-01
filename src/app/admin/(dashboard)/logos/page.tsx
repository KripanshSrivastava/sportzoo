"use client";

import { useEffect, useRef, useState } from "react";
import type { ClientLogo } from "@/lib/clientLogosData";

export default function AdminClientLogosPage() {
  const [logos, setLogos] = useState<ClientLogo[] | null>(null);
  const [newName, setNewName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function load() {
    fetch("/api/admin/client-logos")
      .then((r) => r.json())
      .then((d) => setLogos(d.logos ?? []))
      .catch(() => setError("Couldn't load logos."));
  }
  useEffect(load, []);

  async function upload(file: File): Promise<string | null> {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", "logos");
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      setError(data.message ?? "Upload failed.");
      return null;
    }
    return data.url as string;
  }

  async function addLogo(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const file = fileRef.current?.files?.[0];
      const logoUrl = file ? await upload(file) : null;
      if (file && !logoUrl) return;
      const res = await fetch("/api/admin/client-logos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, logoUrl }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.message ?? "Couldn't add.");
        return;
      }
      setNewName("");
      if (fileRef.current) fileRef.current.value = "";
      load();
    } finally {
      setBusy(false);
    }
  }

  async function patch(id: string, body: Record<string, unknown>) {
    await fetch(`/api/admin/client-logos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    load();
  }

  async function replaceImage(id: string, file: File) {
    setBusy(true);
    setError(null);
    try {
      const url = await upload(file);
      if (url) await patch(id, { logoUrl: url });
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string, name: string) {
    if (!confirm(`Remove ${name || "this logo"}?`)) return;
    await fetch(`/api/admin/client-logos/${id}`, { method: "DELETE" });
    load();
  }

  async function reorder(index: number, dir: -1 | 1) {
    if (!logos) return;
    const next = [...logos];
    const t = index + dir;
    if (t < 0 || t >= next.length) return;
    [next[index], next[t]] = [next[t], next[index]];
    setLogos(next);
    await fetch("/api/admin/client-logos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next.map((l) => l.id)),
    });
  }

  return (
    <div className="max-w-3xl">
      <h1>Client Logos</h1>
      <p className="text-muted mb-6 text-sm">
        The companies shown in the &quot;Companies that trust our work&quot; banner. Manage every logo here in one place —
        the banner appears on the homepage wherever the <strong>Client logos</strong> section is placed (Pages → Home).
      </p>

      {error && (
        <p className="mb-4 text-sm font-medium" style={{ color: "#b3261e" }}>
          {error}
        </p>
      )}

      <form onSubmit={addLogo} className="card mb-8 flex flex-wrap items-end gap-3 p-4">
        <div className="field m-0" style={{ minWidth: 200, flex: 1 }}>
          <label htmlFor="name">Company name</label>
          <input id="name" className="input" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Genpact" />
        </div>
        <div className="field m-0" style={{ minWidth: 200 }}>
          <label htmlFor="logo">Logo image (optional)</label>
          <input ref={fileRef} id="logo" type="file" accept="image/*" className="input" />
        </div>
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? "Saving…" : "+ Add"}
        </button>
      </form>

      {!logos ? (
        <p className="text-muted text-sm">Loading…</p>
      ) : logos.length === 0 ? (
        <p className="card p-6 text-sm">
          No logos saved yet — the homepage banner is showing the built-in company names. Add your first one above.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {logos.map((logo, i) => (
            <div key={logo.id} className="card flex flex-wrap items-center gap-4 p-3">
              <div className="flex gap-1">
                <button type="button" className="btn btn-secondary" onClick={() => reorder(i, -1)} disabled={i === 0}>
                  ↑
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => reorder(i, 1)} disabled={i === logos.length - 1}>
                  ↓
                </button>
              </div>

              <div
                className="flex h-14 w-24 shrink-0 items-center justify-center bg-white"
                style={{ border: "1px solid var(--color-divider)" }}
              >
                {logo.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logo.logoUrl} alt={logo.name} className="max-h-full max-w-full object-contain p-1.5" />
                ) : (
                  <span className="text-[11px] font-semibold text-slate-500">No image</span>
                )}
              </div>

              <input
                className="input"
                style={{ flex: 1, minWidth: 160 }}
                defaultValue={logo.name}
                onBlur={(e) => e.target.value !== logo.name && patch(logo.id, { name: e.target.value })}
              />

              <label className="btn btn-secondary" style={{ cursor: "pointer" }}>
                {logo.logoUrl ? "Replace image" : "Upload image"}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => e.target.files?.[0] && replaceImage(logo.id, e.target.files[0])}
                />
              </label>
              <button type="button" className="btn btn-secondary" onClick={() => remove(logo.id, logo.name)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
