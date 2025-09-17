// app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
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
    status: post.status as "draft" | "published" | "scheduled",
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    // For public access, only show published posts
    if (status !== 'all') {
      const publishedPosts = await prisma.post.findMany({
        where: {
          status: "published",
          publishDate: {
            lte: new Date()
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

      return NextResponse.json(convertToPublishedPosts(publishedPosts));
    }

    // For 'all' status, check authentication
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user has admin privileges
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user || !["FOUNDER", "COLLABORATOR"].includes(user.role)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Get all posts for admin users
    const allPosts = await prisma.post.findMany({
      include: {
        author: {
          select: { name: true }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(convertToPublishedPosts(allPosts));

  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
