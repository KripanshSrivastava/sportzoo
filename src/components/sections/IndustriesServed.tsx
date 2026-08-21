import { Section, SectionHeading } from "@/components/ui/Section";

const industries = [
  "Information Technology & SaaS",
  "Banking, Financial Services & Insurance",
  "Manufacturing & Engineering",
  "Pharmaceuticals & Healthcare",
  "E-commerce & Retail",
  "Consulting & Professional Services",
  "FMCG & Consumer Goods",
  "Real Estate & Infrastructure",
];

export function IndustriesServed() {
  return (
    <Section className="bg-white">
      <SectionHeading eyebrow="Who We Work With" title="Industries we serve" />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {industries.map((i) => (
          <div
            key={i}
            className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 text-center text-sm font-medium text-slate-700"
          >
            {i}
          </div>
        ))}
      </div>
    </Section>
  );
}
