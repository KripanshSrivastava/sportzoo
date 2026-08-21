import { Section, SectionHeading } from "@/components/ui/Section";
import { Blueprint } from "@/components/ui/Blueprint";

export function CardsGridBlock({
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
    <Section style={{ background: "var(--color-surface)" }}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Blueprint key={item.title} className="elev-sm p-3.5">
            <p className="card-title">{item.title}</p>
            <p className="card-body">{item.desc}</p>
          </Blueprint>
        ))}
      </div>
    </Section>
  );
}
