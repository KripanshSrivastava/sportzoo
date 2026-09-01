import type { Block, BlockType } from "./types";
import type { PageKey } from "@/lib/pageKeys";
import { placeholderPhoto } from "@/lib/placeholderImages";

function b(id: string, type: BlockType, props: Record<string, unknown>): Block {
  return { id, type, props };
}

const homeFaqs = [
  {
    q: "What does Elephant Corporate actually manage?",
    a: "Corporate events (offsites, annual day, recognition ceremonies, team building, gifting, conferences), artist booking and entertainment, venue booking, and event rentals and equipment — either as separate bookings or combined into one managed event.",
  },
  { q: "Which cities do you operate in?", a: "We're headquartered in our primary city and manage events, artist bookings, venues, and rentals across India." },
  { q: "How quickly can we get a quote?", a: "Most enquiries receive a costed proposal within 24–48 hours of sharing your requirements." },
  { q: "Do you work with companies of all sizes?", a: "Yes — from 15-person leadership offsites to company-wide annual day events with several hundred attendees." },
  {
    q: "How is Elephant Corporate different from a generic event management company?",
    a: "We manage corporate events, artist booking, venue booking, and rentals under one team, so logistics that usually get split across multiple vendors are planned and executed together.",
  },
];

export const DEFAULT_BLOCKS: Record<PageKey, Block[]> = {
  home: [
    b("home-hero", "hero", {
      eyebrow: "Corporate Event Management Partner",
      title: "Corporate Events, Artists, Venues and Rentals — Planned Precisely, Delivered End to End",
      description:
        "Elephant Corporate plans corporate offsites and employee engagement events, and books artists, venues, and event equipment for companies across Gurugram and India — one accountable team from the first brief to the final invoice.",
      imageUrl: placeholderPhoto("elephant-hero-offsite", 900, 675),
    }),
    b("home-categories", "categoryOverviewGrid", {
      eyebrow: "What We Do",
      title: "Four disciplines, one accountable partner",
      description:
        "Elephant Corporate plans corporate events end to end and books the artists, venues, and equipment behind them — so your event is planned by one team, not stitched together across separate vendors.",
    }),
    b("home-why", "cardsGrid", {
      eyebrow: "Why Elephant Corporate",
      title: "Why companies choose Elephant Corporate",
      description: "Corporate clients don't need another vendor — they need a partner who can be trusted with budget, timelines, and their people.",
      items: [
        { title: "One team, not five vendors", desc: "Venue, artists, equipment, and on-ground execution managed by a single accountable team instead of coordinated across separate suppliers." },
        { title: "Transparent, itemised costing", desc: "You see what you're paying for at every stage — no bundled markups or surprise line items after confirmation." },
        { title: "Events, entertainment and venues under one roof", desc: "When your offsite needs a venue and a performer too, it's planned as one engagement by one team, not handed off between agencies." },
        { title: "On-ground execution, not just planning", desc: "A dedicated coordinator is present at every event we manage — planning is only half the job." },
        { title: "Built for corporate procurement", desc: "Structured proposals, GST-compliant invoicing, and documentation that works with your finance and procurement process." },
        { title: "Responsive communication", desc: "A single point of contact who responds within 24 hours, from first enquiry through post-event reporting." },
      ],
    }),
    b("home-process", "numberedSteps", {
      eyebrow: "How It Works",
      title: "A straightforward, five-step process",
      description: "No lengthy back-and-forth before you get a real number. Here's exactly how an engagement with Elephant Corporate runs.",
      items: [
        { title: "Brief", desc: "Tell us your objective, headcount, dates, and budget — by call, WhatsApp, or the enquiry form." },
        { title: "Proposal", desc: "We share a costed proposal with venue, artist, and format options within 24–48 hours." },
        { title: "Planning", desc: "Once approved, we lock vendors, build the detailed schedule, and confirm every logistic." },
        { title: "Execution", desc: "Our team manages the event on the ground, in real time, start to finish." },
        { title: "Reporting", desc: "You receive a wrap-up report — attendance, spend reconciliation, and photos — after every engagement." },
      ],
    }),
    b("home-case-studies", "caseStudiesPreview", { eyebrow: "", title: "" }),
    b("home-clients", "clientLogos", {
      eyebrow: "Our Clients",
      title: "Companies that trust our work",
      logos: [
        { url: "", caption: "Khelomore" },
        { url: "", caption: "Genpact" },
        { url: "", caption: "Bain & Company" },
        { url: "", caption: "SMS Group" },
        { url: "", caption: "Samsung" },
        { url: "", caption: "Siemens" },
        { url: "", caption: "PayU" },
        { url: "", caption: "Fidelity" },
        { url: "", caption: "FIS" },
        { url: "", caption: "HDFC" },
        { url: "", caption: "Cognizant" },
      ],
    }),
    b("home-industries", "tagGrid", {
      eyebrow: "Who We Work With",
      title: "Industries we serve",
      items: [
        "Information Technology & SaaS",
        "Banking, Financial Services & Insurance",
        "Manufacturing & Engineering",
        "Pharmaceuticals & Healthcare",
        "E-commerce & Retail",
        "Consulting & Professional Services",
        "FMCG & Consumer Goods",
        "Real Estate & Infrastructure",
      ],
    }),
    b("home-testimonials", "testimonials", {
      eyebrow: "Client Feedback",
      title: "What clients say",
      items: [
        { quote: "We had six weeks and a leadership team that couldn't afford a badly run offsite. Elephant Corporate handled everything we didn't have time for and the whole thing ran itself.", name: "Ritika Sen", role: "Head of People, Nexora Tech" },
        { quote: "The venue capacity issue would have blindsided us on the day. Elephant Corporate caught it during shortlisting, not after we'd already booked.", name: "Arjun Malhotra", role: "Admin Manager, Bluewave Systems" },
        { quote: "One point of contact for the venue, the anchor, and the band meant we weren't juggling three vendor relationships during our launch week.", name: "Priya Nambiar", role: "Marketing Lead, Orbit Retail" },
      ],
    }),
    b("home-google-reviews", "googleReviews", {
      eyebrow: "Client Feedback",
      title: "What clients say on Google",
      rating: "",
      reviewCount: "",
      profileUrl: "",
      items: [],
    }),
    b("home-social", "socialFeed", {
      eyebrow: "Follow along",
      title: "From our socials",
      description: "",
      instagramUrls: [],
      youtubeUrls: [],
    }),
    b("home-stats", "statsBand", {
      items: [
        { value: "24–48 hrs", label: "Proposal turnaround" },
        { value: "Pan-India", label: "Service coverage" },
        { value: "1 dedicated", label: "Point of contact per client" },
        { value: "Every engagement", label: "On-ground presence" },
      ],
    }),
    b("home-locations", "serviceLocations", { eyebrow: "", title: "" }),
    b("home-faq", "faq", { title: "", items: homeFaqs }),
    b("home-leadform", "leadForm", { sourceLabel: "Home" }),
    b("home-cta", "ctaBand", { title: "", description: "" }),
  ],

  about: [
    b("about-hero", "hero", {
      eyebrow: "",
      title: "About Elephant Corporate",
      description:
        "Elephant Corporate exists because corporate events are usually planned by people whose actual job is something else — HR, admin, or the founder's office. We take that work off your plate, end to end.",
      imageUrl: "",
    }),
    b("about-intro", "richText", {
      eyebrow: "",
      title: "",
      body: [
        "Elephant Corporate is a corporate event management company serving companies across Gurugram and India. We work with HR managers, admin teams, founders, office managers, and procurement teams who need a single, accountable partner — not a list of vendors to coordinate independently.",
        "Our work spans four connected disciplines: corporate events (offsites, recognition ceremonies, annual day, sports days, team building, gifting, and conferences), artist booking and entertainment, venue booking and management, and event rentals and equipment. Because all four sit under one team, an offsite that needs a venue and entertainment, or a conference that needs AV production, is planned as one engagement — not handed off between separate agencies.",
        "We built Elephant Corporate around what corporate clients actually need from an events partner: fast, costed proposals; transparent line-item pricing; a dedicated point of contact; and on-ground execution that doesn't require your team to manage the day itself.",
      ],
    }),
    b("about-values", "cardsGrid", {
      eyebrow: "How We Work",
      title: "What we stand for",
      description: "",
      items: [
        { title: "Accountability over hand-offs", desc: "One team owns your event from brief to bill — we don't sub-contract the parts that are hard to coordinate." },
        { title: "Transparent costing", desc: "Every proposal is itemised. You know exactly what you're paying for at venue, artist, and production level." },
        { title: "Built for corporate process", desc: "GST-compliant invoicing, structured proposals, and documentation that works with how procurement and finance teams actually operate." },
        { title: "On-ground, not just on paper", desc: "An Elephant Corporate coordinator is physically present at every event we manage." },
      ],
    }),
    b("about-founder", "richText", {
      eyebrow: "Founder",
      title: "Led by Sachin",
      body: [
        "Elephant Corporate is run by Sachin, who oversees every engagement personally — from the first call through final execution — so clients have one accountable point of contact throughout.",
      ],
    }),
    b("about-leadform", "leadForm", { sourceLabel: "About" }),
    b("about-cta", "ctaBand", { title: "", description: "" }),
  ],

  contact: [
    b("contact-hero", "hero", {
      eyebrow: "",
      title: "Contact Us",
      description: "Have a question before requesting a quote? Reach us directly or send an enquiry below.",
      imageUrl: "",
    }),
    b("contact-split", "contactSplit", {}),
  ],

  "corporate-events-overview": [
    b("ce-hero", "hero", {
      eyebrow: "",
      title: "Corporate Event Management, Planned Around What Your Company Actually Needs",
      description:
        "From leadership offsites to company-wide annual day celebrations, Elephant Corporate plans and executes corporate events end to end — venue, logistics, production, and on-ground management — so your HR and admin teams can focus on the outcome, not the operations.",
      imageUrl: "",
    }),
    b("ce-services", "servicesGrid", {
      eyebrow: "Our Event Services",
      title: "Every corporate event, one planning team",
      description: "Each service below is planned and executed by the same Elephant Corporate team, so venue, catering, production, and logistics stay consistent across every event you run with us.",
      category: "corporate-events",
    }),
    b("ce-why", "richText", {
      eyebrow: "Why Elephant Corporate",
      title: "A planning process built for corporate accountability",
      body: [
        "Every engagement follows the same structure: a discovery call, a costed proposal within 24–48 hours, confirmed planning, on-ground execution, and a post-event report — so procurement and finance always know where things stand.",
      ],
    }),
    b("ce-faq", "faq", {
      title: "",
      items: [
        { q: "What types of corporate events does Elephant Corporate manage?", a: "Corporate offsites, rewards and recognition ceremonies, annual day events, corporate sports days, team-building outings, corporate gifting, and conferences or meetings — see each service page for details." },
        { q: "Can you handle events for both small teams and large organisations?", a: "Yes, we plan events from 15-person leadership offsites to company-wide gatherings of several hundred people." },
        { q: "Do you organise corporate events outside our primary city?", a: "Yes, we plan and execute events across India, and can coordinate outstation logistics as part of the engagement." },
        { q: "Can you also book the venue, entertainment, and equipment for our event?", a: "Yes — see our venue booking, artist booking, and event rentals services, which we frequently combine with event planning for offsites, annual day, and conferences." },
      ],
    }),
    b("ce-leadform", "leadForm", { sourceLabel: "Corporate Events" }),
    b("ce-cta", "ctaBand", { title: "", description: "" }),
  ],

  "artist-booking-overview": [
    b("ab-hero", "hero", {
      eyebrow: "",
      title: "Artist Booking & Entertainment for Corporate Events",
      description: "Elephant Corporate books singers, live bands, DJs, anchors, speakers, and comedians for corporate events — curated from a vetted talent network, briefed on your event, and coordinated end to end.",
      imageUrl: "",
    }),
    b("ab-services", "servicesGrid", {
      eyebrow: "Our Talent Services",
      title: "Every act, one booking team",
      description: "Whichever performer or presenter you need, the same Elephant Corporate team handles shortlisting, contracting, technical requirements, and on-day coordination.",
      category: "artist-booking",
    }),
    b("ab-faq", "faq", {
      title: "",
      items: [
        { q: "What kinds of performers can Elephant Corporate book for corporate events?", a: "Live singers and bands, DJs, anchors and emcees, motivational speakers, stand-up comedians, and specialty acts — see each service page for details." },
        { q: "Are the performers verified for corporate event experience?", a: "Yes, we work from a vetted talent network and screen for corporate-appropriate content and prior corporate event experience." },
        { q: "Can artist booking be combined with an event you're managing for us?", a: "Yes — this is common for annual day, recognition ceremonies, and conferences we manage end to end." },
      ],
    }),
    b("ab-leadform", "leadForm", { sourceLabel: "Artist Booking" }),
    b("ab-cta", "ctaBand", { title: "", description: "" }),
  ],

  "venue-booking-overview": [
    b("vb-hero", "hero", {
      eyebrow: "",
      title: "Venue Booking & Management for Corporate Events",
      description: "Elephant Corporate sources and books conference halls, offsite resorts, and banquet venues — with capacity, AV, and access verified before you commit, and rates negotiated on your behalf.",
      imageUrl: "",
    }),
    b("vb-services", "servicesGrid", {
      eyebrow: "Our Venue Services",
      title: "Every venue type, one sourcing team",
      description: "Whichever format you need, the same Elephant Corporate team verifies capacity and AV, negotiates rates, and coordinates the venue relationship through your event.",
      category: "venue-booking",
    }),
    b("vb-faq", "faq", {
      title: "",
      items: [
        { q: "What kinds of venues does Elephant Corporate book?", a: "Conference halls and meeting venues, offsite and retreat venues, and banquet or large-format venues — see each service page for details." },
        { q: "Do you verify capacity and AV before booking?", a: "Yes, we verify usable capacity, AV, and connectivity before shortlisting a venue, not after you've committed." },
        { q: "Can venue booking be combined with equipment and production?", a: "Yes — see our event rentals and equipment services for AV, decor, and production add-ons." },
      ],
    }),
    b("vb-leadform", "leadForm", { sourceLabel: "Venue Booking" }),
    b("vb-cta", "ctaBand", { title: "", description: "" }),
  ],

  "event-rentals-overview": [
    b("er-hero", "hero", {
      eyebrow: "",
      title: "Event Rentals & Equipment for Corporate Events",
      description: "Elephant Corporate rents and manages AV equipment, decor and branding, and engagement activities for corporate events — staffed on-site through setup, the live event, and teardown.",
      imageUrl: "",
    }),
    b("er-services", "servicesGrid", {
      eyebrow: "Our Rental Services",
      title: "Every rental category, one production team",
      description: "Whichever equipment or activity you need, the same Elephant Corporate team handles sourcing, setup, on-site staffing, and teardown.",
      category: "event-rentals",
    }),
    b("er-faq", "faq", {
      title: "",
      items: [
        { q: "What kinds of equipment and services does Elephant Corporate rent?", a: "Audio visual and production equipment, decor/tent/branding, and event games and engagement activities — see each service page for details." },
        { q: "Does rental include staff to operate the equipment?", a: "Yes, our rentals include on-site technicians or attendants, not just equipment drop-off." },
        { q: "Can event rentals be booked for a venue you didn't source for us?", a: "Yes, equipment and production services can be booked independently of who booked the venue." },
      ],
    }),
    b("er-leadform", "leadForm", { sourceLabel: "Event Rentals & Equipment" }),
    b("er-cta", "ctaBand", { title: "", description: "" }),
  ],
};
