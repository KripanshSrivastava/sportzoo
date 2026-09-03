"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ImageListField } from "@/components/admin/ImageListField";
import { parseBlogBody, serializeBlogBody } from "@/lib/blogBody";
import type { BlogBlock } from "@/content/blog";

export interface ServicePageFormValues {
  id?: string;
  slug: string;
  category: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  bodyText: string; // free-form page content (## heading, paragraphs, - bullets, image URLs)
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
  bodyText: "",
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

export function blocksToBodyText(body: BlogBlock[] | undefined): string {
  return serializeBlogBody(body ?? []);
}

export { listToLines, pairsToLines };

export function ServicePageForm({ initial }: { initial: ServicePageFormValues }) {
  const router = useRouter();
  const [form, setForm] = useState<ServicePageFormValues>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ value: string; label: string }[]>(
    initial.category ? [{ value: initial.category, label: initial.category }] : []
  );
  const isEdit = Boolean(initial.id);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then((d) => {
        const opts = (d.categories ?? []).map((c: { slug: string; name: string }) => ({ value: c.slug, label: c.name }));
        if (opts.length) {
          setCategories(opts);
          setForm((f) => (f.category ? f : { ...f, category: opts[0].value }));
        }
      })
      .catch(() => {});
  }, []);

  function update<K extends keyof ServicePageFormValues>(key: K, value: ServicePageFormValues[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setMessage(null);

    const payload = {
      ...form,
      body: parseBlogBody(form.bodyText),
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
            onChange={(e) => update("category", e.target.value)}
          >
            {categories.map((c) => (
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
        <label htmlFor="bodyText">Page content</label>
        <p className="text-muted mb-1 text-xs">
          Write the page the way you want it read. Blank line = new paragraph. Start a line with
          <code> ## </code> for a heading, <code> - </code> for a bullet, or paste an image URL on its own line.
          Leave this empty to use the structured sections below instead.
        </p>
        <textarea
          id="bodyText"
          className="input"
          rows={14}
          value={form.bodyText}
          onChange={(e) => update("bodyText", e.target.value)}
          placeholder={"## Smarter business travel\nWe handle flights, hotels and ground transport end to end.\n\n## What we cover\n- Domestic & international flights\n- Business hotels\n- Airport transfers"}
        />
      </div>

      <details className="rounded border p-3" style={{ borderColor: "var(--color-divider)" }}>
        <summary className="cursor-pointer text-sm font-semibold">
          Structured sections (used only when “Page content” above is empty)
        </summary>
        <div className="mt-4 flex flex-col gap-4">
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
        </div>
      </details>

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
