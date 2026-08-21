import { FAQSection } from "@/components/sections/FAQSection";

export function FaqBlock({ title, items }: { title?: string; items: { q: string; a: string }[] }) {
  return title ? <FAQSection faqs={items} title={title} /> : <FAQSection faqs={items} />;
}
