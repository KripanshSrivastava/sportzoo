import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { isPathHidden } from "@/lib/hiddenPages";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: "Privacy Policy | Elephant Corporate",
  description: "How Elephant Corporate collects, uses, and protects the personal information you share with us.",
  path: "/privacy-policy",
});

export default async function PrivacyPolicyPage() {
  if (await isPathHidden("/privacy-policy")) notFound();

  return (
    <>
      <Breadcrumbs items={[{ name: "Privacy Policy", path: "/privacy-policy" }]} />
      <Section className="bg-white">
        <div className="prose max-w-3xl space-y-6 text-sm leading-relaxed text-slate-700">
          <h1 className="text-3xl font-bold text-[color:var(--color-navy-900)]">Privacy Policy</h1>
          <p className="text-slate-500">Last updated: [DATE]</p>

          <p>
            This Privacy Policy explains how {siteConfig.legalName} (&ldquo;Elephant Corporate&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;) collects, uses, and protects information when you visit {siteConfig.domain} or
            submit an enquiry to us.
          </p>

          <h2 className="text-xl font-semibold text-[color:var(--color-navy-900)]">1. Information we collect</h2>
          <p>When you submit an enquiry or quotation request, we collect:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Your full name, company name, work email, and phone number</li>
            <li>Details of your event or travel requirement, including dates, budget, and destination</li>
            <li>Technical information such as UTM parameters, landing page, and referrer, used to understand how you found us</li>
          </ul>

          <h2 className="text-xl font-semibold text-[color:var(--color-navy-900)]">2. How we use your information</h2>
          <p>We use the information you provide to:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Respond to your enquiry and prepare a quotation</li>
            <li>Communicate with you about your event or travel requirement</li>
            <li>Improve our website and services</li>
          </ul>
          <p>We do not sell your personal information to third parties.</p>

          <h2 className="text-xl font-semibold text-[color:var(--color-navy-900)]">3. Analytics and cookies</h2>
          <p>
            We may use Google Analytics and Google Tag Manager to understand how visitors use our website.
            These tools may set cookies on your device. You can control cookies through your browser
            settings. Where a consent mechanism is enabled on this site, analytics scripts load only after
            consent is given.
          </p>

          <h2 className="text-xl font-semibold text-[color:var(--color-navy-900)]">4. Data retention</h2>
          <p>
            We retain enquiry data for as long as necessary to respond to your request and maintain business
            records, and delete it in line with applicable law upon request.
          </p>

          <h2 className="text-xl font-semibold text-[color:var(--color-navy-900)]">5. Your rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal information by contacting
            us at {siteConfig.email}.
          </p>

          <h2 className="text-xl font-semibold text-[color:var(--color-navy-900)]">6. Contact</h2>
          <p>
            For privacy-related questions, contact us at {siteConfig.email} or {siteConfig.phone}.
          </p>

          <p className="text-xs text-slate-400">
            This policy is a general template and should be reviewed by legal counsel before publication to
            ensure compliance with applicable Indian data protection law (including the Digital Personal Data
            Protection Act, 2023) and any other jurisdictions you operate in.
          </p>
        </div>
      </Section>
    </>
  );
}
