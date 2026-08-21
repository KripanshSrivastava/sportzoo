import { Section, SectionHeading } from "@/components/ui/Section";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { getBusinessSettings } from "@/lib/businessSettings";
import { getPublishedCities } from "@/lib/citiesData";

export async function ContactSplitBlock() {
  const settings = await getBusinessSettings();
  const cities = await getPublishedCities();

  return (
    <Section className="bg-white">
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="space-y-8 lg:col-span-2">
          <div>
            <SectionHeading title="Office" />
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{settings.officeAddress}</p>
            {settings.mapUrl && !settings.mapUrl.startsWith("[") && (
              <a
                href={settings.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-semibold text-[color:var(--color-electric)]"
              >
                Get directions →
              </a>
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[color:var(--color-navy-900)]">Phone</h3>
            <a href={settings.phoneHref} className="text-sm text-slate-700 hover:text-[color:var(--color-electric)]">
              {settings.phone}
            </a>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[color:var(--color-navy-900)]">Email</h3>
            <a href={`mailto:${settings.email}`} className="text-sm text-slate-700 hover:text-[color:var(--color-electric)]">
              {settings.email}
            </a>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[color:var(--color-navy-900)]">Business Hours</h3>
            <p className="text-sm text-slate-700">{settings.businessHours}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[color:var(--color-navy-900)]">Service Areas</h3>
            <p className="text-sm text-slate-700">
              {settings.serviceArea} — including {cities.map((c) => c.name).join(", ")}
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8 lg:col-span-3">
          <QuoteForm sourcePage="Contact" />
        </div>
      </div>
    </Section>
  );
}
