// app/api/admin/publish-post/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prismadb";

// Generate slug from title (same as in posts API)
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
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

    // Find post by matching slug to generated slug from title
    const posts = await prisma.post.findMany();
    const post = posts.find(p => generateSlug(p.title) === slug);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Update post to published status
    await prisma.post.update({
      where: { id: post.id },
      data: {
        status: "published",
        publishDate: new Date() // Set publish date to now
      }
    });

    return NextResponse.json({ message: "Post published successfully" });

  } catch (error) {
    console.error("Error publishing post:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
