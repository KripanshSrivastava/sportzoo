import { QuoteButton, WhatsAppButton } from "@/components/cta/CtaLinks";

export function FinalCta({
  title = "Ready to plan your next corporate event or business trip?",
  description = "Share your requirements and get a costed proposal within 24–48 hours — no obligation.",
  pageLabel = "corporate events and travel",
}: {
  title?: string;
  description?: string;
  pageLabel?: string;
}) {
  return (
    <section className="bg-[color:var(--color-navy-950)] py-16 sm:py-20">
      <div className="container-page flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
        <p className="max-w-xl text-lg text-slate-300">{description}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <QuoteButton label="Request a Quote" />
          <WhatsAppButton pageLabel={pageLabel} variant="outline" size="lg" />
        </div>
      </div>
    </section>
  );
}
