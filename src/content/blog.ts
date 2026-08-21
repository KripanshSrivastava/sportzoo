export interface BlogBlock {
  type: "p" | "h2" | "ul";
  text?: string;
  items?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  cluster: string;
  datePublished: string;
  dateModified: string;
  relatedServicePath: string;
  relatedServiceLabel: string;
  body: BlogBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-plan-a-successful-corporate-offsite",
    title: "How to Plan a Successful Corporate Offsite: A Step-by-Step Guide",
    description:
      "A practical, step-by-step guide to planning a corporate offsite that actually achieves its objective — from setting goals to choosing a venue to measuring success.",
    cluster: "Corporate Event Planning",
    datePublished: "2026-02-10",
    dateModified: "2026-02-10",
    relatedServicePath: "/corporate-events/corporate-offsite-planning",
    relatedServiceLabel: "Corporate Offsite Planning",
    body: [
      {
        type: "p",
        text: "Most corporate offsites fail for the same reason: the team spends more energy planning logistics than defining what the offsite is actually meant to achieve. A well-run offsite starts with a clear objective and works backward from there — the venue, agenda, and even the food are decisions that should serve that objective, not distract from it.",
      },
      { type: "h2", text: "1. Start with the objective, not the destination" },
      {
        type: "p",
        text: "Before picking a resort or comparing flight fares, get specific about what this offsite needs to produce. Is it strategic alignment for the next fiscal year? A reset after a difficult quarter? Onboarding a newly merged team? Each objective calls for a different format — a strategy offsite needs long, focused working sessions; a team-reset offsite needs more unstructured time. Writing the objective down in one sentence and sharing it with every attendee in advance does more for the outcome than any venue choice.",
      },
      { type: "h2", text: "2. Set a realistic budget before you start comparing venues" },
      {
        type: "p",
        text: "Offsite budgets usually break down into venue and stay, travel, food and beverage, meeting infrastructure, and a contingency buffer of 10–15%. Decide on a per-person budget early, because it changes what's realistic — a 2-day offsite for 40 people at ₹8,000 per person looks very different from one at ₹15,000 per person. Getting this number roughly right before you start requesting venue quotes saves several rounds of back-and-forth.",
      },
      { type: "h2", text: "3. Choose a venue that matches the agenda, not just the brochure photos" },
      {
        type: "p",
        text: "A venue that looks great in photos can still fail an offsite if it doesn't have reliable AV, enough breakout space for smaller group sessions, or good connectivity for hybrid attendees. Before confirming, verify: internet bandwidth (tested, not just advertised), microphone and projector setup, natural light and ventilation in the main session room, and whether outdoor space is usable if your agenda includes informal sessions.",
      },
      { type: "h2", text: "4. Build the agenda around energy levels, not just topics" },
      {
        type: "p",
        text: "The best offsite agendas alternate between high-focus working sessions and lower-intensity activities, rather than stacking six hours of back-to-back presentations. A common, effective structure for a two-day offsite: Day 1 morning for context-setting and strategic discussion, Day 1 afternoon for smaller breakout work, evening for informal team time, and Day 2 for synthesis, decisions, and next steps. Build in more breathing room than feels necessary — offsite discussions almost always run long.",
      },
      { type: "h2", text: "5. Plan travel and logistics as part of the agenda, not an afterthought" },
      {
        type: "p",
        text: "Late flights, mismatched room allocations, and confusing check-in processes eat into the time and goodwill an offsite is meant to build. If your team is travelling from multiple cities, a single consolidated itinerary — arranged as one booking rather than individual employee bookings — avoids the chaos of scattered PNRs and check-in times. This is also where combining event planning and travel planning under one team pays off: the agenda and the travel schedule can be designed together instead of separately.",
      },
      { type: "h2", text: "6. Assign a single point of ownership for the day" },
      {
        type: "p",
        text: "Even a well-planned offsite needs someone dedicated to running it in real time — managing timing, handling last-minute changes, and freeing up leadership to actually participate instead of managing logistics. This is either an internal team member pulled entirely off their regular work for the offsite, or an external coordinator whose only job that day is the offsite itself.",
      },
      { type: "h2", text: "7. Close with clear next steps, not just a good feeling" },
      {
        type: "p",
        text: "An offsite that ends with energy but no documented decisions tends to fade within a week. Build in 30–45 minutes at the end for the group to explicitly agree on 3–5 concrete actions, owners, and timelines, and circulate that summary within 48 hours while the context is still fresh.",
      },
      { type: "h2", text: "Getting the logistics off your plate" },
      {
        type: "p",
        text: "Everything above is manageable internally for a small offsite, but the coordination load grows fast with group size and travel complexity. Sportzoo plans corporate offsites end to end — venue sourcing, agenda design, travel and stay, and on-ground execution — so your team can focus on the discussion, not the logistics behind it.",
      },
    ],
  },
  {
    slug: "corporate-annual-day-planning-checklist",
    title: "Corporate Annual Day Planning Checklist: 10 Things to Confirm Before the Big Day",
    description:
      "A practical checklist covering venue, program, guest logistics, and vendor coordination for planning a corporate annual day that runs smoothly.",
    cluster: "Corporate Event Planning",
    datePublished: "2026-02-17",
    dateModified: "2026-02-17",
    relatedServicePath: "/corporate-events/corporate-annual-day-management",
    relatedServiceLabel: "Corporate Annual Day Management",
    body: [
      {
        type: "p",
        text: "Annual day is often the single largest company event of the year, sometimes with employee families in attendance, and it tends to accumulate a long list of small decisions that are easy to miss until they become a problem on the day itself. This checklist covers the ten areas worth confirming well before the event, drawn from what typically goes wrong when they're left too late.",
      },
      { type: "h2", text: "1. Guest count and family attendance policy" },
      {
        type: "p",
        text: "Confirm early whether families are invited, because it changes venue capacity planning, catering quantities, seating arrangements, and even the program itself — a family-inclusive event usually needs more family-friendly content and activities than an employees-only celebration.",
      },
      { type: "h2", text: "2. Venue capacity with realistic buffer" },
      {
        type: "p",
        text: "Book for at least 15–20% more than your confirmed headcount to account for plus-ones and last-minute additions, and verify the venue can genuinely handle that number comfortably — not just on paper capacity, but with usable seating, sightlines to the stage, and adequate restrooms and parking.",
      },
      { type: "h2", text: "3. AV and stage production requirements" },
      {
        type: "p",
        text: "List every segment that needs microphones, screens, or lighting cues — speeches, performances, award presentations, video montages — and confirm the venue's in-house AV team can support all of them, or bring in your own production vendor if not.",
      },
      { type: "h2", text: "4. A timed run-of-show" },
      {
        type: "p",
        text: "A full-day or evening program needs a minute-by-minute schedule, not just a rough sequence. Build in buffer time between segments, because transitions (guests moving, mic handoffs, stage resets) almost always take longer than expected." ,
      },
      { type: "h2", text: "5. Entertainment and anchor briefing" },
      {
        type: "p",
        text: "Whoever is anchoring the event needs the final run-of-show, correct pronunciation of names and award titles, and a clear brief on tone — confirm this at least a week before the event, not the morning of.",
      },
      { type: "h2", text: "6. Catering for a mixed-age, mixed-preference crowd" },
      {
        type: "p",
        text: "Menu planning for an annual day usually needs to account for dietary preferences and restrictions across a wider range of guests than a typical office event, especially when families are involved. Confirm final headcounts with the caterer at least 3-4 days out." ,
      },
      { type: "h2", text: "7. Seating and guest flow" },
      {
        type: "p",
        text: "Decide seating logic in advance — by department, by family, or open seating — and make sure ushers or signage are in place so guests aren't left figuring it out on arrival.",
      },
      { type: "h2", text: "8. Transport for large or family guest lists" },
      {
        type: "p",
        text: "If the venue is outside easy reach, arrange shuttle transport or clear parking instructions well ahead of time, particularly if families with children or elderly guests are attending.",
      },
      { type: "h2", text: "9. Awards and recognition segment logistics" },
      {
        type: "p",
        text: "If annual day includes a recognition ceremony, confirm trophies or certificates have arrived and are correctly labelled, and that presenters know the exact sequence — award mix-ups on stage are one of the most common and most visible planning failures." ,
      },
      { type: "h2", text: "10. A backup plan for outdoor or weather-dependent elements" },
      {
        type: "p",
        text: "If any part of the event is outdoors, have a confirmed indoor or covered contingency and communicate the trigger point (e.g., a decision made by a set time) so it isn't decided in a panic an hour before doors open.",
      },
      { type: "h2", text: "Managing it as one coordinated event" },
      {
        type: "p",
        text: "Most of these items fail not because they're difficult individually, but because they're each owned by a different vendor with no single person tracking all ten simultaneously. Sportzoo manages corporate annual day events end to end — venue, program, entertainment, catering, and logistics — as one coordinated engagement with a dedicated on-ground team.",
      },
    ],
  },
  {
    slug: "how-to-choose-a-corporate-event-venue",
    title: "How to Choose a Corporate Event Venue (Without Regretting It Later)",
    description:
      "A practical framework for shortlisting and verifying a corporate event venue — capacity, AV, access, and the questions most companies forget to ask before booking.",
    cluster: "Venue Selection",
    datePublished: "2026-02-24",
    dateModified: "2026-02-24",
    relatedServicePath: "/venue-booking",
    relatedServiceLabel: "Venue Booking & Management",
    body: [
      {
        type: "p",
        text: "Most venue booking mistakes aren't visible until the event is already underway — a mic that won't sync, a room that's smaller once the stage and catering stations eat into the floor space, or a parking situation nobody checked for a guest list that included families. Choosing a venue well means verifying the things that don't show up in the brochure photos, before you sign anything.",
      },
      { type: "h2", text: "1. Work out real usable capacity, not advertised capacity" },
      {
        type: "p",
        text: "A venue's advertised capacity almost always assumes an empty room with no stage, no catering counters, and no walkways. For a seated event with a stage, expect usable capacity to run 20–30% below the advertised number. Ask the venue directly what their capacity is for your specific format — seated with a stage, standing with catering stations, or classroom-style — not their generic maximum.",
      },
      { type: "h2", text: "2. Test AV and connectivity, don't take it on faith" },
      {
        type: "p",
        text: "\"We have AV\" can mean anything from a fully equipped conference system to a single wall-mounted TV. If the venue offers a site visit, bring your own laptop and test the projector, microphone, and Wi-Fi speed — don't rely on the venue's description. If a site visit isn't practical, ask for a video walkthrough and get written confirmation of the specific equipment included.",
      },
      { type: "h2", text: "3. Check sightlines, not just seating count" },
      {
        type: "p",
        text: "A room can seat 200 people and still have 40 of them unable to see the stage properly because of pillars, low ceilings, or poor stage placement. Walk the room (or ask for photos) from the back corners and side seats, not just from directly in front of the stage." ,
      },
      { type: "h2", text: "4. Confirm access, parking, and entry logistics for your actual guest count" },
      {
        type: "p",
        text: "Parking and entry that work fine for 50 guests can become a bottleneck at 300, especially for events that include employee families or external guests. Ask specifically about parking capacity, drop-off points, and how many entry points will be staffed — not just whether parking \"is available\"." ,
      },
      { type: "h2", text: "5. Get setup and teardown windows in writing" },
      {
        type: "p",
        text: "Decor, staging, and branding installation take time, and a venue that only grants access two hours before the event will force rushed setup. Confirm the exact setup and teardown windows in the contract, along with any overtime charges, before you commit to a decor or production plan." ,
      },
      { type: "h2", text: "6. Ask what happens if something goes wrong" },
      {
        type: "p",
        text: "Power backup, AV backup, and the venue's own contingency plan for outdoor spaces (if applicable) are worth asking about directly. A venue that has a clear, rehearsed answer to \"what happens if the power goes out mid-event\" is a better sign than one that hasn't thought about it." ,
      },
      { type: "h2", text: "Getting this verified before you book" },
      {
        type: "p",
        text: "Every one of these checks takes time most internal teams don't have when they're also managing the guest list, the program, and the catering. Sportzoo's venue booking service verifies capacity, AV, sightlines, and access before shortlisting anything for you, and negotiates rates on your behalf — so the venue decision is based on what we've checked, not what the brochure says.",
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
