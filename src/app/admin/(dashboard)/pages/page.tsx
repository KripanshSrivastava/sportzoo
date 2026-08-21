import Link from "next/link";
import { PAGE_KEYS } from "@/lib/pageContent";
import { PAGE_CONTENT_SCHEMAS } from "@/lib/pageContentSchemas";

const PATH_BY_KEY: Record<string, string> = {
  home: "/",
  about: "/about",
  contact: "/contact",
  "corporate-events-overview": "/corporate-events",
  "artist-booking-overview": "/artist-booking",
  "venue-booking-overview": "/venue-booking",
  "event-rentals-overview": "/event-rentals",
};

export default function AdminPagesPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="m-0">Pages</h1>
        <p className="text-muted text-sm">
          Edit the headline, intro copy, and repeatable content (reasons, steps, testimonials, FAQs, etc.) on these
          pages. Detailed layout stays fixed in code — this covers the text.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {PAGE_KEYS.map((key) => (
          <div key={key} className="card flex items-center justify-between p-4">
            <div>
              <p className="m-0 text-sm font-semibold">{PAGE_CONTENT_SCHEMAS[key].label}</p>
              <p className="text-muted m-0 text-xs">{PATH_BY_KEY[key]}</p>
            </div>
            <Link href={`/admin/pages/${key}`} className="btn btn-secondary">
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
