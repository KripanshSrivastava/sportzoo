import { Section, SectionHeading } from "@/components/ui/Section";
import { JsonLd, faqJsonLd } from "@/components/seo/JsonLd";
import type { FaqItem } from "@/config/services";

export function FAQSection({
  faqs,
  title = "Frequently asked questions",
  eyebrow = "FAQs",
}: {
  faqs: FaqItem[];
  title?: string;
  eyebrow?: string;
}) {
  if (faqs.length === 0) return null;

  return (
    <Section className="bg-white">
      <JsonLd data={faqJsonLd(faqs)} />
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="mt-10 space-y-4">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-xl border border-slate-200 p-5 open:border-[color:var(--color-electric)]">
            <summary className="cursor-pointer list-none text-base font-semibold text-[color:var(--color-navy-900)] marker:content-none">
              <span className="flex items-center justify-between gap-4">
                {f.q}
                <span className="text-slate-400 group-open:rotate-45" aria-hidden="true">+</span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
