import { Section, SectionHeading } from "@/components/ui/Section";

export function TagGridBlock({ eyebrow, title, items }: { eyebrow?: string; title: string; items: string[] }) {
  return (
    <Section className="bg-white">
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((i) => (
          <div key={i} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 text-center text-sm font-medium text-slate-700">
            {i}
          </div>
        ))}
      </div>
    </Section>
  );
}
