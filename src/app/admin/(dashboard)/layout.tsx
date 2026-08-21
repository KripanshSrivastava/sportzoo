import Link from "next/link";
import type { Metadata } from "next";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const navItems = [
  { href: "/admin/settings", label: "Business Info" },
  { href: "/admin/case-studies", label: "Our Work" },
  { href: "/admin/gallery", label: "Gallery" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid var(--color-divider)", background: "var(--color-surface)" }}>
        <div className="container-page flex h-16 items-center gap-6">
          <span className="text-lg font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
            Admin
          </span>
          <nav className="flex gap-4 text-sm">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <Link href="/" className="text-sm" style={{ color: "var(--color-neutral-600)" }}>
              View site →
            </Link>
            <AdminLogoutButton />
          </div>
        </div>
      </header>
      <main className="container-page py-10">{children}</main>
    </div>
  );
}
