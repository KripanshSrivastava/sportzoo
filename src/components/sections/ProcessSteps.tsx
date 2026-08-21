import { Section, SectionHeading } from "@/components/ui/Section";
import { Blueprint } from "@/components/ui/Blueprint";
import { getPageContent, listOr } from "@/lib/pageContent";

const defaultSteps = [
  { title: "Brief", desc: "Tell us your objective, headcount, dates, and budget — by call, WhatsApp, or the enquiry form." },
  { title: "Proposal", desc: "We share a costed proposal with venue, artist, and format options within 24–48 hours." },
  { title: "Planning", desc: "Once approved, we lock vendors, build the detailed schedule, and confirm every logistic." },
  { title: "Execution", desc: "Our team manages the event on the ground, in real time, start to finish." },
  { title: "Reporting", desc: "You receive a wrap-up report — attendance, spend reconciliation, and photos — after every engagement." },
];

export async function ProcessSteps() {
  const content = await getPageContent("home");
  const steps = listOr(content, "processSteps", defaultSteps);
  return (
    <Section>
      <SectionHeading
        eyebrow="How It Works"
        title="A straightforward, five-step process"
        description="No lengthy back-and-forth before you get a real number. Here's exactly how an engagement with Elephant Corporate runs."
      />
      <ol className="mt-11 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((s, i) => (
          <Blueprint key={s.title} as="li" className="p-5">
            <span style={{ fontFamily: "var(--font-heading)", fontSize: "30px", fontWeight: 600, color: "var(--color-accent-700)" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="card-title mt-2 text-[15px]">{s.title}</p>
            <p className="card-body text-[12.5px]">{s.desc}</p>
          </Blueprint>
        ))}
      </ol>
    </Section>
  );
}
