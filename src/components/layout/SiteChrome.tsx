"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { WhatsAppFloat } from "@/components/cta/WhatsAppFloat";
import { MobileStickyBar } from "@/components/cta/MobileStickyBar";

// The entry popup shows nothing for the first 4s — load its code (and the
// quote-form validation bundle it pulls in) lazily, after hydration.
const LeadPopup = dynamic(() => import("@/components/forms/LeadPopup").then((m) => m.LeadPopup), { ssr: false });

/**
 * The admin panel (/admin/**) is a separate application surface — no public
 * nav, floating CTAs, or lead popup. Since Next.js only supports one root
 * layout without restructuring every route into a group, this switches on
 * pathname instead. If /admin grows further, moving public routes into a
 * (site) route group with its own root layout would be the more "proper"
 * long-term fix.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="flex-1 pb-24 sm:pb-0">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <MobileStickyBar />
      <LeadPopup />
    </>
  );
}
