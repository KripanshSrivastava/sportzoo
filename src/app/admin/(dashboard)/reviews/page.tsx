"use client";

import { useEffect, useState } from "react";
import type { GoogleReviewRow } from "@/lib/googleReviewsData";

interface Settings {
  googleRating: string;
  googleReviewCount: string;
  googleBusinessUrl: string;
  [k: string]: unknown;
}

export default function AdminReviewsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [reviews, setReviews] = useState<GoogleReviewRow[] | null>(null);
  const [savingHead, setSavingHead] = useState(false);
  const [headMsg, setHeadMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState({ author: "", rating: 5, text: "", whenLabel: "" });

  function loadReviews() {
    fetch("/api/admin/google-reviews")
      .then((r) => r.json())
      .then((d) => setReviews(d.reviews ?? []))
      .catch(() => setError("Couldn't load reviews."));
  }

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((d) => setSettings(d.settings))
      .catch(() => setError("Couldn't load settings."));
    loadReviews();
  }, []);

  async function saveHeader(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;
    setSavingHead(true);
    setHeadMsg(null);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const data = await res.json();
    setSavingHead(false);
    setHeadMsg(res.ok && data.ok ? data.message ?? "Saved." : data.message ?? "Failed to save.");
  }

  async function addReview(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.text.trim()) return;
    const res = await fetch("/api/admin/google-reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    if (res.ok) {
      setDraft({ author: "", rating: 5, text: "", whenLabel: "" });
      loadReviews();
    }
  }

  async function patchReview(id: string, patch: Partial<GoogleReviewRow>) {
    await fetch(`/api/admin/google-reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    loadReviews();
  }

  async function removeReview(id: string, author: string) {
    if (!confirm(`Delete the review from ${author || "this reviewer"}?`)) return;
    await fetch(`/api/admin/google-reviews/${id}`, { method: "DELETE" });
    loadReviews();
  }

  async function reorder(i: number, dir: -1 | 1) {
    if (!reviews) return;
    const next = [...reviews];
    const t = i + dir;
    if (t < 0 || t >= next.length) return;
    [next[i], next[t]] = [next[t], next[i]];
    setReviews(next);
    await fetch("/api/admin/google-reviews", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next.map((r) => r.id)),
    });
  }

  const set = (k: keyof Settings, v: string) => setSettings((s) => (s ? { ...s, [k]: v } : s));

  return (
    <div className="max-w-3xl">
      <h1>Google Reviews</h1>
      <p className="text-muted mb-6 text-sm">
        Controls the &quot;Google reviews&quot; section on the homepage and the Reviews badge in the footer. Add the
        review quotes to show as cards here.
      </p>

      {error && (
        <p className="mb-4 text-sm font-medium" style={{ color: "#b3261e" }}>
          {error}
        </p>
      )}

      {settings && (
        <form onSubmit={saveHeader} className="card mb-8 flex flex-col gap-3 p-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="field m-0">
              <label htmlFor="rating">Overall rating (e.g. 4.9)</label>
              <input id="rating" className="input" value={settings.googleRating} onChange={(e) => set("googleRating", e.target.value)} />
            </div>
            <div className="field m-0">
              <label htmlFor="count">Total number of reviews</label>
              <input id="count" className="input" value={settings.googleReviewCount} onChange={(e) => set("googleReviewCount", e.target.value)} />
            </div>
            <div className="field m-0">
              <label htmlFor="url">Google reviews link</label>
              <input id="url" className="input" value={settings.googleBusinessUrl} onChange={(e) => set("googleBusinessUrl", e.target.value)} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button type="submit" className="btn btn-primary" disabled={savingHead}>
              {savingHead ? "Saving…" : "Save"}
            </button>
            {headMsg && <span className="text-xs font-medium" style={{ color: "var(--color-accent)" }}>{headMsg}</span>}
          </div>
        </form>
      )}

      <h3 className="mb-3">Review quotes</h3>

      <form onSubmit={addReview} className="card mb-6 flex flex-col gap-3 p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="field m-0">
            <label>Reviewer name</label>
            <input className="input" value={draft.author} onChange={(e) => setDraft({ ...draft, author: e.target.value })} />
          </div>
          <div className="field m-0">
            <label>Stars</label>
            <select className="input" value={draft.rating} onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) })}>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} ★
                </option>
              ))}
            </select>
          </div>
          <div className="field m-0">
            <label>When (e.g. &quot;2 months ago&quot;)</label>
            <input className="input" value={draft.whenLabel} onChange={(e) => setDraft({ ...draft, whenLabel: e.target.value })} />
          </div>
        </div>
        <div className="field m-0">
          <label>Review text</label>
          <textarea className="input" rows={2} value={draft.text} onChange={(e) => setDraft({ ...draft, text: e.target.value })} />
        </div>
        <button type="submit" className="btn btn-secondary" style={{ width: "fit-content" }} disabled={!draft.text.trim()}>
          + Add review
        </button>
      </form>

      {!reviews ? (
        <p className="text-muted text-sm">Loading…</p>
      ) : reviews.length === 0 ? (
        <p className="card p-6 text-sm">No review quotes yet — the homepage section shows just the rating summary.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {reviews.map((r, i) => (
            <div key={r.id} className="card flex flex-col gap-2 p-3">
              <div className="grid gap-2 sm:grid-cols-[1fr_90px_140px]">
                <input
                  className="input"
                  placeholder="Reviewer name"
                  defaultValue={r.author}
                  onBlur={(e) => e.target.value !== r.author && patchReview(r.id, { author: e.target.value })}
                />
                <select className="input" defaultValue={r.rating} onChange={(e) => patchReview(r.id, { rating: Number(e.target.value) })}>
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n} ★
                    </option>
                  ))}
                </select>
                <input
                  className="input"
                  placeholder="When"
                  defaultValue={r.whenLabel}
                  onBlur={(e) => e.target.value !== r.whenLabel && patchReview(r.id, { whenLabel: e.target.value })}
                />
              </div>
              <textarea
                className="input"
                rows={2}
                defaultValue={r.text}
                onBlur={(e) => e.target.value !== r.text && patchReview(r.id, { text: e.target.value })}
              />
              <div className="flex gap-1.5">
                <button type="button" className="btn btn-secondary" onClick={() => reorder(i, -1)} disabled={i === 0}>
                  ↑
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => reorder(i, 1)} disabled={i === reviews.length - 1}>
                  ↓
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => removeReview(r.id, r.author)}>
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
