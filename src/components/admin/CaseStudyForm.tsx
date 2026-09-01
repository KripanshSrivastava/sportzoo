"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ImageListField } from "@/components/admin/ImageListField";

export interface CaseStudyFormValues {
  id?: string;
  slug: string;
  title: string;
  category: string;
  clientDescriptor: string;
  summary: string;
  challenge: string;
  solution: string;
  execution: string;
  outcomes: string[];
  testimonialQuote: string;
  testimonialAttribution: string;
  coverImageUrl: string;
  galleryMediaUrls: string[];
  published: boolean;
}

export const emptyCaseStudy: CaseStudyFormValues = {
  slug: "",
  title: "",
  category: "Corporate Event",
  clientDescriptor: "",
  summary: "",
  challenge: "",
  solution: "",
  execution: "",
  outcomes: [""],
  testimonialQuote: "",
  testimonialAttribution: "",
  coverImageUrl: "",
  galleryMediaUrls: [],
  published: true,
};

export function CaseStudyForm({ initial }: { initial: CaseStudyFormValues }) {
  const router = useRouter();
  const [form, setForm] = useState<CaseStudyFormValues>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const isEdit = Boolean(initial.id);

  function update<K extends keyof CaseStudyFormValues>(key: K, value: CaseStudyFormValues[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setMessage(null);

    const payload = { ...form, outcomes: form.outcomes.filter((o) => o.trim().length > 0) };
    const url = isEdit ? `/api/admin/case-studies/${initial.id}` : "/api/admin/case-studies";
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
      router.push("/admin/case-studies");
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
          <input id="slug" className="input" value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="e.g. acme-corp-annual-day" />
        </div>
      )}

      <div className="field">
        <label htmlFor="category">Category</label>
        <input id="category" className="input" value={form.category} onChange={(e) => update("category", e.target.value)} />
      </div>

      <div className="field">
        <label htmlFor="clientDescriptor">Client descriptor</label>
        <input
          id="clientDescriptor"
          className="input"
          placeholder="e.g. A 200-person technology company"
          value={form.clientDescriptor}
          onChange={(e) => update("clientDescriptor", e.target.value)}
        />
      </div>

      <ImageUploadField label="Cover photo" folder="case-studies" spec="caseCover" value={form.coverImageUrl} onChange={(url) => update("coverImageUrl", url)} />

      <ImageListField
        label="Photo &amp; video gallery (optional)"
        folder="case-studies"
        spec="galleryMedia"
        allowVideo
        showCaption={false}
        value={form.galleryMediaUrls.map((url) => ({ url }))}
        onChange={(items) => update("galleryMediaUrls", items.map((i) => i.url).filter(Boolean))}
      />

      <div className="field">
        <label htmlFor="summary">One-line summary</label>
        <textarea id="summary" className="input" rows={2} value={form.summary} onChange={(e) => update("summary", e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="challenge">Challenge</label>
        <textarea id="challenge" className="input" rows={3} value={form.challenge} onChange={(e) => update("challenge", e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="solution">Solution</label>
        <textarea id="solution" className="input" rows={3} value={form.solution} onChange={(e) => update("solution", e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="execution">Execution</label>
        <textarea id="execution" className="input" rows={3} value={form.execution} onChange={(e) => update("execution", e.target.value)} />
      </div>

      <div className="field">
        <label>Outcomes (one per line)</label>
        <textarea
          className="input"
          rows={4}
          value={form.outcomes.join("\n")}
          onChange={(e) => update("outcomes", e.target.value.split("\n"))}
        />
      </div>

      <div className="field">
        <label htmlFor="testimonialQuote">Testimonial quote (optional)</label>
        <textarea id="testimonialQuote" className="input" rows={2} value={form.testimonialQuote} onChange={(e) => update("testimonialQuote", e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="testimonialAttribution">Testimonial attribution</label>
        <input
          id="testimonialAttribution"
          className="input"
          placeholder="Name, Title, Company"
          value={form.testimonialAttribution}
          onChange={(e) => update("testimonialAttribution", e.target.value)}
        />
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
        {status === "saving" ? "Saving…" : isEdit ? "Save Changes" : "Create Case Study"}
      </button>
    </form>
  );
}
