"use client";

import { useEffect, useState } from "react";
import type { BusinessSettings } from "@/lib/businessSettings";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type FormState = BusinessSettings;

const FIELDS: { key: Exclude<keyof FormState, "logoUrl">; label: string; type?: "text" | "textarea" | "email" }[] = [
  { key: "brand", label: "Brand name" },
  { key: "legalName", label: "Legal entity name (footer copyright, privacy & terms)" },
  { key: "tagline", label: "Tagline" },
  { key: "shortTagline", label: "Short tagline (used in page titles)" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "ownerName", label: "Owner / founder name" },
  { key: "phone", label: "Phone number (as shown to visitors)" },
  { key: "whatsapp", label: "WhatsApp number" },
  { key: "email", label: "Business email", type: "email" },
  { key: "officeAddress", label: "Office address", type: "textarea" },
  { key: "primaryCity", label: "Primary city" },
  { key: "serviceArea", label: "Service area (e.g. \"Pan India\")" },
  { key: "mapUrl", label: "Google Maps link" },
  { key: "businessHours", label: "Business hours" },
  { key: "googleBusinessUrl", label: "Google Business Profile / reviews URL (leave blank to hide the link)" },
  { key: "googleRating", label: "Google rating (e.g. 4.9)" },
  { key: "googleReviewCount", label: "Number of Google reviews (e.g. 127)" },
  { key: "linkedinUrl", label: "LinkedIn page URL (leave blank to hide the icon)" },
  { key: "instagramUrl", label: "Instagram profile URL (leave blank to hide the icon)" },
  { key: "facebookUrl", label: "Facebook page URL (leave blank to hide the icon)" },
  { key: "youtubeUrl", label: "YouTube channel URL (leave blank to hide the icon)" },
];

export default function AdminSettingsPage() {
  const [form, setForm] = useState<FormState | null>(null);
  const [status, setStatus] = useState<"loading" | "idle" | "saving" | "saved" | "error">("loading");
  const [message, setMessage] = useState<string | null>(null);
  const [supabaseConfigured, setSupabaseConfigured] = useState(true);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        setForm(data.settings);
        setSupabaseConfigured(data.supabaseConfigured);
        setStatus("idle");
      })
      .catch(() => setStatus("error"));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setStatus("saving");
    setMessage(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.message ?? "Failed to save.");
        return;
      }
      setStatus("saved");
      setMessage(data.message ?? "Saved. Changes are live on the site now.");
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server.");
    }
  }

  if (status === "loading" || !form) {
    return <p className="text-sm" style={{ color: "var(--color-neutral-600)" }}>Loading…</p>;
  }

  return (
    <div className="max-w-2xl">
      <h1>Business Info</h1>
      <p className="text-muted mb-6 text-sm">
        This is what shows up across the site — header, footer, contact page, and every quote form.
      </p>

      {!supabaseConfigured && (
        <p className="card mb-6 p-4 text-sm" style={{ color: "#8a6825" }}>
          Supabase isn&apos;t configured yet, so changes here won&apos;t save. Set{" "}
          <code>SUPABASE_URL</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code> in your environment — see{" "}
          <code>supabase/schema.sql</code> and <code>.env.example</code>.
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <ImageUploadField
          label="Logo (shown in the header)"
          folder="branding"
          spec="logo"
          value={form.logoUrl ?? ""}
          onChange={(url) => setForm({ ...form, logoUrl: url })}
        />

        {FIELDS.map(({ key, label, type }) => (
          <div className="field" key={key}>
            <label htmlFor={key}>{label}</label>
            {type === "textarea" ? (
              <textarea
                id={key}
                className="input"
                rows={2}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            ) : (
              <input
                id={key}
                type={type === "email" ? "email" : "text"}
                className="input"
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            )}
          </div>
        ))}

        {message && (
          <p className="text-sm font-medium" style={{ color: status === "error" ? "#b3261e" : "var(--color-accent)" }}>
            {message}
          </p>
        )}

        <button type="submit" className="btn btn-primary" disabled={status === "saving"} style={{ width: "fit-content" }}>
          {status === "saving" ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
