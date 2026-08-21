import { Section, SectionHeading } from "@/components/ui/Section";

const reasons = [
  {
    title: "One team, not five vendors",
    desc: "Venue, travel, stay, F&B, and on-ground execution managed by a single accountable team instead of coordinated across separate suppliers.",
  },
  {
    title: "Transparent, itemised costing",
    desc: "You see what you're paying for at every stage — no bundled markups or surprise line items after confirmation.",
  },
  {
    title: "Events and travel under one roof",
    desc: "When your offsite needs delegate travel too, it's planned as one itinerary by one team, not handed off between agencies.",
  },
  {
    title: "On-ground execution, not just planning",
    desc: "A dedicated coordinator is present at every event and travel movement we manage — planning is only half the job.",
  },
  {
    title: "Built for corporate procurement",
    desc: "Structured proposals, GST-compliant invoicing, and documentation that works with your finance and procurement process.",
  },
  {
    title: "Responsive communication",
    desc: "A single point of contact who responds within 24 hours, from first enquiry through post-event reporting.",
  },
];

export function WhyChooseUs() {
  return (
    <Section className="bg-slate-50">
      <SectionHeading
        eyebrow="Why Sportzoo"
        title="Why companies choose Sportzoo"
        description="Corporate clients don't need another vendor — they need a partner who can be trusted with budget, timelines, and their people."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r) => (
          <div key={r.title} className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-base font-semibold text-[color:var(--color-navy-900)]">{r.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{r.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
