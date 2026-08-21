import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig, targetCities } from "@/config/site";

export const metadata = buildMetadata({
  title: "Contact Sportzoo | Corporate Events, Artists, Venues & Rentals",
  description: `Contact Sportzoo for corporate event management, artist booking, venue booking, and event rental enquiries in ${siteConfig.primaryCity} and across India.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Sportzoo",
          url: `${siteConfig.url}/contact`,
        }}
      />
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />

      <section className="bg-[color:var(--color-navy-950)] py-14 text-white sm:py-16">
        <div className="container-page">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Have a question before requesting a quote? Reach us directly or send an enquiry below.
          </p>
        </div>
      </section>

      <Section className="bg-white">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="space-y-8 lg:col-span-2">
            <div>
              <SectionHeading title="Office" />
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{siteConfig.officeAddress}</p>
              {siteConfig.mapUrl && !siteConfig.mapUrl.startsWith("[") && (
                <a
                  href={siteConfig.mapUrl}
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
              <a href={siteConfig.phoneHref} className="text-sm text-slate-700 hover:text-[color:var(--color-electric)]">
                {siteConfig.phone}
              </a>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[color:var(--color-navy-900)]">Email</h3>
              <a href={`mailto:${siteConfig.email}`} className="text-sm text-slate-700 hover:text-[color:var(--color-electric)]">
                {siteConfig.email}
              </a>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[color:var(--color-navy-900)]">Business Hours</h3>
              <p className="text-sm text-slate-700">{siteConfig.businessHours}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[color:var(--color-navy-900)]">Service Areas</h3>
              <p className="text-sm text-slate-700">
                {siteConfig.serviceArea} — including {targetCities.map((c) => c.name).join(", ")}
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8 lg:col-span-3">
            <QuoteForm sourcePage="Contact" />
          </div>
        </div>
      </Section>
    </>
  );
}
