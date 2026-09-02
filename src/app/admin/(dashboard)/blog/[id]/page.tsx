"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BlogPostForm, blocksToText, type BlogPostFormValues } from "@/components/admin/BlogPostForm";

export default function EditBlogPostPage() {
  const params = useParams<{ id: string }>();
  const [initial, setInitial] = useState<BlogPostFormValues | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/blog/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.ok) {
          setError(data.message ?? "Not found.");
          return;
        }
        const p = data.post;
        setInitial({
          id: p.id,
          slug: p.slug,
          title: p.title,
          description: p.description ?? "",
          cluster: p.cluster ?? "",
          coverImageUrl: p.coverImageUrl ?? "",
          bodyText: blocksToText(p.body ?? []),
          relatedServicePath: p.relatedServicePath ?? "",
          relatedServiceLabel: p.relatedServiceLabel ?? "",
          datePublished: (p.datePublished ?? "").slice(0, 10),
          published: p.published,
        });
      })
      .catch(() => setError("Couldn't load this post."));
  }, [params.id]);

  return (
    <div>
      <h1>Edit Blog Post</h1>
      {error && <p style={{ color: "#b3261e" }}>{error}</p>}
      {!initial && !error && <p className="text-muted text-sm">Loading…</p>}
      {initial && <BlogPostForm initial={initial} />}
    </div>
  );
}
