"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ImageListField } from "@/components/admin/ImageListField";

const CATEGORIES = [
  { value: "corporate-events", label: "Corporate Events" },
  { value: "artist-booking", label: "Artist Booking" },
  { value: "venue-booking", label: "Venue Booking" },
  { value: "event-rentals", label: "Event Rentals" },
] as const;

export interface ServicePageFormValues {
  id?: string;
  slug: string;
  category: (typeof CATEGORIES)[number]["value"];
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string; // paragraphs, one per line
  problems: string; // one per line
  inclusions: string; // "Title :: Description" one per line
  process: string; // "Title :: Description" one per line
  benefits: string; // one per line
  useCases: string; // one per line
  faqs: string; // "Question :: Answer" one per line
  heroImageUrl: string;
  galleryImageUrls: string[];
  published: boolean;
}

export const emptyServicePage: ServicePageFormValues = {
  slug: "",
  category: "corporate-events",
  name: "",
  h1: "",
  metaTitle: "",
  metaDescription: "",
  intro: "",
  problems: "",
  inclusions: "",
  process: "",
  benefits: "",
  useCases: "",
  faqs: "",
  heroImageUrl: "",
  galleryImageUrls: [],
  published: true,
};

function linesToList(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function linesToPairs(value: string, keys: [string, string]): Record<string, string>[] {
  return linesToList(value).map((line) => {
    const [first, ...rest] = line.split("::");
    return { [keys[0]]: first.trim(), [keys[1]]: rest.join("::").trim() };
  });
}

function listToLines(value: string[] | undefined): string {
  return (value ?? []).join("\n");
}

function pairsToLines(value: { title?: string; desc?: string; q?: string; a?: string }[] | undefined, keys: [string, string]): string {
  return (value ?? [])
    .map((p) => `${(p as Record<string, string>)[keys[0]] ?? ""} :: ${(p as Record<string, string>)[keys[1]] ?? ""}`)
    .join("\n");
}

export { listToLines, pairsToLines };

export function ServicePageForm({ initial }: { initial: ServicePageFormValues }) {
  const router = useRouter();
  const [form, setForm] = useState<ServicePageFormValues>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const isEdit = Boolean(initial.id);

  function update<K extends keyof ServicePageFormValues>(key: K, value: ServicePageFormValues[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setMessage(null);

    const payload = {
      ...form,
      intro: linesToList(form.intro),
      problems: linesToList(form.problems),
      benefits: linesToList(form.benefits),
      useCases: linesToList(form.useCases),
      inclusions: linesToPairs(form.inclusions, ["title", "desc"]),
      process: linesToPairs(form.process, ["title", "desc"]),
      faqs: linesToPairs(form.faqs, ["q", "a"]),
    };

    const url = isEdit ? `/api/admin/service-pages/${initial.id}` : "/api/admin/service-pages";
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
      router.push("/admin/service-pages");
      router.refresh();
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-3xl flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="field">
          <label htmlFor="name">Name (shown in nav) *</label>
          <input id="name" className="input" required value={form.name} onChange={(e) => update("name", e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            className="input"
            value={form.category}
            disabled={isEdit}
            onChange={(e) => update("category", e.target.value as ServicePageFormValues["category"])}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!isEdit && (
        <div className="field">
          <label htmlFor="slug">URL slug (leave blank to generate from name)</label>
          <input id="slug" className="input" value={form.slug} onChange={(e) => update("slug", e.target.value)} />
        </div>
      )}

      <div className="field">
        <label htmlFor="h1">Page heading (H1)</label>
        <input id="h1" className="input" value={form.h1} onChange={(e) => update("h1", e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="field">
          <label htmlFor="metaTitle">Meta title</label>
          <input id="metaTitle" className="input" value={form.metaTitle} onChange={(e) => update("metaTitle", e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="metaDescription">Meta description</label>
          <input id="metaDescription" className="input" value={form.metaDescription} onChange={(e) => update("metaDescription", e.target.value)} />
        </div>
      </div>

      <ImageUploadField
        label="Header image or video (optional)"
        folder="service-pages"
        spec="serviceHero"
        allowVideo
        value={form.heroImageUrl}
        onChange={(url) => update("heroImageUrl", url)}
      />

      <ImageListField
        label="Project photo &amp; video gallery (optional)"
        folder="service-pages"
        spec="serviceGallery"
        allowVideo
        showCaption={false}
        value={form.galleryImageUrls.map((url) => ({ url }))}
        onChange={(items) => update("galleryImageUrls", items.map((i) => i.url).filter(Boolean))}
      />

      <div className="field">
        <label htmlFor="intro">Intro paragraphs (one per line)</label>
        <textarea id="intro" className="input" rows={4} value={form.intro} onChange={(e) => update("intro", e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="problems">Problems this solves (one per line)</label>
        <textarea id="problems" className="input" rows={4} value={form.problems} onChange={(e) => update("problems", e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="inclusions">What&apos;s included — one per line, format: Title :: Description</label>
        <textarea id="inclusions" className="input" rows={5} value={form.inclusions} onChange={(e) => update("inclusions", e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="process">Process steps — one per line, format: Title :: Description</label>
        <textarea id="process" className="input" rows={5} value={form.process} onChange={(e) => update("process", e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="benefits">Benefits (one per line)</label>
        <textarea id="benefits" className="input" rows={4} value={form.benefits} onChange={(e) => update("benefits", e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="useCases">Use cases (one per line)</label>
        <textarea id="useCases" className="input" rows={4} value={form.useCases} onChange={(e) => update("useCases", e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="faqs">FAQs — one per line, format: Question :: Answer</label>
        <textarea id="faqs" className="input" rows={5} value={form.faqs} onChange={(e) => update("faqs", e.target.value)} />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} />
        Published (visible on the live site)
      </label>

      {message && (
        <p className="text-sm font-medium" style={{ color: "#b3261e" }}>
          {message}
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === "saving"} style={{ width: "fit-content" }}>
        {status === "saving" ? "Saving…" : isEdit ? "Save Changes" : "Create Page"}
      </button>
    </form>
  );
}
