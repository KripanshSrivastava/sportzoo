/**
 * Case study content.
 * TEMPLATE DATA — these three entries are structural placeholders, not real
 * client work. Replace title, category, challenge, solution, execution,
 * outcomes, and testimonial with a genuine completed engagement before
 * publishing. Never present placeholder content as a real case study.
 */

export interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  clientDescriptor: string; // e.g. "A 200-person technology company" — no real client name until confirmed
  summary: string;
  challenge: string;
  solution: string;
  execution: string;
  outcomes: string[];
  testimonial?: { quote: string; attribution: string };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "leadership-offsite-template",
    title: "[Replace: Leadership Offsite Case Study Title]",
    category: "Corporate Offsite",
    clientDescriptor: "[Replace with client descriptor, e.g. a 40-person leadership team from a mid-size technology company]",
    summary: "[Replace with a one-line summary of the engagement and outcome.]",
    challenge: "[Describe the client's planning challenge — timeline, budget constraint, or objective.]",
    solution: "[Describe the venue, format, and logistics approach Sportzoo proposed.]",
    execution: "[Describe how the offsite was delivered on the ground — team size, timeline, key decisions.]",
    outcomes: [
      "[Replace with a genuine, specific outcome — e.g. attendance rate, feedback score, budget adherence.]",
      "[Replace with a second outcome.]",
    ],
    testimonial: {
      quote: "[PLACEHOLDER TESTIMONIAL — replace with a genuine client quote before publishing.]",
      attribution: "[Name, Title, Company — replace with real attribution or remove this block.]",
    },
  },
  {
    slug: "annual-day-template",
    title: "[Replace: Annual Day Case Study Title]",
    category: "Annual Day",
    clientDescriptor: "[Replace with client descriptor.]",
    summary: "[Replace with a one-line summary of the engagement and outcome.]",
    challenge: "[Describe the client's planning challenge.]",
    solution: "[Describe the approach Sportzoo proposed.]",
    execution: "[Describe delivery on the ground.]",
    outcomes: ["[Replace with a genuine outcome.]", "[Replace with a second outcome.]"],
    testimonial: {
      quote: "[PLACEHOLDER TESTIMONIAL — replace before publishing.]",
      attribution: "[Name, Title, Company — replace or remove.]",
    },
  },
  {
    slug: "venue-and-artist-booking-template",
    title: "[Replace: Venue and Artist Booking Case Study Title]",
    category: "Venue & Artist Booking",
    clientDescriptor: "[Replace with client descriptor.]",
    summary: "[Replace with a one-line summary of the engagement and outcome.]",
    challenge: "[Describe the client's venue or entertainment sourcing challenge.]",
    solution: "[Describe the venue and/or artist booking approach Sportzoo proposed.]",
    execution: "[Describe delivery — shortlisting, contracting, on-the-day coordination.]",
    outcomes: ["[Replace with a genuine outcome.]", "[Replace with a second outcome.]"],
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
