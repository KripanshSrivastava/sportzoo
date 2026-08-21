import { Section, SectionHeading } from "@/components/ui/Section";
import { getPageContent, listOr } from "@/lib/pageContent";

// DEMO DATA — fictional quotes and names for preview purposes.
// Replace with real client feedback before launch.
const defaultTestimonials = [
  {
    quote:
      "We had six weeks and a leadership team that couldn't afford a badly run offsite. Elephant Corporate handled everything we didn't have time for and the whole thing ran itself.",
    name: "Ritika Sen",
    role: "Head of People, Nexora Tech",
  },
  {
    quote:
      "The venue capacity issue would have blindsided us on the day. Elephant Corporate caught it during shortlisting, not after we'd already booked.",
    name: "Arjun Malhotra",
    role: "Admin Manager, Bluewave Systems",
  },
  {
    quote:
      "One point of contact for the venue, the anchor, and the band meant we weren't juggling three vendor relationships during our launch week.",
    name: "Priya Nambiar",
    role: "Marketing Lead, Orbit Retail",
  },
];

export async function Testimonials() {
  const content = await getPageContent("home");
  const testimonials = listOr(content, "testimonials", defaultTestimonials);
  return (
    <Section>
      <SectionHeading eyebrow="Client Feedback" title="What clients say" />
      <div className="mt-11 grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <figure key={i} className="card m-0">
            <blockquote className="m-0 text-sm italic" style={{ color: "var(--color-text)", opacity: 0.85 }}>
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-3 text-[13px] font-semibold" style={{ fontSize: "13px" }}>
              {t.name}
              <span className="block font-normal" style={{ color: "var(--color-neutral-600)" }}>
                {t.role}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-4 text-center text-xs" style={{ color: "var(--color-neutral-500)" }}>
        Demo testimonials for preview purposes — replace with real client feedback before launch.
      </p>
    </Section>
  );
}
