/**
 * Case study content.
 * DEMO DATA — these three entries use a fictional client ("Nexora Tech")
 * so the site previews and reads as finished. Replace title, category,
 * client descriptor, challenge, solution, execution, outcomes, and
 * testimonial with genuine completed engagements before publishing.
 * Never present placeholder content as a real case study on a live site.
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
    title: "A 3-Day Leadership Offsite for a Growing Tech Team",
    category: "Corporate Offsite",
    clientDescriptor: "A 45-person leadership team from a mid-size technology company",
    summary: "A tight 6-week timeline, a fixed per-person budget, and a venue that finally had AV that worked.",
    challenge:
      "The client's leadership team needed a 3-day offsite before the new financial year, but had just 6 weeks to plan it internally alongside their regular workload, with a fixed budget that earlier venue quotes were already exceeding.",
    solution:
      "Elephant Corporate shortlisted three retreat venues within budget within 48 hours, verified AV and breakout space in person, and built a run-of-show that split the agenda into focused morning sessions and unstructured afternoons.",
    execution:
      "A single Elephant Corporate coordinator managed venue confirmation, rooming, and F&B, and was on-site for all three days to run the schedule so the leadership team could stay in the room instead of managing logistics.",
    outcomes: [
      "Venue and full itinerary confirmed within 9 days of the first call",
      "Delivered within 4% of the original per-person budget",
      "All three days ran on schedule with no logistics escalations to the client",
    ],
    testimonial: {
      quote:
        "We had six weeks and a leadership team that couldn't afford a badly run offsite. Elephant Corporate handled everything we didn't have time for and the whole thing ran itself.",
      attribution: "Head of People, Nexora Tech (demo testimonial)",
    },
  },
  {
    slug: "annual-day-template",
    title: "A Family-Inclusive Annual Day for 600 Guests",
    category: "Annual Day",
    clientDescriptor: "A 350-employee manufacturing company, with families invited",
    summary: "A banquet venue, a recognition segment, and a guest list that nearly doubled once families were counted.",
    challenge:
      "The client wanted to combine their annual day with employee recognition for the first time, but hadn't accounted for the venue capacity and catering needed once employee families were added to the guest list.",
    solution:
      "Elephant Corporate re-shortlisted venues against the real 600-guest count, built a combined run-of-show for the celebration and award segments, and planned catering and seating around a mixed-age, family-inclusive crowd.",
    execution:
      "Decor, stage production, and an anchor were booked through Elephant Corporate's artist and venue network, with a rehearsal held the evening before to lock award sequencing and presenter timing.",
    outcomes: [
      "Usable venue capacity confirmed for 600 guests with no last-minute overflow issues",
      "Recognition segment ran without a single award mix-up on stage",
      "Post-event feedback survey scored the event 4.6/5 from attending families",
    ],
  },
  {
    slug: "venue-and-artist-booking-template",
    title: "Venue and Entertainment Booking for a Product Launch",
    category: "Venue & Artist Booking",
    clientDescriptor: "A consumer electronics brand launching a new product line",
    summary: "A 3-week deadline for a venue, an anchor, and a live performance act, booked and contracted together.",
    challenge:
      "The client's marketing team needed a launch venue with strong AV and a presence-building entertainment segment, but had only 3 weeks and no existing vendor relationships to draw on.",
    solution:
      "Elephant Corporate shortlisted two large-format venues with tested AV and staging, and in parallel curated an anchor and a live band matched to the brand's audience, contracting both through a single point of contact.",
    execution:
      "Technical riders were coordinated with the venue ahead of time, and a Elephant Corporate coordinator managed performer arrival, soundcheck, and the anchor's run-of-show through the event.",
    outcomes: [
      "Venue and entertainment confirmed within 8 days, inside the 3-week deadline",
      "Zero technical delays during the live segment",
      "Client rebooked Elephant Corporate for their next regional launch event",
    ],
  },
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
