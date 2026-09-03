"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  ServicePageForm,
  listToLines,
  pairsToLines,
  blocksToBodyText,
  type ServicePageFormValues,
} from "@/components/admin/ServicePageForm";

export default function EditServicePagePage() {
  const params = useParams<{ id: string }>();
  const [initial, setInitial] = useState<ServicePageFormValues | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/service-pages/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.ok) {
          setError(data.message ?? "Not found.");
          return;
        }
        const s = data.servicePage;
        setInitial({
          id: s.id,
          slug: s.slug,
          category: s.category,
          name: s.name,
          h1: s.h1 ?? "",
          metaTitle: s.metaTitle ?? "",
          metaDescription: s.metaDescription ?? "",
          bodyText: blocksToBodyText(s.body),
          intro: listToLines(s.intro),
          problems: listToLines(s.problems),
          inclusions: pairsToLines(s.inclusions, ["title", "desc"]),
          process: pairsToLines(s.process, ["title", "desc"]),
          benefits: listToLines(s.benefits),
          useCases: listToLines(s.useCases),
          faqs: pairsToLines(s.faqs, ["q", "a"]),
          heroImageUrl: s.heroImageUrl ?? "",
          galleryImageUrls: Array.isArray(s.galleryImageUrls) ? s.galleryImageUrls : [],
          published: s.published,
        });
      })
      .catch(() => setError("Couldn't load this page."));
  }, [params.id]);

  return (
    <div>
      <h1>Edit Service Page</h1>
      {error && <p style={{ color: "#b3261e" }}>{error}</p>}
      {!initial && !error && <p className="text-muted text-sm">Loading…</p>}
      {initial && <ServicePageForm initial={initial} />}
    </div>
  );
}
