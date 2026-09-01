import Link from "next/link";
import type { Metadata } from "next";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid var(--color-divider)", background: "var(--color-surface)" }}>
        <div className="container-page flex flex-col gap-3 py-3">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-lg font-semibold" style={{ fontFamily: "var(--font-heading)", textDecoration: "none", color: "var(--color-text)" }}>
              Admin
            </Link>
            <div className="ml-auto flex items-center gap-3">
              <Link href="/" target="_blank" className="text-sm" style={{ color: "var(--color-neutral-600)" }}>
                View site &rarr;
              </Link>
              <AdminLogoutButton />
            </div>
          </div>
          <AdminNav />
        </div>
      </header>
      <main className="container-page py-10">{children}</main>
    </div>
  );
}
