/**
 * Case study TYPE only. There is intentionally no static case-study data:
 * "Our Work" is populated exclusively from real, permissioned records added
 * through /admin/case-studies. The site never ships demo/template case studies
 * (developer spec §9).
 */

export interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  clientDescriptor: string;
  summary: string;
  challenge: string;
  solution: string;
  execution: string;
  outcomes: string[];
  testimonial?: { quote: string; attribution: string };
}
