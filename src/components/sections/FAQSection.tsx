import { Section, SectionHeading } from "@/components/ui/Section";
import { Blueprint } from "@/components/ui/Blueprint";
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
    <Section style={{ background: "var(--color-surface)" }}>
      <JsonLd data={faqJsonLd(faqs)} />
      <div className="mx-auto max-w-[900px]">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="mt-9 flex flex-col gap-3">
          {faqs.map((f, i) => (
            <Blueprint key={f.q} as="details" className="group px-5 py-[18px]" {...(i === 0 ? { open: true } : {})}>
              <summary
                className="m-0 list-none"
                style={{ cursor: "pointer", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "16px" }}
              >
                <span className="flex items-center justify-between gap-4">
                  {f.q}
                  <span className="text-muted shrink-0 group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-2.5 text-sm leading-relaxed" style={{ color: "var(--color-neutral-700)" }}>
                {f.a}
              </p>
            </Blueprint>
          ))}
        </div>
      </div>
    </Section>
  );
}
