import { Section, SectionHeading } from "@/components/ui/Section";
import { Blueprint } from "@/components/ui/Blueprint";

const reasons = [
  {
    title: "One team, not five vendors",
    desc: "Venue, artists, equipment, and on-ground execution managed by a single accountable team instead of coordinated across separate suppliers.",
  },
  {
    title: "Transparent, itemised costing",
    desc: "You see what you're paying for at every stage — no bundled markups or surprise line items after confirmation.",
  },
  {
    title: "Events, entertainment and venues under one roof",
    desc: "When your offsite needs a venue and a performer too, it's planned as one engagement by one team, not handed off between agencies.",
  },
  {
    title: "On-ground execution, not just planning",
    desc: "A dedicated coordinator is present at every event we manage — planning is only half the job.",
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
    <Section style={{ background: "var(--color-surface)" }}>
      <SectionHeading
        eyebrow="Why Elephant Corporate"
        title="Why companies choose Elephant Corporate"
        description="Corporate clients don't need another vendor — they need a partner who can be trusted with budget, timelines, and their people."
      />
      <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r) => (
          <Blueprint key={r.title} className="elev-sm p-3.5">
            <p className="card-title">{r.title}</p>
            <p className="card-body">{r.desc}</p>
          </Blueprint>
        ))}
      </div>
    </Section>
  );
}
