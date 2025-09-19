// app/blog/page.tsx
import { getPublishedPosts, getCategories } from "@/lib/database-blog";
import BlogPageClient from "@/components/blog-page-client";

export default async function BlogPage() {
  // Use direct database calls instead of API fetch to avoid deployment issues
  const allPosts = await getPublishedPosts();
  const categories = getCategories(allPosts);
  
  return <BlogPageClient initialPosts={allPosts} initialCategories={categories} />;
}
