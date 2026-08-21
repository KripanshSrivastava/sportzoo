import { FinalCta } from "@/components/sections/FinalCta";

export function CtaBandBlock({ title, description }: { title?: string; description?: string }) {
  return <FinalCta {...(title ? { title } : {})} {...(description ? { description } : {})} />;
}
