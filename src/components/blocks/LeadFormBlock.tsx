import { LeadFormSection } from "@/components/sections/LeadFormSection";

export function LeadFormBlock({ sourceLabel }: { sourceLabel?: string }) {
  return <LeadFormSection sourcePage={sourceLabel || "Website"} />;
}
