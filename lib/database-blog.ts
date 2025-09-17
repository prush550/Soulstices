// lib/database-blog.ts
import prisma from "@/lib/prismadb";
import type { BlogPost } from "@/lib/types";

// Convert Prisma Post to BlogPost interface
function convertToPublishedPosts(posts: any[]): BlogPost[] {
  return posts.map(post => ({
    slug: generateSlug(post.title),
    title: post.title,
    date: post.createdAt.toISOString(),
    excerpt: post.excerpt,
    category: post.category,
    content: post.content,
    status: post.status,
    publishDate: post.publishDate.toISOString(),
    featuredImage: post.featuredImage || undefined,
    author: post.author?.name || "Anonymous",
    tags: [] // You can add tags later if needed
  }));
}

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Get all published posts
export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const posts = await prisma.post.findMany({
      where: {
        status: "published",
        publishDate: {
          lte: new Date() // Only posts with publish date <= now
        }
      },
      include: {
        author: {
          select: { name: true }
        }
      },
      orderBy: {
        publishDate: "desc"
      }
    });

    return convertToPublishedPosts(posts);
  } catch (error) {
    console.error("Error fetching published posts:", error);
    return [];
  }
}

// Get all posts (for admin)
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: { name: true }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return convertToPublishedPosts(posts);
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return [];
  }
}

// Get post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Since we don't store slug in database, we need to find by title
    // This is a limitation - ideally we'd add a slug field to the database
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: { name: true }
        }
      }
    });

    const post = posts.find(p => generateSlug(p.title) === slug);
    
    if (!post) return null;

    const converted = convertToPublishedPosts([post]);
    return converted[0] || null;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

// Get categories with post counts
export function getCategories(posts: BlogPost[]): { name: string; count: number }[] {
  const categoryMap = new Map<string, number>();
  
  posts.forEach(post => {
    const count = categoryMap.get(post.category) || 0;
    categoryMap.set(post.category, count + 1);
  });
  
  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

// Get recent posts
export function getRecentPosts(posts: BlogPost[], limit: number = 5): BlogPost[] {
  return posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

// Delete post
export async function deletePost(postId: string): Promise<boolean> {
  try {
    await prisma.post.delete({
      where: { id: postId }
    });
    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    return false;
  }
}

// Update post
export async function updatePost(postId: string, data: Partial<{
  title: string;
  excerpt: string;
  category: string;
  content: string;
  status: string;
  publishDate: Date;
  featuredImage: string;
}>): Promise<boolean> {
  try {
    await prisma.post.update({
      where: { id: postId },
      data
    });
    return true;
  } catch (error) {
    console.error("Error updating post:", error);
    return false;
  }
}
