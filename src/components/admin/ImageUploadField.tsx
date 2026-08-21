"use client";

import { useRef, useState } from "react";

export function ImageUploadField({
  label,
  folder,
  value,
  onChange,
}: {
  label: string;
  folder: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

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
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="mb-2 h-32 w-full object-cover" style={{ border: "1px solid var(--color-divider)" }} />
      )}
      <input ref={inputRef} type="file" accept="image/*" className="input" onChange={handleFileChange} disabled={uploading} />
      {uploading && <p className="text-muted mt-1 text-xs">Uploading…</p>}
      {error && (
        <p className="mt-1 text-xs font-medium" style={{ color: "#b3261e" }}>
          {error}
        </p>
      )}
    </div>
  );
}
