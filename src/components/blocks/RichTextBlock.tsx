import { Section, SectionHeading } from "@/components/ui/Section";

export function RichTextBlock({ eyebrow, title, body }: { eyebrow?: string; title?: string; body: string[] }) {
  return (
    <Section className="bg-white">
      {(eyebrow || title) && <SectionHeading eyebrow={eyebrow} title={title ?? ""} />}
      <div className={`max-w-3xl space-y-5 text-base leading-relaxed text-slate-700 ${eyebrow || title ? "mt-6" : ""}`}>
        {body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </Section>
  );
}
