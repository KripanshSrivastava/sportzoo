import { Section, SectionHeading } from "@/components/ui/Section";

export function TestimonialsBlock({
  eyebrow,
  title,
  items,
}: {
  eyebrow?: string;
  title: string;
  items: { quote: string; name: string; role: string }[];
}) {
  return (
    <Section>
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="mt-11 grid gap-5 md:grid-cols-3">
        {items.map((t, i) => (
          <figure key={i} className="card m-0">
            <blockquote className="m-0 text-sm italic" style={{ color: "var(--color-text)", opacity: 0.85 }}>
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-3 text-[13px] font-semibold" style={{ fontSize: "13px" }}>
              {t.name}
              <span className="block font-normal" style={{ color: "var(--color-neutral-600)" }}>
                {t.role}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
