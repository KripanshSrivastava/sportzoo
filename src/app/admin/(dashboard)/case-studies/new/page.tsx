import { CaseStudyForm, emptyCaseStudy } from "@/components/admin/CaseStudyForm";

export default function NewCaseStudyPage() {
  return (
    <div>
      <h1>New Case Study</h1>
      <CaseStudyForm initial={emptyCaseStudy} />
    </div>
  );
}
