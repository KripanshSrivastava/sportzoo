import { Section } from "@/components/ui/Section";

export function ClientLogos() {
  return (
    <Section className="bg-slate-50 py-10 sm:py-12">
      <p className="text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
        Trusted by growing companies across industries
      </p>
      <div className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex h-14 items-center justify-center rounded-md border border-dashed border-slate-300 bg-white text-xs text-slate-400"
          >
            Client logo
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-slate-400">
        Placeholder logo slots — replace with real client logos once permission is confirmed.
      </p>
    </Section>
  );
}
