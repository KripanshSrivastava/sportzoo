import { Section, SectionHeading } from "@/components/ui/Section";

const steps = [
  { n: "01", title: "Brief", desc: "Tell us your objective, headcount, dates, and budget — by call, WhatsApp, or the enquiry form." },
  { n: "02", title: "Proposal", desc: "We share a costed proposal with venue, travel, and format options within 24–48 hours." },
  { n: "03", title: "Planning", desc: "Once approved, we lock vendors, build the detailed schedule, and confirm every logistic." },
  { n: "04", title: "Execution", desc: "Our team manages the event or trip on the ground, in real time, start to finish." },
  { n: "05", title: "Reporting", desc: "You receive a wrap-up report — attendance, spend reconciliation, and photos — after every engagement." },
];

export function ProcessSteps() {
  return (
    <Section className="bg-white">
      <SectionHeading
        eyebrow="How It Works"
        title="A straightforward, five-step process"
        description="No lengthy back-and-forth before you get a real number. Here's exactly how an engagement with Sportzoo runs."
      />
      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((s) => (
          <li key={s.n} className="rounded-xl border border-slate-200 p-6">
            <span className="text-3xl font-bold text-[color:var(--color-accent)]">{s.n}</span>
            <h3 className="mt-3 text-base font-semibold text-[color:var(--color-navy-900)]">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
