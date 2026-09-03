// Category slugs are dynamic — managed from /admin/categories and stored in the
// service_categories table. This stays as a plain string alias so existing code
// keeps type-checking; the four originals below are only seed data now.
export type ServiceCategory = string;

export interface CategorySeed {
  slug: string;
  name: string;
  h1: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
}

/**
 * The original four service categories. Seeded into service_categories by
 * supabase/schema.sql; also the fallback the app renders when that table is
 * empty or unreachable (e.g. before the migration is run).
 */
export const CATEGORY_SEEDS: CategorySeed[] = [
  {
    slug: "corporate-events",
    name: "Corporate Events",
    h1: "Corporate Event Management, Handled End to End",
    intro:
      "Offsites, annual day, recognition ceremonies, sports days, team building, gifting, and conferences — planned and run by one accountable team.",
    metaTitle: "Corporate Event Management Company | Elephant Corporate",
    metaDescription:
      "Elephant Corporate is a corporate event management company handling offsites, annual day, recognition ceremonies, sports days, team building, gifting, and conferences — end to end.",
  },
  {
    slug: "artist-booking",
    name: "Artist Booking & Entertainment",
    h1: "Artist Booking & Entertainment for Corporate Events",
    intro:
      "Singers, bands, DJs, anchors, speakers, and comedians for corporate events — vetted, briefed, and coordinated end to end.",
    metaTitle: "Artist Booking & Entertainment for Corporate Events | Elephant Corporate",
    metaDescription:
      "Elephant Corporate books singers, bands, DJs, anchors, speakers, and comedians for corporate events — vetted, briefed, and coordinated end to end.",
  },
  {
    slug: "venue-booking",
    name: "Venue Booking & Management",
    h1: "Corporate Venue Booking & Management",
    intro:
      "Conference halls, offsite resorts, and banquet venues for corporate events — capacity and AV verified before you commit.",
    metaTitle: "Corporate Venue Booking & Management | Elephant Corporate",
    metaDescription:
      "Elephant Corporate sources and books conference halls, offsite resorts, and banquet venues for corporate events — capacity and AV verified before you commit.",
  },
  {
    slug: "event-rentals",
    name: "Event Rentals & Equipment",
    h1: "Event Rentals & Equipment for Corporate Events",
    intro:
      "AV equipment, decor and branding, and engagement activities for corporate events — staffed on-site, not just dropped off.",
    metaTitle: "Event Rentals & Equipment for Corporate Events | Elephant Corporate",
    metaDescription:
      "Elephant Corporate rents and manages AV equipment, decor and branding, and engagement activities for corporate events — staffed on-site, not just dropped off.",
  },
];

export interface FaqItem {
  q: string;
  a: string;
}

export interface ServicePage {
  slug: string;
  category: ServiceCategory;
  parentSlug: string; // "corporate-events" | "artist-booking" | "venue-booking" | "event-rentals"
  name: string; // short nav name
  h1: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  intro: string[]; // paragraphs
  problems: string[];
  inclusions: { title: string; desc: string }[];
  process: { title: string; desc: string }[];
  benefits: string[];
  useCases: string[];
  faqs: FaqItem[];
  heroImageUrl?: string;
  galleryImageUrls?: string[];
}

export const corporateEventServices: ServicePage[] = [
  {
    slug: "corporate-offsite-planning",
    category: "corporate-events",
    parentSlug: "corporate-events",
    name: "Corporate Offsite Planning",
    h1: "Corporate Offsite Planning for Teams That Need to Actually Get Something Done",
    metaTitle: "Corporate Offsite Planning Company | Elephant Corporate",
    metaDescription:
      "Elephant Corporate plans corporate offsites end to end — venue selection, agenda design, logistics, and on-ground execution. Get a custom offsite quote.",
    primaryKeyword: "corporate offsite planning company",
    secondaryKeywords: [
      "corporate offsite planners",
      "corporate offsite management",
      "leadership offsite planning",
      "annual offsite organisers",
    ],
    intro: [
      "A corporate offsite is only worth the time and budget if it produces a real outcome — sharper strategy, a stronger team, or a reset after a hard quarter. Elephant Corporate plans corporate offsites for leadership teams, departments, and full organisations, handling venue selection, agenda design, logistics, and on-ground execution so your internal team isn't running a second job on top of their actual one.",
      "We work with HR, admin, and founders' offices across company sizes — from a 15-person leadership retreat to a 300-person all-hands offsite — and manage every moving part: venue, meeting spaces, facilitation support, entertainment, meals, and the informal moments that make an offsite worth remembering.",
    ],
    problems: [
      "Internal teams spend weeks coordinating vendors instead of focusing on agenda and content.",
      "Venues get booked without checking AV capability, breakout space, or connectivity, and it shows on the day.",
      "Budgets creep because venue, stay, and F&B are booked separately with no single point of accountability.",
      "Offsites default to generic activities instead of being designed around what the team actually needs to walk away with.",
    ],
    inclusions: [
      { title: "Venue sourcing and site visits", desc: "Shortlisted against your budget, group size, and agenda needs, with options across resort, business hotel, and offbeat formats." },
      { title: "Agenda and format design", desc: "Structured around your objective — strategy alignment, team reset, or performance review — with the right mix of working sessions and downtime." },
      { title: "Stay and F&B coordination", desc: "Room blocks, check-in logistics, and meal planning managed as one itinerary." },
      { title: "On-ground event management", desc: "A dedicated coordinator present through the offsite to run the schedule and handle real-time issues." },
      { title: "AV and meeting infrastructure", desc: "Meeting rooms and presentation setup matched to session timings." },
      { title: "Post-event reporting", desc: "A wrap-up summary with attendance, spend reconciliation, and photos for internal circulation." },
    ],
    process: [
      { title: "Discovery call", desc: "We understand your objective, headcount, budget range, and preferred dates or destinations." },
      { title: "Proposal and venue shortlist", desc: "You receive 2–3 venue options with costing, so you're comparing real numbers, not guesses." },
      { title: "Planning and confirmation", desc: "Agenda, rooming, and F&B are finalised and confirmed with vendors on your behalf." },
      { title: "On-site execution", desc: "Our team manages the offsite in real time so yours can participate in it." },
      { title: "Wrap-up and reporting", desc: "A post-event summary and reconciled billing close the loop." },
    ],
    benefits: [
      "One point of contact for venue, stay, and F&B instead of five separate vendors.",
      "Transparent, itemised costing with no hidden markups.",
      "A dedicated on-ground coordinator so your leadership team can actually attend, not manage.",
      "Experience across leadership retreats, functional offsites, and company-wide gatherings.",
    ],
    useCases: [
      "Leadership strategy offsites",
      "Quarterly or annual planning retreats",
      "Departmental offsites (sales kick-offs, engineering summits)",
      "Post-merger or restructuring alignment offsites",
      "New-financial-year planning retreats",
    ],
    faqs: [
      { q: "How far in advance should we book a corporate offsite?", a: "For groups under 50, 3–4 weeks is workable. For larger offsites or peak-season destinations, we recommend 6–8 weeks to secure the right venue and better rates." },
      { q: "Can you plan offsites outside our primary city?", a: "Yes. We plan offsites across India, including outbound destinations, and can source venues in any city through our venue booking network." },
      { q: "Do you handle offsites for teams under 20 people?", a: "Yes, we plan offsites of all sizes, from small leadership retreats to company-wide events." },
      { q: "Can you work within a fixed per-person budget?", a: "Yes. Tell us your per-person budget and we'll build a venue and agenda proposal to fit it, with transparent line-item costing." },
    ],
  },
  {
    slug: "rewards-and-recognition-events",
    category: "corporate-events",
    parentSlug: "corporate-events",
    name: "Rewards & Recognition Events",
    h1: "Rewards and Recognition Event Management That Makes Recognition Feel Earned",
    metaTitle: "Rewards and Recognition Event Management | Elephant Corporate",
    metaDescription:
      "End-to-end rewards and recognition event management — venue, stage production, awards design, and guest experience. Request a quote for your next recognition ceremony.",
    primaryKeyword: "rewards and recognition event management",
    secondaryKeywords: [
      "employee recognition event planners",
      "corporate awards ceremony organisers",
      "recognition ceremony management company",
    ],
    intro: [
      "A recognition ceremony that feels thrown together undercuts the very message it's meant to send. Elephant Corporate manages rewards and recognition events — from format design and stage production to trophies, guest experience, and photography — so the evening matches the seriousness of the achievement being celebrated.",
      "We plan these events for HR and admin teams who need the ceremony to run without a hitch, because everyone in the room, including leadership, is watching.",
    ],
    problems: [
      "Recognition events get planned last-minute and feel like an afterthought rather than a milestone.",
      "Stage flow, award sequencing, and presenter briefing are left unrehearsed, leading to awkward pauses on the day.",
      "Trophy or certificate quality doesn't match the effort behind the achievement.",
      "There's no single team managing venue, decor, stage production, and hospitality together.",
    ],
    inclusions: [
      { title: "Format and award category design", desc: "Structuring categories, nomination flow, and the ceremony sequence with you." },
      { title: "Venue and stage production", desc: "Venue booking, stage, lighting, sound, and screen setup suited to the guest count." },
      { title: "Trophies, certificates and mementos", desc: "Sourced or customised to match your brand and the significance of the award." },
      { title: "Anchor and entertainment coordination", desc: "Professional anchoring, and entertainment segments where the format calls for it, booked through our artist network." },
      { title: "Guest experience and hospitality", desc: "Registration, seating, F&B, and guest flow managed on the day." },
      { title: "Photography and video coverage", desc: "Documentation for internal communication and future recognition campaigns." },
    ],
    process: [
      { title: "Format consultation", desc: "We align on award categories, guest count, and the tone you want for the evening." },
      { title: "Venue and vendor proposal", desc: "Venue options, stage design, and production costing shared for approval." },
      { title: "Rehearsal and run-of-show", desc: "A detailed run-of-show document and rehearsal with presenters before the event." },
      { title: "Event execution", desc: "Full on-ground management of stage, hospitality, and timing." },
      { title: "Post-event assets", desc: "Photos and video handed over for internal and social use." },
    ],
    benefits: [
      "A written run-of-show so nothing is left to chance on stage.",
      "Vendor relationships across trophies, decor, and production that keep quality consistent.",
      "One team managing hospitality and stage together, so guest experience isn't an afterthought.",
      "Experience scaling from 50-person team recognitions to 500-person annual award nights.",
    ],
    useCases: [
      "Annual employee recognition nights",
      "Sales and performance awards",
      "Long-service and milestone recognition",
      "Departmental or team-level appreciation events",
    ],
    faqs: [
      { q: "Can you design the award categories with us?", a: "Yes, we work with your HR team to structure categories and nomination criteria that fit your culture and headcount." },
      { q: "Do you supply trophies and certificates?", a: "Yes, sourced or custom-designed to your brand guidelines and budget." },
      { q: "How many guests can you manage at a recognition event?", a: "We've managed recognition events from small team gatherings to several hundred guests — venue and production scale to fit." },
    ],
  },
  {
    slug: "corporate-annual-day-management",
    category: "corporate-events",
    parentSlug: "corporate-events",
    name: "Corporate Annual Day",
    h1: "Corporate Annual Day Management for Companies That Want It Done Right, Once a Year",
    metaTitle: "Corporate Annual Day Organisers | Elephant Corporate",
    metaDescription:
      "Elephant Corporate manages corporate annual day events end to end — venue, program, entertainment, and logistics. Talk to us about your next annual day.",
    primaryKeyword: "corporate annual day organisers",
    secondaryKeywords: [
      "corporate annual day management company",
      "annual day event planners",
      "company annual function organisers",
    ],
    intro: [
      "Annual day is often the one event in the year where the entire company — and sometimes families — are in the same room. Elephant Corporate manages corporate annual day events end to end: venue, program design, entertainment, catering, and logistics, so HR and admin teams can focus on the parts only they can own, like leadership speeches and internal communication.",
    ],
    problems: [
      "Planning stretches thin internal teams already running day-to-day HR operations.",
      "Program flow drags because segments aren't timed or sequenced properly.",
      "Family and guest logistics (invites, seating, transport) get handled reactively.",
      "Entertainment and catering vendors are booked independently with no single owner.",
    ],
    inclusions: [
      { title: "Venue sourcing", desc: "Matched to guest count, including family attendees where applicable." },
      { title: "Program and run-of-show design", desc: "Timed sequencing of speeches, performances, and award segments." },
      { title: "Entertainment booking", desc: "Anchors, performers, and activities suited to your audience, sourced through our artist network." },
      { title: "Catering and hospitality", desc: "Menu planning and service for large, mixed-age guest lists." },
      { title: "Decor, stage and AV production", desc: "Theme-aligned decor and full stage and sound setup." },
      { title: "Guest logistics", desc: "Invitations, RSVP tracking, seating, and transport coordination." },
    ],
    process: [
      { title: "Planning brief", desc: "We capture your theme, guest count, budget, and must-have program elements." },
      { title: "Proposal and vendor lock-in", desc: "Venue, entertainment, and catering options presented with clear costing." },
      { title: "Program build and rehearsal", desc: "Run-of-show finalised with timing for every segment." },
      { title: "Event day execution", desc: "Full on-ground management from guest arrival to closing." },
      { title: "Post-event summary", desc: "Photos, video, and a reconciled report delivered after the event." },
    ],
    benefits: [
      "One team managing venue, program, and hospitality instead of six separate vendors.",
      "Experience handling mixed guest lists that include employee families.",
      "A tested run-of-show format that keeps a full-day program on time.",
      "Transparent budgeting so annual day spend is predictable year over year.",
    ],
    useCases: [
      "Company-wide annual day with families",
      "Employees-only annual celebration",
      "Combined annual day and recognition ceremony",
      "Multi-location annual day roll-ups",
    ],
    faqs: [
      { q: "Can you manage annual day events that include employee families?", a: "Yes, we regularly plan for mixed guest lists and build logistics — seating, catering, transport — around that." },
      { q: "Can annual day be combined with our recognition ceremony?", a: "Yes, many clients combine both — see our rewards and recognition event management page for that format." },
      { q: "How early should annual day planning start?", a: "6–8 weeks out gives us time to lock the right venue and entertainment, especially in peak season (Oct–Feb)." },
    ],
  },
  {
    slug: "corporate-sports-day-management",
    category: "corporate-events",
    parentSlug: "corporate-events",
    name: "Corporate Sports Day",
    h1: "Corporate Sports Day Organisers for Genuinely Fun, Well-Run Days",
    metaTitle: "Corporate Sports Day Organisers | Elephant Corporate",
    metaDescription:
      "Elephant Corporate organises corporate sports days — venue, sports format, equipment, referees, and logistics — for companies that want a well-run, inclusive event.",
    primaryKeyword: "corporate sports day organisers",
    secondaryKeywords: [
      "corporate sports day management",
      "office sports day planners",
      "corporate sports meet organisers",
    ],
    intro: [
      "A corporate sports day works when it's genuinely inclusive and genuinely well organised — not just a handful of people playing cricket while everyone else stands around. Elephant Corporate plans the sport format, venue, equipment, referees, and logistics for corporate sports days, drawing on our background in sports event operations to build a day that works for people of every fitness level.",
    ],
    problems: [
      "Sports selection skews toward a few enthusiasts instead of the whole workforce.",
      "Grounds or courts are booked without checking capacity, safety, or weather contingency.",
      "There's no structured format, tournament bracket, or scoring system, so the day loses momentum.",
      "Equipment, referees, medical support, and hydration are arranged at the last minute.",
    ],
    inclusions: [
      { title: "Venue and ground booking", desc: "Grounds, turfs, or indoor sports facilities matched to your headcount and sport mix." },
      { title: "Sport format and tournament structure", desc: "A mix of team and individual formats designed for participation across fitness levels." },
      { title: "Equipment and referees", desc: "Sports equipment, scoring, and qualified referees for each activity, drawn from our rental and artist network." },
      { title: "Medical and hydration support", desc: "First-aid support and hydration stations through the day." },
      { title: "Prize and trophy management", desc: "Trophies or mementos for winners, integrated with the day's schedule." },
      { title: "Logistics and F&B", desc: "Transport, seating, shade, and meal or snack arrangements for participants and spectators." },
    ],
    process: [
      { title: "Format planning", desc: "We recommend a sport mix and schedule based on headcount, venue, and season." },
      { title: "Venue and vendor booking", desc: "Ground, equipment, and referee bookings confirmed on your behalf." },
      { title: "Bracket and schedule finalisation", desc: "Tournament brackets or activity schedules shared before the day." },
      { title: "Event day execution", desc: "Full on-ground management of activities, scoring, and logistics." },
      { title: "Prize distribution and wrap-up", desc: "Closing ceremony managed with results and photos." },
    ],
    benefits: [
      "Formats designed for participation, not just competition among the already-fit.",
      "Experience running sports operations, not just corporate events generically.",
      "Weather and safety contingencies planned in advance.",
      "One team managing venue, sport, and logistics together.",
    ],
    useCases: [
      "Company-wide inclusive sports days",
      "Inter-department sports tournaments",
      "Combined sports day and team-building day",
      "Multi-city sports day roll-outs for large organisations",
    ],
    faqs: [
      { q: "Can you plan a sports day for a workforce with mixed fitness levels?", a: "Yes, we deliberately design a mix of high- and low-intensity activities so participation isn't limited to a few people." },
      { q: "Do you provide equipment and referees?", a: "Yes, equipment, scoring, and referees are included and matched to the sports you choose." },
      { q: "What happens if it rains on the day?", a: "We plan indoor or covered-venue contingencies in advance for outdoor sports days during monsoon-prone dates." },
    ],
  },
  {
    slug: "corporate-outings-and-team-building",
    category: "corporate-events",
    parentSlug: "corporate-events",
    name: "Corporate Outings & Team Building",
    h1: "Corporate Outings and Team-Building Activities Planned Around Your Team, Not a Template",
    metaTitle: "Corporate Team Building Activities & Outings | Elephant Corporate",
    metaDescription:
      "Elephant Corporate plans corporate outings and team-building activities matched to your team size, objective, and budget. Get a custom outing proposal.",
    primaryKeyword: "corporate team-building activities",
    secondaryKeywords: [
      "corporate outing planners",
      "team outing management company",
      "corporate team building event organisers",
    ],
    intro: [
      "Generic team-building activities feel generic because they're picked off a fixed list without asking what the team actually needs — better cross-functional trust, a break after a hard stretch, or simply a good day out. Elephant Corporate plans corporate outings and team-building activities matched to your team's size, objective, and budget, and manages the venue, activities, facilitation, and meals.",
    ],
    problems: [
      "Off-the-shelf activity packages don't map to the team's actual dynamic or objective.",
      "Venue and activity logistics for a one-day outing get more complicated than expected.",
      "Budget gets spent on activities without accounting for venue, meals, and contingency.",
      "There's no facilitator to translate the day into a takeaway for the team.",
    ],
    inclusions: [
      { title: "Activity and venue curation", desc: "Options ranging from adventure and outdoor activities to structured team challenges, matched to your objective." },
      { title: "Facilitation", desc: "Facilitators for structured team-building formats, where the objective calls for it." },
      { title: "F&B and hospitality", desc: "Meals and refreshments planned around the day's schedule." },
      { title: "On-ground coordination", desc: "An Elephant Corporate coordinator present through the outing to manage schedule and safety." },
    ],
    process: [
      { title: "Objective discussion", desc: "We ask what you want the day to achieve, not just how many people are attending." },
      { title: "Venue and activity proposal", desc: "2–3 options shared with costing and format details." },
      { title: "Booking and logistics", desc: "Venue, facilitation, and F&B confirmed and scheduled." },
      { title: "Outing day execution", desc: "Full on-ground management of activities and logistics." },
      { title: "Feedback and photos", desc: "A short wrap-up with photos and feedback for internal sharing." },
    ],
    benefits: [
      "Outings designed around your team's actual objective, not a fixed package.",
      "One booking for venue, activities, facilitation, and food.",
      "Options across budget levels, from half-day city outings to full resort days.",
      "A dedicated coordinator on-ground so HR can participate instead of manage.",
    ],
    useCases: [
      "New-team or post-restructuring bonding outings",
      "Quarterly or annual team outings",
      "Cross-functional team-building days",
      "Onboarding cohort outings for new joiners",
    ],
    faqs: [
      { q: "Can you plan outings for teams as small as 10–15 people?", a: "Yes, we plan outings across group sizes and will right-size the venue and activities accordingly." },
      { q: "Do you offer adventure-based activities?", a: "Yes, along with structured team-building formats — we'll recommend a mix based on your team's comfort level and objective." },
      { q: "Can you manage outings outside our primary city?", a: "Yes, we can plan outings in nearby getaway destinations through our venue booking network." },
    ],
  },
  {
    slug: "corporate-gifting",
    category: "corporate-events",
    parentSlug: "corporate-events",
    name: "Corporate Gifting",
    h1: "Corporate Gifting That Reflects Well on the Company Giving It",
    metaTitle: "Corporate Gifting Company | Elephant Corporate",
    metaDescription:
      "Elephant Corporate sources, customises, and delivers corporate gifts for festivals, milestones, and events — at scale, on schedule. Request a corporate gifting quote.",
    primaryKeyword: "corporate gifting company",
    secondaryKeywords: [
      "corporate gift sourcing",
      "employee gifting services",
      "festival corporate gifting",
      "bulk corporate gift delivery",
    ],
    intro: [
      "Corporate gifting done well is a small, consistent signal of how a company treats its people and partners. Elephant Corporate sources, customises, and delivers corporate gifts for festivals, milestones, onboarding, and events — managing vendor sourcing, branding, packaging, and delivery logistics so gifting is handled once, correctly, at whatever scale you need.",
    ],
    problems: [
      "Gift sourcing gets left to whoever has time, resulting in inconsistent quality or late delivery.",
      "Branding and packaging feel like an afterthought rather than an extension of the company's identity.",
      "Bulk delivery across cities or to remote employees becomes a logistics problem no one planned for.",
      "Budgets aren't optimised because gifts are sourced individually rather than at scale.",
    ],
    inclusions: [
      { title: "Gift sourcing and curation", desc: "Options across budget tiers, from festival hampers to premium milestone gifts." },
      { title: "Branding and customisation", desc: "Logo branding, custom packaging, and personalisation where needed." },
      { title: "Bulk procurement", desc: "Volume sourcing that keeps per-unit cost predictable at scale." },
      { title: "Pan-India delivery coordination", desc: "Delivery logistics to offices, homes, or multiple city locations." },
      { title: "Gifting calendar planning", desc: "Advance planning around festivals, anniversaries, and recurring milestones." },
    ],
    process: [
      { title: "Requirement brief", desc: "We understand the occasion, headcount, budget per gift, and delivery locations." },
      { title: "Curated options", desc: "A shortlist of gift options within budget, with samples where useful." },
      { title: "Branding and confirmation", desc: "Customisation finalised and order confirmed with production timelines." },
      { title: "Delivery execution", desc: "Coordinated delivery to your specified locations, tracked to completion." },
      { title: "Delivery report", desc: "Confirmation report once all gifts are delivered." },
    ],
    benefits: [
      "Vendor relationships that keep quality consistent and pricing competitive at volume.",
      "One team managing sourcing, branding, and delivery instead of three separate vendors.",
      "Delivery coordination across multiple cities, including remote and hybrid employees.",
      "Planning support so gifting doesn't become a last-minute scramble each festival season.",
    ],
    useCases: [
      "Festival gifting (Diwali, New Year)",
      "Employee milestone and work-anniversary gifting",
      "New-joiner onboarding kits",
      "Client and partner gifting",
      "Event and conference delegate gifting",
    ],
    faqs: [
      { q: "Can you deliver gifts to employees working from home across different cities?", a: "Yes, pan-India delivery coordination to individual addresses is part of our gifting service." },
      { q: "Can gifts be branded with our company logo?", a: "Yes, branding and custom packaging are available across most gift categories." },
      { q: "What's the minimum order size?", a: "We work with orders of varying sizes — share your headcount and budget and we'll confirm feasibility and pricing." },
    ],
  },
  {
    slug: "conferences-and-corporate-meetings",
    category: "corporate-events",
    parentSlug: "corporate-events",
    name: "Conferences & Meetings",
    h1: "Conference and Corporate Meeting Management for Events That Need to Run on Time",
    metaTitle: "Corporate Conference & Meeting Management | Elephant Corporate",
    metaDescription:
      "Elephant Corporate manages corporate conferences and meetings — venue, AV, registration, and on-ground execution. Request a quote for your next conference.",
    primaryKeyword: "corporate conference management company",
    secondaryKeywords: [
      "corporate meeting planners",
      "conference organiser",
      "business conference organisers",
    ],
    intro: [
      "Conferences and large corporate meetings have zero tolerance for logistics failures — a delayed session or a broken mic reflects on the whole organisation. Elephant Corporate manages corporate conferences and meetings end to end: venue and AV, registration, and on-ground execution, so the content of the meeting gets the attention, not the logistics around it.",
    ],
    problems: [
      "Venue AV capability is assumed rather than verified, causing on-the-day technical issues.",
      "Registration and check-in processes aren't tested, creating bottlenecks at the door.",
      "No single team owns the run-of-show across sessions, breaks, and meals.",
      "Equipment and production vendors are booked separately from the venue, with no one owning the full setup.",
    ],
    inclusions: [
      { title: "Venue and AV production", desc: "Conference venues with tested AV, staging, and breakout room capability." },
      { title: "Registration and check-in", desc: "On-site or digital registration systems for smooth delegate flow." },
      { title: "Run-of-show management", desc: "Session timing, speaker coordination, and breaks managed to schedule." },
      { title: "F&B and delegate hospitality", desc: "Catering and hospitality suited to delegate profile and session format." },
      { title: "Equipment and production", desc: "Sound, screens, and staging sourced through our rental network as needed." },
    ],
    process: [
      { title: "Requirement scoping", desc: "We capture delegate count, session format, and any special AV or hybrid needs." },
      { title: "Venue and production proposal", desc: "Venue and production options presented with full costing." },
      { title: "Pre-event coordination", desc: "Registration setup, run-of-show, and vendor confirmations finalised." },
      { title: "On-site execution", desc: "Full on-ground management through the conference." },
      { title: "Post-event report", desc: "Attendance data, feedback summary, and photos delivered after the event." },
    ],
    benefits: [
      "AV and venue capability verified in advance, not assumed.",
      "Tested registration flow that avoids bottlenecks.",
      "One team coordinating venue, production, and hospitality together.",
      "Experience running both single-city and multi-day delegate conferences.",
    ],
    useCases: [
      "Annual sales or leadership conferences",
      "Partner and dealer meets",
      "Multi-day training conferences",
      "Hybrid conferences with remote delegates",
    ],
    faqs: [
      { q: "Do you support hybrid or livestreamed conferences?", a: "Yes, we can coordinate hybrid AV setups where the venue supports it." },
      { q: "Can you source the venue and the AV equipment together?", a: "Yes, this is one of the reasons companies choose us over a venue-only booking — see our venue booking and event rentals services." },
      { q: "Can you manage multi-day conferences?", a: "Yes, including coordinated scheduling across multiple days and session tracks." },
    ],
  },
];

export const artistBookingServices: ServicePage[] = [
  {
    slug: "live-music-and-dj-booking",
    category: "artist-booking",
    parentSlug: "artist-booking",
    name: "Live Music & DJ Booking",
    h1: "Live Music and DJ Booking for Corporate Events, Without the Vendor Hunt",
    metaTitle: "Corporate Live Band, Singer & DJ Booking | Elephant Corporate",
    metaDescription:
      "Book verified singers, live bands, and DJs for corporate events through Elephant Corporate — curated by budget, genre, and event type, with contracts and logistics handled.",
    primaryKeyword: "corporate event artist booking",
    secondaryKeywords: [
      "book DJ for corporate event",
      "live band booking for corporate events",
      "corporate event singer booking",
    ],
    intro: [
      "Booking entertainment directly from social media or word of mouth is a gamble — no verified performance history, no clear contract, and no backup if someone cancels close to the date. Elephant Corporate curates and books singers, live bands, and DJs for corporate events, working from a vetted performer network matched to your event's genre, formality, and budget.",
      "We handle the shortlist, negotiation, contracting, and on-day coordination, so the performance fits the event instead of being booked in isolation from it.",
    ],
    problems: [
      "Performers found through social media have no verifiable corporate event experience.",
      "Contracts and cancellation terms are unclear or non-existent with informal bookings.",
      "Sound and stage requirements aren't communicated to the performer in advance, causing setup delays.",
      "There's no backup plan if a performer cancels close to the event date.",
    ],
    inclusions: [
      { title: "Curated shortlist", desc: "2–3 performer options matched to your event's genre, formality, and audience." },
      { title: "Contracting and terms", desc: "Clear performance terms, timing, and cancellation policy handled on your behalf." },
      { title: "Technical rider coordination", desc: "Sound, stage, and setup requirements communicated to the venue in advance." },
      { title: "On-day coordination", desc: "An Elephant Corporate coordinator manages performer arrival, soundcheck, and set timing." },
      { title: "Backup planning", desc: "Contingency options identified for high-stakes dates." },
    ],
    process: [
      { title: "Brief", desc: "Tell us your event type, audience, budget, and preferred genre or performer style." },
      { title: "Shortlist", desc: "We share 2–3 verified options with sample performances and pricing." },
      { title: "Booking", desc: "Once selected, we handle contracting and technical requirements." },
      { title: "Event day", desc: "Coordination through arrival, soundcheck, and performance." },
      { title: "Wrap-up", desc: "Payment reconciliation and feedback collected post-event." },
    ],
    benefits: [
      "Performers matched to corporate event context, not just general popularity.",
      "Clear contracts and cancellation terms instead of informal arrangements.",
      "Technical requirements handled before the day, not discovered on it.",
      "One point of contact instead of negotiating directly with performers.",
    ],
    useCases: [
      "Annual day and recognition ceremony entertainment",
      "Product launches and brand events",
      "Conference evening entertainment",
      "Office parties and festival celebrations",
    ],
    faqs: [
      { q: "Can you book performers for a specific genre or language?", a: "Yes, share your preference and we'll shortlist accordingly." },
      { q: "Do you handle the technical sound and stage requirements?", a: "Yes, we coordinate the technical rider with the venue or our event rentals team." },
      { q: "What if the performer cancels close to the date?", a: "We maintain backup options for high-stakes dates and can typically arrange a replacement." },
    ],
  },
  {
    slug: "anchors-and-emcees",
    category: "artist-booking",
    parentSlug: "artist-booking",
    name: "Anchors & Emcees",
    h1: "Anchor and Emcee Booking for Corporate Events That Need Someone Steady on Stage",
    metaTitle: "Corporate Event Anchor & Emcee Booking | Elephant Corporate",
    metaDescription:
      "Book experienced anchors and emcees for corporate events, conferences, and award ceremonies through Elephant Corporate — briefed on your run-of-show in advance.",
    primaryKeyword: "corporate event anchor booking",
    secondaryKeywords: [
      "emcee for corporate event",
      "hire anchor for conference",
      "award ceremony host booking",
    ],
    intro: [
      "A good anchor holds a program together — keeping timing on track, reading the room, and handling the unplanned moments that come up in any live event. Elephant Corporate books anchors and emcees for corporate events, conferences, and award ceremonies, and briefs them on your run-of-show, pronunciation of names, and tone before the event, not on the day itself.",
    ],
    problems: [
      "Anchors booked without a proper brief mispronounce names or misjudge the tone of the event.",
      "No rehearsal means transitions between segments feel unrehearsed on stage.",
      "Bilingual or multilingual audiences need an anchor who can navigate that comfortably.",
      "Award sequencing errors on stage are one of the most visible planning failures at recognition events.",
    ],
    inclusions: [
      { title: "Curated anchor shortlist", desc: "Matched to your event's tone — formal conference, celebratory annual day, or high-energy team event." },
      { title: "Run-of-show briefing", desc: "The anchor receives your full schedule, name pronunciations, and award sequence in advance." },
      { title: "Rehearsal coordination", desc: "A run-through scheduled ahead of the event where the format calls for it." },
      { title: "On-day support", desc: "An Elephant Corporate coordinator on standby to manage any last-minute schedule changes with the anchor." },
    ],
    process: [
      { title: "Brief", desc: "Share your event type, language preference, and tone." },
      { title: "Shortlist and selection", desc: "We share anchor profiles and sample reels for your review." },
      { title: "Briefing pack", desc: "Run-of-show, names, and award sequence shared with the anchor ahead of time." },
      { title: "Event day", desc: "Anchor performs with a Elephant Corporate coordinator managing real-time changes." },
    ],
    benefits: [
      "Anchors briefed properly in advance, not walked through the schedule minutes before going live.",
      "Options across formal, celebratory, and high-energy event tones.",
      "Bilingual and multilingual anchors available for mixed audiences.",
      "One point of contact for anchor logistics alongside your broader event planning.",
    ],
    useCases: [
      "Award and recognition ceremonies",
      "Annual day and large-format events",
      "Conferences and panel discussions",
      "Product launches and brand events",
    ],
    faqs: [
      { q: "Can the anchor be briefed on our award sequence in advance?", a: "Yes, this is standard practice — we share the full run-of-show and names ahead of the event." },
      { q: "Do you have anchors for regional-language events?", a: "Yes, our network includes anchors across multiple Indian languages and bilingual formats." },
      { q: "Can anchor booking be combined with our full event planning?", a: "Yes, most clients book anchors as part of a larger event we're managing — see our corporate events services." },
    ],
  },
  {
    slug: "speakers-comedians-and-specialty-acts",
    category: "artist-booking",
    parentSlug: "artist-booking",
    name: "Speakers, Comedians & Specialty Acts",
    h1: "Motivational Speakers, Comedians and Specialty Acts for Corporate Events",
    metaTitle: "Corporate Speaker & Comedian Booking | Elephant Corporate",
    metaDescription:
      "Book motivational speakers, stand-up comedians, and specialty performers for corporate events and conferences through Elephant Corporate's vetted talent network.",
    primaryKeyword: "corporate motivational speaker booking",
    secondaryKeywords: [
      "corporate stand-up comedian booking",
      "hire speaker for corporate event",
      "specialty act booking for events",
    ],
    intro: [
      "A motivational speaker, comedian, or specialty performer can set the tone for an entire conference or annual day — but only if their material and delivery actually fit a corporate audience. Elephant Corporate books motivational speakers, stand-up comedians, and specialty acts (magicians, dancers, cultural performers) for corporate events, screened for corporate-appropriate content and matched to your audience.",
    ],
    problems: [
      "Content that works for a general audience doesn't always translate to a corporate setting.",
      "Speakers booked without a topic brief deliver generic content unrelated to the event's theme.",
      "There's no verification of past corporate performance experience.",
      "Fee negotiation and logistics (travel, stay, technical needs) are handled informally with no clear terms.",
    ],
    inclusions: [
      { title: "Curated talent shortlist", desc: "Matched to your event theme, audience seniority, and desired tone." },
      { title: "Content and topic briefing", desc: "Speakers and performers briefed on your event's theme and any content boundaries." },
      { title: "Logistics coordination", desc: "Travel, stay, and technical requirements for outstation talent managed on your behalf." },
      { title: "Contracting", desc: "Clear fee, terms, and cancellation policy for every booking." },
    ],
    process: [
      { title: "Brief", desc: "Share your event theme, audience profile, and any content sensitivities." },
      { title: "Shortlist", desc: "We share 2–3 options with sample content and pricing." },
      { title: "Booking and briefing", desc: "Contracting and topic/content briefing handled before the event." },
      { title: "Event day", desc: "Coordination through arrival and performance or session." },
    ],
    benefits: [
      "Talent screened for corporate-appropriate content, not booked blind.",
      "Options across motivational speaking, comedy, and specialty performance formats.",
      "Logistics for outstation talent handled as part of the booking.",
      "One point of contact instead of negotiating directly with agents or performers.",
    ],
    useCases: [
      "Conference keynote and closing sessions",
      "Annual day entertainment segments",
      "Sales kick-off energiser sessions",
      "Team offsite evening entertainment",
    ],
    faqs: [
      { q: "Can you screen content for a conservative corporate audience?", a: "Yes, we brief every performer on your audience and content expectations before booking." },
      { q: "Do you handle travel for outstation speakers or performers?", a: "Yes, travel and stay coordination is part of the booking for outstation talent." },
      { q: "Can this be combined with a conference we're planning with you?", a: "Yes — see our conferences and corporate meetings service for the combined offering." },
    ],
  },
];

export const venueBookingServices: ServicePage[] = [
  {
    slug: "conference-and-meeting-venues",
    category: "venue-booking",
    parentSlug: "venue-booking",
    name: "Conference & Meeting Venues",
    h1: "Conference and Meeting Venue Booking, Checked Against What You Actually Need",
    metaTitle: "Corporate Conference & Meeting Venue Booking | Elephant Corporate",
    metaDescription:
      "Elephant Corporate sources and books conference halls and corporate meeting venues — AV, capacity, and connectivity verified before you commit. Get a venue shortlist.",
    primaryKeyword: "corporate conference venue booking",
    secondaryKeywords: [
      "conference hall booking",
      "corporate meeting venue booking",
      "book auditorium for corporate event",
    ],
    intro: [
      "A conference venue that looks right in photos can still fail on the day — untested AV, patchy connectivity, or not enough breakout space for parallel sessions. Elephant Corporate sources and books conference halls, auditoriums, and corporate meeting venues, verifying capacity, AV capability, and connectivity before we shortlist anything for you.",
    ],
    problems: [
      "Venue capacity is estimated from brochures rather than verified for your actual session format.",
      "AV and connectivity are assumed to work rather than tested in advance.",
      "Breakout space for parallel sessions is an afterthought rather than confirmed upfront.",
      "Multiple venue visits and negotiations eat up internal time before a decision is even made.",
    ],
    inclusions: [
      { title: "Venue shortlisting", desc: "2–3 options matched to your capacity, budget, and format, with verified AV and connectivity." },
      { title: "Site visit coordination", desc: "Arranged visits or detailed venue walkthroughs where an in-person visit isn't practical." },
      { title: "Rate negotiation", desc: "Negotiated on your behalf, with transparent, itemised costing." },
      { title: "Contracting and booking", desc: "Terms, cancellation policy, and booking confirmation handled for you." },
      { title: "On-day venue coordination", desc: "An Elephant Corporate coordinator on-site to manage the venue relationship during your event." },
    ],
    process: [
      { title: "Requirement brief", desc: "Capacity, format, dates, and budget shared with us." },
      { title: "Shortlist", desc: "Verified venue options with costing." },
      { title: "Site visit or walkthrough", desc: "In-person or virtual walkthrough of shortlisted venues." },
      { title: "Booking", desc: "Rate negotiation, contracting, and confirmation." },
      { title: "Event-day coordination", desc: "On-site support managing the venue relationship through your event." },
    ],
    benefits: [
      "AV and connectivity verified before you commit, not discovered on the day.",
      "Negotiated rates instead of rack pricing.",
      "One point of contact for venue logistics alongside your broader event.",
      "Access to venues beyond what's publicly listed or easily found independently.",
    ],
    useCases: [
      "Corporate conferences and multi-day summits",
      "Board meetings and leadership sessions",
      "Training and workshop venues",
      "Product launch and press event venues",
    ],
    faqs: [
      { q: "Can you verify AV capability before we commit to a venue?", a: "Yes, we check tested AV, connectivity, and breakout space as part of shortlisting, not after booking." },
      { q: "Do you handle rate negotiation?", a: "Yes, and you see the negotiated, itemised cost — no hidden markup." },
      { q: "Can venue booking be combined with equipment and production?", a: "Yes — see our event rentals and equipment services for AV, staging, and production add-ons." },
    ],
  },
  {
    slug: "offsite-and-retreat-venues",
    category: "venue-booking",
    parentSlug: "venue-booking",
    name: "Offsite & Retreat Venues",
    h1: "Offsite and Retreat Venue Booking for Teams That Need a Change of Scene, Done Right",
    metaTitle: "Corporate Offsite Venue Booking | Elephant Corporate",
    metaDescription:
      "Elephant Corporate sources resorts, farmhouses, and retreat venues for corporate offsites — matched to group size, budget, and agenda. Get a venue shortlist.",
    primaryKeyword: "corporate offsite venue booking",
    secondaryKeywords: [
      "offsite resort booking for companies",
      "corporate retreat venue",
      "farmhouse booking for corporate event",
    ],
    intro: [
      "Offsite venues need to do two jobs at once — support focused working sessions and give the team room to actually unwind. Elephant Corporate sources resorts, farmhouses, and retreat-style venues for corporate offsites, matched to your group size, budget, and agenda, with meeting infrastructure and informal space both accounted for.",
    ],
    problems: [
      "Scenic venues sometimes lack usable meeting space for structured sessions.",
      "Group accommodation gets booked without checking room configuration against your rooming list.",
      "Outdoor and informal space capacity isn't verified for group activities.",
      "Weather and seasonal availability for offbeat destinations aren't checked in advance.",
    ],
    inclusions: [
      { title: "Venue shortlisting", desc: "Resorts, farmhouses, and retreat venues matched to group size and agenda." },
      { title: "Room configuration check", desc: "Accommodation verified against your rooming and privacy requirements." },
      { title: "Meeting and outdoor space assessment", desc: "Both structured session space and informal areas checked for capacity." },
      { title: "Rate negotiation and booking", desc: "Negotiated pricing with clear, itemised terms." },
    ],
    process: [
      { title: "Requirement brief", desc: "Group size, agenda mix, budget, and preferred region or destination." },
      { title: "Shortlist", desc: "2–3 venue options with costing and configuration details." },
      { title: "Site visit or walkthrough", desc: "In-person or detailed virtual walkthrough before booking." },
      { title: "Booking and confirmation", desc: "Rates negotiated and terms confirmed." },
    ],
    benefits: [
      "Venues checked for both work and downtime needs, not just scenery.",
      "Negotiated group rates on accommodation and meeting space.",
      "Room configuration verified against your actual rooming list.",
      "Works standalone or as part of a Elephant Corporate-managed offsite.",
    ],
    useCases: [
      "Leadership and team offsites",
      "Annual planning retreats",
      "Multi-day training retreats",
      "Combined offsite and team-building venues",
    ],
    faqs: [
      { q: "Can you find venues that support both working sessions and downtime?", a: "Yes, this is exactly what we check for when shortlisting offsite venues." },
      { q: "Can this be combined with full offsite planning?", a: "Yes — see our corporate offsite planning service for the combined offering." },
      { q: "Do you cover offbeat or outstation destinations?", a: "Yes, including hill stations and getaway destinations, subject to seasonal availability." },
    ],
  },
  {
    slug: "banquet-and-large-format-venues",
    category: "venue-booking",
    parentSlug: "venue-booking",
    name: "Banquet & Large-Format Venues",
    h1: "Banquet and Large-Format Venue Booking for Annual Day, Award Nights and Big Gatherings",
    metaTitle: "Corporate Banquet & Event Venue Booking | Elephant Corporate",
    metaDescription:
      "Elephant Corporate books banquet halls and large-format venues for annual day, award ceremonies, and company-wide events — capacity and layout verified upfront.",
    primaryKeyword: "banquet hall booking for corporate event",
    secondaryKeywords: [
      "large event venue booking",
      "annual day venue booking",
      "exhibition center booking",
    ],
    intro: [
      "Large-format events — annual day, award nights, exhibitions — need venues that can genuinely handle the guest count, not just the seating chart on paper. Elephant Corporate books banquet halls, exhibition centers, and other large-format venues, verifying real usable capacity, stage sightlines, and parking or access before confirming.",
    ],
    problems: [
      "Advertised capacity doesn't account for stage, catering stations, and walkways, leaving less usable space than expected.",
      "Sightlines to the stage aren't checked for guests seated at the back or sides.",
      "Parking and access for large guest counts, including families, get underestimated.",
      "Multiple vendors (venue, catering, decor) coordinate independently with no single owner.",
    ],
    inclusions: [
      { title: "Venue shortlisting", desc: "Banquet halls and large-format venues matched to your real, usable guest capacity." },
      { title: "Layout and sightline check", desc: "Stage placement and seating sightlines verified before booking." },
      { title: "Access and parking assessment", desc: "Parking and entry logistics checked for large or family-inclusive guest counts." },
      { title: "Vendor coordination", desc: "Venue booking coordinated alongside catering, decor, and production vendors." },
    ],
    process: [
      { title: "Requirement brief", desc: "Guest count, format, and budget shared with us." },
      { title: "Shortlist", desc: "Venue options with verified usable capacity and costing." },
      { title: "Site visit", desc: "Walkthrough to confirm layout, sightlines, and access." },
      { title: "Booking and coordination", desc: "Confirmed with terms, coordinated with other event vendors." },
    ],
    benefits: [
      "Usable capacity verified, not just advertised capacity.",
      "Layout and sightlines checked before you commit.",
      "Coordinated with catering, decor, and production for one seamless booking.",
      "Experience with family-inclusive guest lists and large-scale logistics.",
    ],
    useCases: [
      "Company-wide annual day events",
      "Award and recognition ceremonies",
      "Exhibitions and large product launches",
      "Multi-hundred-guest company celebrations",
    ],
    faqs: [
      { q: "How do you verify a venue's real capacity?", a: "We assess usable space after accounting for stage, catering stations, and walkways — not just the venue's advertised maximum." },
      { q: "Can you coordinate the venue with our caterer and decor vendor?", a: "Yes, or we can manage catering and decor for you as part of a full annual day or recognition event." },
      { q: "Do you check parking and access for family guest lists?", a: "Yes, this is part of our venue assessment for large, mixed-guest events." },
    ],
  },
];

export const eventRentalServices: ServicePage[] = [
  {
    slug: "audio-visual-and-production-equipment",
    category: "event-rentals",
    parentSlug: "event-rentals",
    name: "Audio Visual & Production Equipment",
    h1: "Audio Visual and Production Equipment Rental for Events That Can't Afford a Technical Glitch",
    metaTitle: "Corporate Event AV Equipment Rental | Elephant Corporate",
    metaDescription:
      "Elephant Corporate rents and manages sound, screens, lighting, and staging for corporate events and conferences, with a technician on-site through the event.",
    primaryKeyword: "event AV equipment rental",
    secondaryKeywords: [
      "sound system rental for corporate event",
      "LED wall rental for events",
      "stage and lighting rental for events",
    ],
    intro: [
      "A broken mic or a screen that won't connect is the kind of small failure that overshadows an otherwise well-planned event. Elephant Corporate rents and manages sound systems, screens and LED walls, lighting, and staging for corporate events and conferences, with a technician present on-site to handle setup and run the show, not just drop off equipment.",
    ],
    problems: [
      "Equipment is delivered without a technician, leaving your team to troubleshoot mid-event.",
      "Sound and screen requirements aren't matched to the actual room size and layout.",
      "Backup equipment isn't planned for, so a single failure derails the session.",
      "Rental quotes don't include setup, operation, or teardown, leading to surprise costs.",
    ],
    inclusions: [
      { title: "Sound systems", desc: "PA systems and microphones matched to room size and session format." },
      { title: "Screens and LED walls", desc: "Presentation and branding displays sized to the venue and viewing distance." },
      { title: "Lighting and staging", desc: "Stage, lighting rigs, and truss setup for larger formats." },
      { title: "On-site technician", desc: "A technician present through setup, the live event, and teardown." },
      { title: "Backup equipment", desc: "Contingency equipment for high-stakes events." },
    ],
    process: [
      { title: "Requirement brief", desc: "Room size, format, and session requirements shared with us." },
      { title: "Equipment proposal", desc: "Itemised quote covering equipment, setup, technician, and teardown." },
      { title: "Setup and testing", desc: "Equipment installed and tested ahead of the event, not on arrival of guests." },
      { title: "Live event support", desc: "Technician present through the event to manage any issues in real time." },
      { title: "Teardown", desc: "Equipment removed and venue returned to its original state." },
    ],
    benefits: [
      "A technician on-site, not just equipment dropped off.",
      "Equipment sized to your actual room and session format, not a generic package.",
      "Backup planning for high-stakes events.",
      "Itemised quotes with no surprise setup or teardown charges.",
    ],
    useCases: [
      "Conferences and large meetings",
      "Annual day and recognition ceremony production",
      "Product launches and brand activations",
      "Hybrid and livestreamed sessions",
    ],
    faqs: [
      { q: "Is a technician included with equipment rental?", a: "Yes, our rentals include an on-site technician for setup, live support, and teardown." },
      { q: "Can you supply equipment for a venue we've already booked?", a: "Yes, we can supply and manage equipment independently of whether we booked the venue." },
      { q: "Do you carry backup equipment for critical events?", a: "Yes, backup contingency is available and recommended for high-stakes conferences and ceremonies." },
    ],
  },
  {
    slug: "event-decor-tent-and-branding",
    category: "event-rentals",
    parentSlug: "event-rentals",
    name: "Event Decor, Tent & Branding",
    h1: "Event Decor, Tent and Branding Services That Match the Occasion",
    metaTitle: "Corporate Event Decor & Branding Services | Elephant Corporate",
    metaDescription:
      "Elephant Corporate provides decor, tent, infrastructure, and branding/fabrication services for corporate events — themed to your event and delivered on schedule.",
    primaryKeyword: "corporate event decor and branding",
    secondaryKeywords: [
      "event tent rental for corporate event",
      "event branding and fabrication",
      "corporate event infrastructure rental",
    ],
    intro: [
      "Decor and branding are what make a venue feel like your event rather than a generic rented hall. Elephant Corporate provides decor, tent and infrastructure, and branding/fabrication services for corporate events — themed to your occasion, built to your brand guidelines, and delivered and struck on schedule.",
    ],
    problems: [
      "Generic decor doesn't reflect the company's brand or the occasion's tone.",
      "Outdoor events need tent and infrastructure planning that's easy to underestimate.",
      "Branding elements (backdrops, standees, signage) get produced without proper brand guideline checks.",
      "Setup and strike timelines aren't planned against the venue's access windows.",
    ],
    inclusions: [
      { title: "Themed decor", desc: "Design and execution matched to your event's occasion and brand identity." },
      { title: "Tent and infrastructure", desc: "Tenting, flooring, and structural setup for outdoor or large-format events." },
      { title: "Branding and fabrication", desc: "Backdrops, standees, signage, and branded elements produced to your guidelines." },
      { title: "Setup and strike management", desc: "Installation and teardown planned against the venue's access windows." },
    ],
    process: [
      { title: "Brief and mood board", desc: "Your brand guidelines, occasion, and budget shape an initial concept." },
      { title: "Design proposal", desc: "Visual concepts and costing shared for approval." },
      { title: "Production", desc: "Decor and branded elements produced ahead of the event." },
      { title: "Setup and event support", desc: "Installed before guest arrival, struck after the event within the venue's access window." },
    ],
    benefits: [
      "Decor and branding built to your actual brand guidelines, not generic templates.",
      "Outdoor infrastructure planned by people who account for weather and access constraints.",
      "Setup and strike timed against venue access, avoiding overtime charges.",
      "Works as a standalone booking or alongside a Elephant Corporate-managed event.",
    ],
    useCases: [
      "Annual day and award ceremony decor",
      "Outdoor offsites and team events",
      "Product launches and brand activations",
      "Conference branding and signage",
    ],
    faqs: [
      { q: "Can decor be matched to our brand guidelines?", a: "Yes, share your brand guidelines and we'll design decor and branded elements to match." },
      { q: "Do you handle outdoor tenting and infrastructure?", a: "Yes, including flooring and structural setup for outdoor venues." },
      { q: "Can this be booked alongside a venue you're sourcing for us?", a: "Yes, this is common — see our venue booking services for the combined package." },
    ],
  },
  {
    slug: "event-games-and-engagement-activities",
    category: "event-rentals",
    parentSlug: "event-rentals",
    name: "Event Games & Engagement Activities",
    h1: "Event Games and Engagement Activities to Keep a Corporate Crowd Actually Involved",
    metaTitle: "Corporate Event Games & Engagement Activities | Elephant Corporate",
    metaDescription:
      "Elephant Corporate supplies event games, engagement activities, and VR/AI experience zones for corporate events — booked and managed on-site.",
    primaryKeyword: "corporate event games rental",
    secondaryKeywords: [
      "engagement activities for corporate events",
      "VR experience rental for events",
      "interactive activities for office events",
    ],
    intro: [
      "A conference break or annual day floor plan is more memorable with something people can actually do — a game zone, an interactive activity, or a VR experience — rather than another standee and a coffee counter. Elephant Corporate supplies and manages event games, engagement activities, and VR/AI experience zones for corporate events, staffed on-site so they run themselves.",
    ],
    problems: [
      "Break-time and floor engagement is often an afterthought with nothing planned beyond catering.",
      "Rented equipment arrives without staff to operate or manage it.",
      "Activities aren't matched to the audience — what works for a young sales team doesn't work for a leadership offsite.",
      "Space and power requirements for interactive zones aren't checked against the venue in advance.",
    ],
    inclusions: [
      { title: "Game and activity curation", desc: "Options matched to your audience, space, and event format." },
      { title: "VR and AI experience zones", desc: "Interactive experience stations for product launches, conferences, and brand activations." },
      { title: "On-site staffing", desc: "Attendants to run and manage activities through the event." },
      { title: "Space and power planning", desc: "Requirements checked against the venue before setup." },
    ],
    process: [
      { title: "Brief", desc: "Audience, available space, and budget shared with us." },
      { title: "Activity proposal", desc: "Curated options with costing and space requirements." },
      { title: "Setup", desc: "Installed and tested ahead of guest arrival." },
      { title: "Event-day management", desc: "Staffed and managed through the event." },
    ],
    benefits: [
      "Activities matched to your actual audience, not a generic package.",
      "Fully staffed, so nothing sits unused or unmanaged.",
      "Space and power requirements checked before the day.",
      "Works as a standalone add-on to any event we or another team is managing.",
    ],
    useCases: [
      "Conference break-time engagement zones",
      "Annual day activity stations",
      "Product launch and brand activation experiences",
      "Team-building and outing activities",
    ],
    faqs: [
      { q: "Do activities come with staff to run them?", a: "Yes, on-site staffing is included so activities run without pulling your team away from hosting." },
      { q: "Can you supply VR or AI experience zones?", a: "Yes, for product launches, conferences, and brand activation events." },
      { q: "Can this be added to an event you're not otherwise managing for us?", a: "Yes, this can be booked as a standalone add-on to any venue or event." },
    ],
  },
];

export const allServices = [
  ...corporateEventServices,
  ...artistBookingServices,
  ...venueBookingServices,
  ...eventRentalServices,
];

export function getServiceBySlug(slug: string) {
  return allServices.find((s) => s.slug === slug);
}
