"use client";

import type { FieldSchema, ImageItem } from "@/lib/blocks/schemas";
import { linesToList, linesToObjects, listToLines, objectsToLines } from "@/lib/blocks/schemas";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ImageListField } from "@/components/admin/ImageListField";

function propToLineValue(field: FieldSchema, raw: unknown): string {
  if (field.type === "text" || field.type === "textarea" || field.type === "image") return typeof raw === "string" ? raw : "";
  if (field.type === "lines") return listToLines(raw);
  return objectsToLines(raw, field.parts ?? []);
}

function lineValueToProp(field: FieldSchema, value: string): unknown {
  if (field.type === "text" || field.type === "textarea" || field.type === "image") return value;
  if (field.type === "lines") return linesToList(value);
  return linesToObjects(value, field.parts ?? []);
}

export function BlockFieldsEditor({
  fields,
  props,
  onChange,
}: {
  fields: FieldSchema[];
  props: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
}) {
  if (fields.length === 0) {
    return <p className="text-muted text-xs">This section has no editable content — it pulls its content live from other admin sections.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {fields.map((field) =>
        field.type === "images" ? (
          <ImageListField
            key={field.key}
            label={field.label}
            captionLabel={field.captionLabel}
            spec={field.spec}
            allowVideo={field.allowVideo}
            value={(Array.isArray(props[field.key]) ? props[field.key] : []) as ImageItem[]}
            onChange={(next) => onChange({ ...props, [field.key]: next })}
          />
        ) : field.type === "image" ? (
          <ImageUploadField
            key={field.key}
            label={field.label}
            folder="pages"
            spec={field.spec}
            allowVideo={field.allowVideo}
            value={propToLineValue(field, props[field.key])}
            onChange={(url) => onChange({ ...props, [field.key]: url })}
          />
        ) : (
          <div className="field" key={field.key}>
            <label>{field.label}</label>
            {field.type === "text" ? (
              <input
                className="input"
                value={propToLineValue(field, props[field.key])}
                onChange={(e) => onChange({ ...props, [field.key]: lineValueToProp(field, e.target.value) })}
              />
            ) : (
              <textarea
                className="input"
                rows={field.type === "textarea" ? 3 : 5}
                value={propToLineValue(field, props[field.key])}
                onChange={(e) => onChange({ ...props, [field.key]: lineValueToProp(field, e.target.value) })}
              />
            )}
            {field.hint && <p className="text-muted mt-1 text-xs">{field.hint}</p>}
          </div>
        )
      )}
    </div>
  );
}
