import { Section, SectionHeading } from "@/components/ui/Section";
import { getPageContent, listOr } from "@/lib/pageContent";

const defaultIndustries = [
  "Information Technology & SaaS",
  "Banking, Financial Services & Insurance",
  "Manufacturing & Engineering",
  "Pharmaceuticals & Healthcare",
  "E-commerce & Retail",
  "Consulting & Professional Services",
  "FMCG & Consumer Goods",
  "Real Estate & Infrastructure",
];

export async function IndustriesServed() {
  const content = await getPageContent("home");
  const industries = listOr(content, "industries", defaultIndustries);
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
