"use client";

import { ServicePageForm, emptyServicePage } from "@/components/admin/ServicePageForm";

export default function NewServicePagePage() {
  return (
    <div>
      <h1>New Service Page</h1>
      <ServicePageForm initial={emptyServicePage} />
    </div>
  );
}
