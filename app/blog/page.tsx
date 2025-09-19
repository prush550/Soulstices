// app/blog/page.tsx
import { getPublishedPosts, getCategories } from "@/lib/database-blog";
import BlogPageClient from "@/components/blog-page-client";

export default async function BlogPage({ initialPosts, initialCategories }) {
  return <BlogPageClient initialPosts={initialPosts} initialCategories={initialCategories} />;
}

// Use getServerSideProps to fetch posts on each request
export async function getServerSideProps() {
  const allPosts = await getPublishedPosts();
  const categories = getCategories(allPosts);
  
  return {
    props: {
      initialPosts: allPosts,
      initialCategories: categories,
    },
  };
}
