import { QuoteButton, WhatsAppButton } from "@/components/cta/CtaLinks";
import { getBusinessSettings } from "@/lib/businessSettings";

export async function FinalCta({
  title = "Ready to plan your next corporate event?",
  description,
  pageLabel = "corporate events and bookings",
}: {
  title?: string;
  description?: string;
  pageLabel?: string;
}) {
  const settings = await getBusinessSettings();
  const copy =
    description ??
    `Share your requirements and we'll come back with a costed proposal${
      settings.responsePromise ? ` ${settings.responsePromise}` : ""
    }.`;
  return (
    <section style={{ background: "var(--color-accent-900)" }} className="px-6 py-20 text-center">
      <h2 className="mx-auto max-w-xl" style={{ color: "var(--color-neutral-100)" }}>
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-[520px] text-base" style={{ color: "var(--color-neutral-300)" }}>
        {copy}
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <QuoteButton label="Request a Quote" size="lg" />
        <WhatsAppButton pageLabel={pageLabel} variant="outline" size="lg" />
      </div>
    </section>
  );
}
