import Image from "next/image";
import { QuoteButton, WhatsAppButton } from "@/components/cta/CtaLinks";
import { BlueprintCorners } from "@/components/ui/Blueprint";
import { siteImages } from "@/config/images";
import { getBusinessSettings } from "@/lib/businessSettings";

export async function Hero() {
  const settings = await getBusinessSettings();
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--color-accent-900)", color: "var(--color-neutral-100)" }}>
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in srgb, var(--color-bg) 8%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-bg) 8%, transparent) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="container-page relative grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 lg:py-24">
        <div>
          <span
            className="tag tag-outline"
            style={{ color: "var(--color-accent-300)", borderColor: "var(--color-accent-300)", marginBottom: "20px" }}
          >
            Corporate Event Management Partner
          </span>
          <h1 className="mt-5 max-w-[620px] text-[34px] leading-[1.08] sm:text-[42px] lg:text-[52px] lg:leading-[1.06]">
            Corporate Events, Artists, Venues and Rentals — Planned Precisely, Delivered End to End
          </h1>
          <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed" style={{ color: "var(--color-neutral-300)" }}>
            {settings.brand} plans corporate offsites and employee engagement events, and books artists, venues, and
            event equipment for companies across {settings.primaryCity} and India — one accountable team
            from the first brief to the final invoice.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <QuoteButton label="Get a Custom Quote" size="lg" />
            <WhatsAppButton pageLabel="corporate events and bookings" label="Chat on WhatsApp" variant="outline" size="lg" />
          </div>
          <div className="mt-8 flex flex-wrap gap-x-7 gap-y-2 text-[13px]" style={{ color: "var(--color-neutral-400)" }}>
            <span>Corporate events &amp; offsites</span>
            <span>Artist, venue &amp; rental booking</span>
            <span>Single point of accountability</span>
          </div>
        </div>

        {/* To change this photo, see src/config/images.ts (siteImages.hero) */}
        <div
          className="blueprint relative aspect-[4/3] w-full overflow-hidden"
          style={{ borderColor: "color-mix(in srgb, var(--color-neutral-100) 30%, transparent)" }}
        >
          <BlueprintCorners color="var(--color-neutral-300)" />
          <Image
            src={siteImages.hero}
            alt="Corporate offsite and conference event"
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, color-mix(in srgb, var(--color-accent-900) 70%, transparent), transparent)" }} />
        </div>
      </div>
    </section>
  );
}
