import { BlogPostForm, emptyBlogPost } from "@/components/admin/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1>New Blog Post</h1>
      <BlogPostForm initial={emptyBlogPost} />
    </div>
  );
}
