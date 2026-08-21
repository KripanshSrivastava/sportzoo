import { Section, SectionHeading } from "@/components/ui/Section";

const testimonials = [
  {
    quote: "[PLACEHOLDER TESTIMONIAL — replace with a genuine client quote before launch.]",
    name: "[Name]",
    role: "[Title, Company]",
  },
  {
    quote: "[PLACEHOLDER TESTIMONIAL — replace with a genuine client quote before launch.]",
    name: "[Name]",
    role: "[Title, Company]",
  },
  {
    quote: "[PLACEHOLDER TESTIMONIAL — replace with a genuine client quote before launch.]",
    name: "[Name]",
    role: "[Title, Company]",
  },
];

export function Testimonials() {
  return (
    <Section className="bg-white">
      <SectionHeading eyebrow="Client Feedback" title="What clients say" />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <figure key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <blockquote className="text-sm italic leading-relaxed text-slate-600">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="mt-4 text-sm font-semibold text-[color:var(--color-navy-900)]">
              {t.name}
              <span className="block font-normal text-slate-500">{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-slate-400">
        Placeholder testimonials — replace with real client feedback before launch.
      </p>
    </Section>
  );
}
