"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FieldSchema } from "@/lib/pageContentSchemas";
import { linesToList, linesToObjects, listToLines, objectsToLines } from "@/lib/pageContentSchemas";
import type { PageKey } from "@/lib/pageContent";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

function contentToFormValues(fields: FieldSchema[], content: Record<string, unknown>): Record<string, string> {
  const values: Record<string, string> = {};
  for (const field of fields) {
    const raw = content[field.key];
    if (field.type === "text" || field.type === "textarea" || field.type === "image") {
      values[field.key] = typeof raw === "string" ? raw : "";
    } else if (field.type === "lines") {
      values[field.key] = listToLines(raw);
    } else {
      values[field.key] = objectsToLines(raw, field.parts ?? []);
    }
  }
  return values;
}

function formValuesToContent(fields: FieldSchema[], values: Record<string, string>): Record<string, unknown> {
  const content: Record<string, unknown> = {};
  for (const field of fields) {
    const raw = values[field.key] ?? "";
    if (field.type === "text" || field.type === "textarea" || field.type === "image") {
      content[field.key] = raw;
    } else if (field.type === "lines") {
      content[field.key] = linesToList(raw);
    } else {
      content[field.key] = linesToObjects(raw, field.parts ?? []);
    }
  }
  return content;
}

export function PageContentForm({
  pageKey,
  fields,
  initialContent,
}: {
  pageKey: PageKey;
  fields: FieldSchema[];
  initialContent: Record<string, unknown>;
}) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(() => contentToFormValues(fields, initialContent));
  const [status, setStatus] = useState<"idle" | "saving" | "error" | "saved">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/page-content/${pageKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValuesToContent(fields, values)),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data.message ?? "Failed to save.");
        return;
      }
      setStatus("saved");
      router.refresh();
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-3xl flex-col gap-4">
      {fields.map((field) =>
        field.type === "image" ? (
          <ImageUploadField
            key={field.key}
            label={field.label}
            folder="pages"
            value={values[field.key] ?? ""}
            onChange={(url) => setValues((v) => ({ ...v, [field.key]: url }))}
          />
        ) : (
          <div className="field" key={field.key}>
            <label htmlFor={field.key}>{field.label}</label>
            {field.type === "text" ? (
              <input
                id={field.key}
                className="input"
                value={values[field.key] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
              />
            ) : (
              <textarea
                id={field.key}
                className="input"
                rows={field.type === "textarea" ? 3 : 5}
                value={values[field.key] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
              />
            )}
            {field.hint && <p className="text-muted mt-1 text-xs">{field.hint}</p>}
          </div>
        )
      )}

      {message && (
        <p className="text-sm font-medium" style={{ color: "#b3261e" }}>
          {message}
        </p>
      )}
      {status === "saved" && <p className="text-sm font-medium text-emerald-600">Saved.</p>}

      <button type="submit" className="btn btn-primary" disabled={status === "saving"} style={{ width: "fit-content" }}>
        {status === "saving" ? "Saving…" : "Save Changes"}
      </button>
    </form>
  );
}
