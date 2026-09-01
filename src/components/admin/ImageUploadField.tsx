"use client";

import { useRef, useState } from "react";
import { IMAGE_SPECS, specSummary, type ImageSpec, type ImageSpecKey } from "@/lib/imageSpecs";

export function ImageUploadField({
  label,
  folder,
  value,
  onChange,
  spec: specProp,
}: {
  label: string;
  folder: string;
  value: string;
  onChange: (url: string) => void;
  /** A key from IMAGE_SPECS (or a full ImageSpec) — shows size/format guidance and filters the picker. */
  spec?: ImageSpecKey | ImageSpec;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const spec: ImageSpec | undefined = typeof specProp === "string" ? IMAGE_SPECS[specProp] : specProp;

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (spec && !spec.accept.split(",").includes(file.type)) {
      setError(`Use a ${spec.formats.map((f) => f.toUpperCase()).join(" or ")} file for this image.`);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.message ?? "Upload failed.");
        return;
      }
      onChange(data.url);
    } catch {
      setError("Couldn't reach the server.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="field">
      <label>{label}</label>
      {spec && (
        <p className="text-muted mt-0.5 mb-1.5 text-xs">
          {specSummary(spec)}
          <br />
          {spec.note}
        </p>
      )}
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="mb-2 h-32 w-full object-cover" style={{ border: "1px solid var(--color-divider)" }} />
      )}
      <input
        ref={inputRef}
        type="file"
        accept={spec?.accept ?? "image/*"}
        className="input"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p className="text-muted mt-1 text-xs">Uploading…</p>}
      {error && (
        <p className="mt-1 text-xs font-medium" style={{ color: "#b3261e" }}>
          {error}
        </p>
      )}
    </div>
  );
}
