import { Section, SectionHeading } from "@/components/ui/Section";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { siteConfig } from "@/config/site";
import { CallButton, WhatsAppButton } from "@/components/cta/CtaLinks";

export function LeadFormSection({
  defaultService,
  sourcePage,
  title = "Plan your event or travel",
  description = "Tell us what you need and we'll come back with a costed proposal within 24–48 hours.",
}: {
  defaultService?: string;
  sourcePage: string;
  title?: string;
  description?: string;
}) {
  return (
    <Section className="bg-slate-50" id="quote-form">
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionHeading eyebrow="Get Started" title={title} description={description} />
          <div className="mt-8 space-y-4 rounded-xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold text-[color:var(--color-navy-900)]">Prefer to talk directly?</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <CallButton label={siteConfig.phone} variant="ghost" />
              <WhatsAppButton pageLabel={sourcePage} />
            </div>
            <p className="text-xs text-slate-500">{siteConfig.businessHours}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-3">
          <QuoteForm defaultService={defaultService} sourcePage={sourcePage} />
        </div>
      </div>
    </Section>
  );
}
