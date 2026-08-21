export const BLOCK_TYPES = [
  "hero",
  "richText",
  "cardsGrid",
  "numberedSteps",
  "testimonials",
  "statsBand",
  "tagGrid",
  "faq",
  "categoryOverviewGrid",
  "servicesGrid",
  "caseStudiesPreview",
  "serviceLocations",
  "contactSplit",
  "ctaBand",
  "leadForm",
] as const;

export type BlockType = (typeof BLOCK_TYPES)[number];

export interface Block {
  id: string;
  type: BlockType;
  props: Record<string, unknown>;
}
