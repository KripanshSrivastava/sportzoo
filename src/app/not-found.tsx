import Link from "next/link";
import { QuoteButton } from "@/components/cta/CtaLinks";
import { mainNav } from "@/config/nav";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center justify-center bg-slate-50 py-20">
      <div className="container-page max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-[color:var(--color-accent-dark)]">
          404 error
        </p>
        <h1 className="mt-3 text-3xl font-bold text-[color:var(--color-navy-900)] sm:text-4xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          The page you&apos;re looking for may have moved or no longer exists. Here are a few useful places to
          start instead.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {mainNav.slice(0, 6).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-navy-900)] hover:border-[color:var(--color-electric)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <QuoteButton label="Request a Quote" />
        </div>
      </div>
    </section>
  );
}
