"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { parseBlogBody, serializeBlogBody } from "@/lib/blogBody";
import type { BlogBlock } from "@/content/blog";

export interface BlogPostFormValues {
  id?: string;
  slug: string;
  title: string;
  description: string;
  cluster: string;
  coverImageUrl: string;
  bodyText: string;
  relatedServicePath: string;
  relatedServiceLabel: string;
  datePublished: string;
  published: boolean;
}

export const emptyBlogPost: BlogPostFormValues = {
  slug: "",
  title: "",
  description: "",
  cluster: "",
  coverImageUrl: "",
  bodyText: "",
  relatedServicePath: "",
  relatedServiceLabel: "",
  datePublished: "",
  published: true,
};

export function blocksToText(body: BlogBlock[]): string {
  return serializeBlogBody(body);
}

export function BlogPostForm({ initial }: { initial: BlogPostFormValues }) {
  const router = useRouter();
  const [form, setForm] = useState<BlogPostFormValues>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const isEdit = Boolean(initial.id);

  function update<K extends keyof BlogPostFormValues>(key: K, value: BlogPostFormValues[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setMessage(null);

    const payload = {
      ...form,
      slug: form.slug || undefined,
      body: parseBlogBody(form.bodyText),
    };
    const url = isEdit ? `/api/admin/blog/${initial.id}` : "/api/admin/blog";
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
      router.push("/admin/blog");
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
        <input id="title" className="input" required value={form.title} onChange={(e) => update("title", e.target.value)} />
      </div>

      {!isEdit && (
        <div className="field">
          <label htmlFor="slug">URL slug (leave blank to generate from title)</label>
          <input id="slug" className="input" value={form.slug} onChange={(e) => update("slug", e.target.value)} />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="field">
          <label htmlFor="cluster">Topic / cluster</label>
          <input id="cluster" className="input" value={form.cluster} onChange={(e) => update("cluster", e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="datePublished">Publish date</label>
          <input
            id="datePublished"
            type="date"
            className="input"
            value={form.datePublished}
            onChange={(e) => update("datePublished", e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="description">Excerpt / meta description</label>
        <textarea id="description" className="input" rows={2} value={form.description} onChange={(e) => update("description", e.target.value)} />
      </div>

      <ImageUploadField
        label="Cover image"
        folder="blog"
        spec="caseCover"
        value={form.coverImageUrl}
        onChange={(url) => update("coverImageUrl", url)}
      />

      <div className="field">
        <label htmlFor="body">Article body</label>
        <textarea id="body" className="input" rows={16} value={form.bodyText} onChange={(e) => update("bodyText", e.target.value)} />
        <p className="text-muted mt-1 text-xs">
          Blank line = new paragraph. <code>## Heading</code> for a subheading. <code>- item</code> lines for a bullet
          list. <code>![](image-url)</code> or a bare image URL on its own line to add a photo.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="field">
          <label htmlFor="rsp">Related service URL (optional)</label>
          <input
            id="rsp"
            className="input"
            placeholder="/corporate-events/corporate-offsite-planning"
            value={form.relatedServicePath}
            onChange={(e) => update("relatedServicePath", e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="rsl">Related service label</label>
          <input id="rsl" className="input" value={form.relatedServiceLabel} onChange={(e) => update("relatedServiceLabel", e.target.value)} />
        </div>
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
        {status === "saving" ? "Saving…" : isEdit ? "Save Changes" : "Create Post"}
      </button>
    </form>
  );
}
