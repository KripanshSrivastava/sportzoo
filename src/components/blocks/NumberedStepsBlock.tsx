import { Section, SectionHeading } from "@/components/ui/Section";
import { Blueprint } from "@/components/ui/Blueprint";

export function NumberedStepsBlock({
  eyebrow,
  title,
  description,
  items,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  items: { title: string; desc: string }[];
}) {
  return (
    <Section>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <ol className="mt-11 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((s, i) => (
          <Blueprint key={s.title} as="li" className="p-5">
            <span style={{ fontFamily: "var(--font-heading)", fontSize: "30px", fontWeight: 600, color: "var(--color-accent-700)" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="card-title mt-2 text-[15px]">{s.title}</p>
            <p className="card-body text-[12.5px]">{s.desc}</p>
          </Blueprint>
        ))}
      </ol>
    </Section>
  );
}
