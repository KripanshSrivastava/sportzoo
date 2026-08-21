import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { placeholderLogo } from "@/lib/placeholderImages";

// DEMO DATA — these are placeholder company names, not real clients.
// Replace with real client logos (and remove this list) once permission is confirmed.
const mockClients = ["Nexora Tech", "Bluewave Systems", "Orbit Retail", "Vantage Capital", "Northfield Labs", "Kestrel Pharma"];

export function ClientLogos() {
  return (
    <Section className="bg-slate-50 py-10 sm:py-12">
      <p className="text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
        Trusted by growing companies across industries
      </p>
      <div className="mt-6 grid grid-cols-3 gap-6 sm:grid-cols-6">
        {mockClients.map((name) => (
          <div
            key={name}
            className="flex h-14 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-white"
          >
            <Image
              src={placeholderLogo(name)}
              alt={`${name} logo`}
              width={200}
              height={72}
              className="h-full w-full object-contain"
              unoptimized
            />
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-slate-400">
        Demo client names for preview purposes — replace with real client logos once permission is confirmed.
      </p>
    </Section>
  );
}
