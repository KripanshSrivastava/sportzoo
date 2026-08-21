import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CaseStudiesPreview } from "@/components/sections/CaseStudiesPreview";
import { IndustriesServed } from "@/components/sections/IndustriesServed";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Testimonials } from "@/components/sections/Testimonials";
import { StatsBand } from "@/components/sections/StatsBand";
import { ServiceLocations } from "@/components/sections/ServiceLocations";
import { FAQSection } from "@/components/sections/FAQSection";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { siteConfig } from "@/config/site";

export const metadata = buildMetadata({
  title: `Corporate Event Management Company | ${siteConfig.brand}`,
  description:
    "Sportzoo is a corporate event management company serving companies across India — offsites, annual day, rewards ceremonies, artist booking, venue booking, and event rentals.",
  path: "/",
});

const homeFaqs = [
  {
    q: "What does Sportzoo actually manage?",
    a: "Corporate events (offsites, annual day, recognition ceremonies, team building, gifting, conferences), artist booking and entertainment, venue booking, and event rentals and equipment — either as separate bookings or combined into one managed event.",
  },
  {
    q: "Which cities do you operate in?",
    a: `We're headquartered in ${siteConfig.primaryCity} and manage events, artist bookings, venues, and rentals across India.`,
  },
  {
    q: "How quickly can we get a quote?",
    a: "Most enquiries receive a costed proposal within 24–48 hours of sharing your requirements.",
  },
  {
    q: "Do you work with companies of all sizes?",
    a: "Yes — from 15-person leadership offsites to company-wide annual day events with several hundred attendees.",
  },
  {
    q: "How is Sportzoo different from a generic event management company?",
    a: "We manage corporate events, artist booking, venue booking, and rentals under one team, so logistics that usually get split across multiple vendors are planned and executed together.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyChooseUs />
      <ProcessSteps />
      <CaseStudiesPreview />
      <IndustriesServed />
      <ClientLogos />
      <Testimonials />
      <StatsBand />
      <ServiceLocations />
      <FAQSection faqs={homeFaqs} />
      <LeadFormSection sourcePage="Home" />
      <FinalCta />
    </>
  );
}
