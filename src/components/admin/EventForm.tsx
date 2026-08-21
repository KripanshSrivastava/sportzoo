"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export interface EventFormValues {
  id?: string;
  slug: string;
  title: string;
  city: string;
  venue: string;
  eventDate: string;
  eventTime: string;
  description: string;
  coverImageUrl: string;
  price: number;
  capacity: string;
  registrationOpen: boolean;
  published: boolean;
}

export const emptyEvent: EventFormValues = {
  slug: "",
  title: "",
  city: "",
  venue: "",
  eventDate: "",
  eventTime: "",
  description: "",
  coverImageUrl: "",
  price: 0,
  capacity: "",
  registrationOpen: true,
  published: true,
};

export function EventForm({ initial }: { initial: EventFormValues }) {
  const router = useRouter();
  const [form, setForm] = useState<EventFormValues>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const isEdit = Boolean(initial.id);

  function update<K extends keyof EventFormValues>(key: K, value: EventFormValues[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setMessage(null);

    const payload = { ...form, currency: "INR" };
    const url = isEdit ? `/api/admin/events/${initial.id}` : "/api/admin/events";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.message ?? "Failed to save.");
        return;
      }
      router.push("/admin/events");
      router.refresh();
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-4">
      <div className="field">
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          className="input"
          required
          placeholder="e.g. Gurugram Corporate Sports Day"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
        />
      </div>

      {!isEdit && (
        <div className="field">
          <label htmlFor="slug">URL slug (leave blank to generate from title)</label>
          <input
            id="slug"
            className="input"
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            placeholder="e.g. gurugram-corporate-sports-day"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="field">
          <label htmlFor="city">City</label>
          <input id="city" className="input" value={form.city} onChange={(e) => update("city", e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="venue">Venue</label>
          <input id="venue" className="input" value={form.venue} onChange={(e) => update("venue", e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="field">
          <label htmlFor="eventDate">Date</label>
          <input
            id="eventDate"
            type="date"
            className="input"
            value={form.eventDate}
            onChange={(e) => update("eventDate", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="eventTime">Time</label>
          <input
            id="eventTime"
            className="input"
            placeholder="e.g. 9:00 AM – 5:00 PM"
            value={form.eventTime}
            onChange={(e) => update("eventTime", e.target.value)}
          />
        </div>
      </div>

      <ImageUploadField label="Cover photo" folder="events" value={form.coverImageUrl} onChange={(url) => update("coverImageUrl", url)} />

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className="input"
          rows={5}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="field">
          <label htmlFor="price">Registration price (₹, 0 = free)</label>
          <input
            id="price"
            type="number"
            min={0}
            className="input"
            value={form.price}
            onChange={(e) => update("price", Number(e.target.value) || 0)}
          />
        </div>
        <div className="field">
          <label htmlFor="capacity">Capacity (blank = unlimited)</label>
          <input
            id="capacity"
            type="number"
            min={1}
            className="input"
            value={form.capacity}
            onChange={(e) => update("capacity", e.target.value)}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.registrationOpen}
          onChange={(e) => update("registrationOpen", e.target.checked)}
        />
        Registration open
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} />
        Published (visible on the live site)
      </label>

      {form.price > 0 && (
        <p className="text-muted rounded-lg border p-3 text-xs" style={{ borderColor: "var(--color-divider)" }}>
          No payment gateway is connected yet, so paid registrations are recorded as &quot;pending&quot; — you&apos;ll
          see them under Registrations and can follow up to collect payment, then mark them paid.
        </p>
      )}

      {message && (
        <p className="text-sm font-medium" style={{ color: "#b3261e" }}>
          {message}
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === "saving"} style={{ width: "fit-content" }}>
        {status === "saving" ? "Saving…" : isEdit ? "Save Changes" : "Create Event"}
      </button>
    </form>
  );
}
