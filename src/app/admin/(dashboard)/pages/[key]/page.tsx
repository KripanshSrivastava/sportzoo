import { notFound } from "next/navigation";
import { PAGE_KEYS, type PageKey } from "@/lib/pageContent";
import { PAGE_CONTENT_SCHEMAS } from "@/lib/pageContentSchemas";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { PageContentForm } from "@/components/admin/PageContentForm";

export default async function EditPageContentPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!PAGE_KEYS.includes(key as PageKey)) notFound();
  const pageKey = key as PageKey;

  const supabase = getSupabaseAdmin();
  let content: Record<string, unknown> = {};
  if (supabase) {
    const { data } = await supabase.from("page_content").select("content").eq("page_key", pageKey).maybeSingle();
    content = (data?.content as Record<string, unknown>) ?? {};
  }

  const schema = PAGE_CONTENT_SCHEMAS[pageKey];

  return (
    <div>
      <h1>Edit {schema.label}</h1>
      <p className="text-muted mb-6 text-sm">Leave a field blank to keep using the page&apos;s built-in default copy.</p>
      <PageContentForm pageKey={pageKey} fields={schema.fields} initialContent={content} />
    </div>
  );
}
