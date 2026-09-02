import { Section, SectionHeading } from "@/components/ui/Section";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { CallButton, WhatsAppButton } from "@/components/cta/CtaLinks";
import { Blueprint } from "@/components/ui/Blueprint";
import { getBusinessSettings } from "@/lib/businessSettings";

export async function LeadFormSection({
  defaultService,
  sourcePage,
  title = "Plan your event or booking",
  description,
}: {
  defaultService?: string;
  sourcePage: string;
  title?: string;
  description?: string;
}) {
  const settings = await getBusinessSettings();
  const copy =
    description ??
    `Tell us what you need and we'll come back with a costed proposal${
      settings.responsePromise ? ` ${settings.responsePromise}` : ""
    }.`;
  return (
    <Section id="quote-form">
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionHeading eyebrow="Get Started" title={title} description={copy} />
          <Blueprint className="mt-7 flex flex-col gap-2.5 p-5">
            <p className="m-0 text-sm font-semibold">Prefer to talk directly?</p>
            <div className="flex flex-wrap gap-2.5">
              <CallButton label="Call Us" variant="secondary" />
              <WhatsAppButton pageLabel={sourcePage} variant="secondary" label="Chat on WhatsApp" />
            </div>
            <p className="m-0 text-xs" style={{ color: "var(--color-neutral-600)" }}>
              {settings.businessHours}
            </p>
          </Blueprint>
        </div>
        <Blueprint className="elev-md p-6 sm:p-8 lg:col-span-3">
          <QuoteForm defaultService={defaultService} sourcePage={sourcePage} />
        </Blueprint>
      </div>
    </Section>
  );
}
