"use client";

import type { ImageItem } from "@/lib/blocks/schemas";
import type { ImageSpecKey } from "@/lib/imageSpecs";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

/**
 * An ordered list of uploaded images, each with an optional text label
 * (caption / company name). Used by the "images" page-builder field type —
 * e.g. the client-logo wall and image galleries.
 */
export function ImageListField({
  label,
  captionLabel = "Caption",
  showCaption = true,
  folder = "pages",
  spec,
  allowVideo = false,
  value,
  onChange,
}: {
  label: string;
  captionLabel?: string;
  showCaption?: boolean;
  folder?: string;
  spec?: ImageSpecKey;
  allowVideo?: boolean;
  value: ImageItem[];
  onChange: (next: ImageItem[]) => void;
}) {
  const items = Array.isArray(value) ? value : [];

  function update(index: number, patch: Partial<ImageItem>) {
    onChange(items.map((it, i) => (i === index ? { ...it, ...patch } : it)));
  }
  function remove(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }
  function move(index: number, dir: -1 | 1) {
    const next = [...items];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div className="field">
      <label>{label}</label>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div key={i} className="card flex flex-col gap-2 p-3">
            <div className="flex items-center justify-between">
              <span className="text-muted text-xs font-semibold">#{i + 1}</span>
              <div className="flex gap-1">
                <button type="button" className="btn btn-secondary" onClick={() => move(i, -1)} disabled={i === 0}>
                  ↑
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => move(i, 1)} disabled={i === items.length - 1}>
                  ↓
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => remove(i)}>
                  Remove
                </button>
              </div>
            </div>
            <ImageUploadField
              label={allowVideo ? "Photo or video" : "Image"}
              folder={folder}
              spec={spec}
              allowVideo={allowVideo}
              value={item.url ?? ""}
              onChange={(url) => update(i, { url })}
            />
            {showCaption && (
              <div className="field m-0">
                <label>{captionLabel}</label>
                <input
                  className="input"
                  value={item.caption ?? ""}
                  onChange={(e) => update(i, { caption: e.target.value })}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="btn btn-secondary mt-2"
        onClick={() => onChange([...items, { url: "", caption: "" }])}
        style={{ width: "fit-content" }}
      >
        {allowVideo ? "+ Add photo or video" : "+ Add image"}
      </button>
    </div>
  );
}
