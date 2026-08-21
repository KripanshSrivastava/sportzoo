import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CallButton, WhatsAppButton } from "@/components/cta/CtaLinks";
import { siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: "Thank You | Sportzoo",
  description: "Your enquiry has been received. Sportzoo will respond within 24 business hours.",
  path: "/thank-you",
  noIndex: true,
});

export default function ThankYouPage() {
  return (
    <section className="flex flex-1 items-center justify-center bg-slate-50 py-20">
      <div className="container-page max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600">
          ✓
        </div>
        <h1 className="text-3xl font-bold text-[color:var(--color-navy-900)]">Thank you — we&apos;ve got it.</h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          Your enquiry has been received. A member of the Sportzoo team will reach out within 24 business
          hours with a costed proposal. If your timeline is urgent, call or WhatsApp us directly.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <CallButton label={siteConfig.phone} variant="primary" size="lg" />
          <WhatsAppButton pageLabel="a follow-up" size="lg" />
        </div>
        <Link href="/" className="mt-8 inline-block text-sm font-semibold text-[color:var(--color-electric)]">
          ← Back to homepage
        </Link>
      </div>
    </section>
  );
}
