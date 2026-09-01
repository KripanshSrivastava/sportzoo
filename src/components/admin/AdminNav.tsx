"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/settings", label: "Business Info" },
  { href: "/admin/logos", label: "Client Logos" },
  { href: "/admin/pages", label: "Pages" },
  { href: "/admin/service-pages", label: "Service Pages" },
  { href: "/admin/cities", label: "Cities" },
  { href: "/admin/case-studies", label: "Our Work" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/gallery", label: "Gallery" },
];

export function AdminNav() {
  const pathname = usePathname() ?? "";

  return (
    <nav className="flex flex-wrap gap-x-1 gap-y-1 text-sm">
      {NAV_ITEMS.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className="rounded px-2.5 py-1.5"
            style={
              active
                ? { background: "var(--color-accent-700)", color: "var(--color-neutral-100)", fontWeight: 600 }
                : { color: "var(--color-neutral-700)" }
            }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
