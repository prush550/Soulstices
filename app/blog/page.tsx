// app/blog/page.tsx
import BlogPageClient from "@/components/blog-page-client";

async function getPublishedPosts() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/posts`, {
      cache: 'no-store', // Ensure fresh data
    });
    
    if (!response.ok) {
      console.error('Failed to fetch posts:', response.status);
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

async function getCategories() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/categories`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      console.error('Failed to fetch categories:', response.status);
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function BlogPage() {
  const allPosts = await getPublishedPosts();
  const categories = await getCategories();
  
  return <BlogPageClient initialPosts={allPosts} initialCategories={categories} />;
}
