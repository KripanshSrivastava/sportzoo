"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CaseStudyForm, type CaseStudyFormValues } from "@/components/admin/CaseStudyForm";

export default function EditCaseStudyPage() {
  const params = useParams<{ id: string }>();
  const [initial, setInitial] = useState<CaseStudyFormValues | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/case-studies/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.ok) {
          setError(data.message ?? "Not found.");
          return;
        }
        const c = data.caseStudy;
        setInitial({
          id: c.id,
          slug: c.slug,
          title: c.title,
          category: c.category,
          clientDescriptor: c.client_descriptor ?? "",
          summary: c.summary ?? "",
          challenge: c.challenge ?? "",
          solution: c.solution ?? "",
          execution: c.execution ?? "",
          outcomes: c.outcomes?.length ? c.outcomes : [""],
          testimonialQuote: c.testimonial_quote ?? "",
          testimonialAttribution: c.testimonial_attribution ?? "",
          coverImageUrl: c.cover_image_url ?? "",
          published: c.published,
        });
      })
      .catch(() => setError("Couldn't load this case study."));
  }, [params.id]);

  return (
    <div>
      <h1>Edit Case Study</h1>
      {error && <p style={{ color: "#b3261e" }}>{error}</p>}
      {!initial && !error && <p className="text-muted text-sm">Loading…</p>}
      {initial && <CaseStudyForm initial={initial} />}
    </div>
  );
}
