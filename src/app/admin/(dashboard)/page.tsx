import Link from "next/link";

const GROUPS: { heading: string; items: { href: string; title: string; desc: string }[] }[] = [
  {
    heading: "Set up once",
    items: [
      {
        href: "/admin/settings",
        title: "Business Info",
        desc: "Name, phone, WhatsApp, email, address, hours, logo, social links, Google rating — used everywhere on the site.",
      },
      {
        href: "/admin/logos",
        title: "Client Logos",
        desc: "The company logos in the “Companies that trust our work” banner. Upload each logo + name in one place.",
      },
    ],
  },
  {
    heading: "Pages & layout",
    items: [
      {
        href: "/admin/pages",
        title: "Pages",
        desc: "Home, About, Contact and the 4 category pages. Add / reorder / hide sections and edit their text and photos.",
      },
      {
        href: "/admin/service-pages",
        title: "Service Pages",
        desc: "The individual service pages under Corporate Events, Artist Booking, Venues and Rentals.",
      },
      { href: "/admin/cities", title: "Cities", desc: "The city landing pages (e.g. /corporate-event-management/gurugram)." },
    ],
  },
  {
    heading: "Content",
    items: [
      { href: "/admin/case-studies", title: "Our Work", desc: "Case studies shown on the Our Work page and the homepage." },
      { href: "/admin/events", title: "Events", desc: "Event listings with optional paid registration, plus the sign-up list for each." },
      { href: "/admin/gallery", title: "Gallery", desc: "Photos on the public Gallery page, grouped by category." },
    ],
  },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="m-0">Dashboard</h1>
        <p className="text-muted text-sm">Everything on the website is edited from here. Pick an area below.</p>
      </div>

      <div className="flex flex-col gap-8">
        {GROUPS.map((group) => (
          <div key={group.heading}>
            <h6 className="mb-3" style={{ color: "var(--color-accent-700)" }}>
              {group.heading}
            </h6>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="card p-4 transition-shadow hover:shadow-md"
                  style={{ textDecoration: "none" }}
                >
                  <p className="m-0 text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                    {item.title} &rarr;
                  </p>
                  <p className="text-muted m-0 mt-1 text-xs leading-relaxed">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
