import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { CallButton, WhatsAppButton } from "@/components/cta/CtaLinks";
import { getBusinessSettings } from "@/lib/businessSettings";

export const metadata = buildMetadata({
  title: "Request a Quote | Elephant Corporate",
  description:
    "Tell Elephant Corporate about your corporate event, artist, venue, or rental requirement and receive a costed proposal.",
  path: "/request-a-quote",
});

export const dynamic = "force-dynamic";

export default async function RequestQuotePage() {
  const settings = await getBusinessSettings();
  return (
    <>
      <Breadcrumbs items={[{ name: "Request a Quote", path: "/request-a-quote" }]} />

      <section className="bg-[color:var(--color-navy-950)] py-14 text-white sm:py-16">
        <div className="container-page">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Plan Your Event or Booking
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Share your requirements below and our team will respond with a costed proposal
            {settings.responsePromise ? ` ${settings.responsePromise}` : ""} — no obligation.
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="Prefer to Talk?" title="Reach us directly" />
            <div className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex flex-col gap-3">
                <CallButton label={settings.phone} variant="ghost" />
                <WhatsAppButton pageLabel="a new enquiry" />
              </div>
              <p className="text-sm text-slate-600">{settings.email}</p>
              <p className="text-sm text-slate-600">{settings.businessHours}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-3">
            <QuoteForm sourcePage="Request a Quote" />
          </div>
        </div>
      </Section>
    </>
  );
}
