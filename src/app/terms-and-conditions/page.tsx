import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { isPathHidden } from "@/lib/hiddenPages";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: "Terms and Conditions | Elephant Corporate",
  description: "Terms and conditions governing the use of Elephant Corporate's website and services.",
  path: "/terms-and-conditions",
});

export default async function TermsPage() {
  if (await isPathHidden("/terms-and-conditions")) notFound();

  return (
    <>
      <Breadcrumbs items={[{ name: "Terms and Conditions", path: "/terms-and-conditions" }]} />
      <Section className="bg-white">
        <div className="prose max-w-3xl space-y-6 text-sm leading-relaxed text-slate-700">
          <h1 className="text-3xl font-bold text-[color:var(--color-navy-900)]">Terms and Conditions</h1>
          <p className="text-slate-500">Last updated: [DATE]</p>

          <p>
            These Terms and Conditions govern your use of {siteConfig.domain} and any services provided by{" "}
            {siteConfig.legalName} (&ldquo;Elephant Corporate&rdquo;). By using this website or engaging our services,
            you agree to these terms.
          </p>

          <h2 className="text-xl font-semibold text-[color:var(--color-navy-900)]">1. Services</h2>
          <p>
            Elephant Corporate provides corporate event management, artist booking, venue booking, and event rental
            services as described on this website. Specific engagement terms, including pricing,
            deliverables, and timelines, are confirmed in a written proposal or agreement for each engagement.
          </p>

          <h2 className="text-xl font-semibold text-[color:var(--color-navy-900)]">2. Quotations</h2>
          <p>
            Quotations provided through this website or in response to an enquiry are estimates based on the
            information supplied and are subject to confirmation once full requirements, dates, and
            availability are verified.
          </p>

          <h2 className="text-xl font-semibold text-[color:var(--color-navy-900)]">3. Payments</h2>
          <p>
            Payment terms, including advance payments and cancellation policies, are specified in the formal
            proposal or agreement issued for each engagement and are not governed by this general terms page.
          </p>

          <h2 className="text-xl font-semibold text-[color:var(--color-navy-900)]">4. Third-party vendors</h2>
          <p>
            Elephant Corporate coordinates with third-party vendors (venues, performers, equipment and production
            suppliers, transport providers) on your behalf. While we select and manage these vendors
            carefully, Elephant Corporate is not liable for
            failures or delays caused solely by a third-party vendor outside our reasonable control.
          </p>

          <h2 className="text-xl font-semibold text-[color:var(--color-navy-900)]">5. Website use</h2>
          <p>
            You agree not to misuse this website, including submitting false information through our forms or
            attempting to interfere with its normal operation.
          </p>

          <h2 className="text-xl font-semibold text-[color:var(--color-navy-900)]">6. Limitation of liability</h2>
          <p>
            To the extent permitted by law, Elephant Corporate&apos;s liability for any claim arising from services rendered
            is limited to the value of fees paid for the specific engagement in question.
          </p>

          <h2 className="text-xl font-semibold text-[color:var(--color-navy-900)]">7. Governing law</h2>
          <p>These terms are governed by the laws of India, with jurisdiction in [CITY] courts.</p>

          <h2 className="text-xl font-semibold text-[color:var(--color-navy-900)]">8. Contact</h2>
          <p>For questions about these terms, contact us at {siteConfig.email}.</p>

          <p className="text-xs text-slate-400">
            This is a general template and should be reviewed by legal counsel before publication.
          </p>
        </div>
      </Section>
    </>
  );
}
