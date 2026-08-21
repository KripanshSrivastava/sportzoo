import { QuoteButton, WhatsAppButton } from "@/components/cta/CtaLinks";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-navy-950)] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-navy-700),_transparent_60%)] opacity-70" />
      <div className="container-page relative grid gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <p className="mb-4 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-200">
            Corporate Event Management Partner
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-[3.25rem]">
            Corporate Events, Artists, Venues and Rentals — Planned Precisely, Delivered End to End
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            Sportzoo plans corporate offsites and employee engagement events, and books artists, venues, and
            event equipment for companies across {siteConfig.primaryCity} and India — one accountable team
            from the first brief to the final invoice.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <QuoteButton label="Get a Custom Quote" />
            <WhatsAppButton pageLabel="corporate events and bookings" label="Chat on WhatsApp" variant="outline" size="lg" />
          </div>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-slate-400">
            <span>Corporate events &amp; offsites</span>
            <span>Artist, venue &amp; rental booking</span>
            <span>Single point of accountability</span>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[color:var(--color-navy-700)] to-[color:var(--color-navy-900)] shadow-2xl">
          <div className="flex h-full w-full items-center justify-center p-8 text-center text-slate-300">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-400">Featured</p>
              <p className="mt-2 text-xl font-semibold text-white">
                Corporate offsite &amp; conference imagery placeholder
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Replace with real event photography — offsites, annual day, or live performances.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
