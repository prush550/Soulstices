import { getPublishedPosts, getCategories } from "@/lib/mdx"
import BlogPageClient from "@/components/blog-page-client"

export default async function BlogPage() {
  const allPosts = getPublishedPosts()
  const categories = getCategories(allPosts)

  return <BlogPageClient initialPosts={allPosts} initialCategories={categories} />
}
