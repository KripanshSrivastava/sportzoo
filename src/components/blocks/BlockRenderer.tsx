import type { Block } from "@/lib/blocks/types";
import { HeroBlock } from "./HeroBlock";
import { RichTextBlock } from "./RichTextBlock";
import { CardsGridBlock } from "./CardsGridBlock";
import { NumberedStepsBlock } from "./NumberedStepsBlock";
import { TestimonialsBlock } from "./TestimonialsBlock";
import { GoogleReviewsBlock } from "./GoogleReviewsBlock";
import { SocialFeedBlock } from "./SocialFeedBlock";
import { ImageBlock } from "./ImageBlock";
import { ClientLogosBlock } from "./ClientLogosBlock";
import { StatsBandBlock } from "./StatsBandBlock";
import { TagGridBlock } from "./TagGridBlock";
import { FaqBlock } from "./FaqBlock";
import { CategoryOverviewGridBlock } from "./CategoryOverviewGridBlock";
import { ServicesGridBlock } from "./ServicesGridBlock";
import { CaseStudiesPreviewBlock } from "./CaseStudiesPreviewBlock";
import { ServiceLocationsBlock } from "./ServiceLocationsBlock";
import { ContactSplitBlock } from "./ContactSplitBlock";
import { CtaBandBlock } from "./CtaBandBlock";
import { LeadFormBlock } from "./LeadFormBlock";

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block) => {
        if (block.hidden) return null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const p = block.props as any;
        switch (block.type) {
          case "hero":
            return <HeroBlock key={block.id} {...p} />;
          case "richText":
            return <RichTextBlock key={block.id} {...p} />;
          case "cardsGrid":
            return <CardsGridBlock key={block.id} {...p} />;
          case "numberedSteps":
            return <NumberedStepsBlock key={block.id} {...p} />;
          case "testimonials":
            return <TestimonialsBlock key={block.id} {...p} />;
          case "googleReviews":
            return <GoogleReviewsBlock key={block.id} {...p} />;
          case "socialFeed":
            return <SocialFeedBlock key={block.id} {...p} />;
          case "image":
            return <ImageBlock key={block.id} {...p} />;
          case "clientLogos":
            return <ClientLogosBlock key={block.id} {...p} />;
          case "statsBand":
            return <StatsBandBlock key={block.id} {...p} />;
          case "tagGrid":
            return <TagGridBlock key={block.id} {...p} />;
          case "faq":
            return <FaqBlock key={block.id} {...p} />;
          case "categoryOverviewGrid":
            return <CategoryOverviewGridBlock key={block.id} {...p} />;
          case "servicesGrid":
            return <ServicesGridBlock key={block.id} {...p} />;
          case "caseStudiesPreview":
            return <CaseStudiesPreviewBlock key={block.id} {...p} />;
          case "serviceLocations":
            return <ServiceLocationsBlock key={block.id} {...p} />;
          case "contactSplit":
            return <ContactSplitBlock key={block.id} />;
          case "ctaBand":
            return <CtaBandBlock key={block.id} {...p} />;
          case "leadForm":
            return <LeadFormBlock key={block.id} {...p} />;
          default:
            return null;
        }
      })}
    </>
  );
}
