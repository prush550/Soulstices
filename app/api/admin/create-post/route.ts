// app/api/admin/create-post/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prismadb";

export async function POST(request: NextRequest) {
  try {
    // Check authentication and authorization
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is FOUNDER
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user || user.role !== "FOUNDER") {
      return NextResponse.json({ error: "Access denied. Founder role required." }, { status: 403 });
    }

    const { title, excerpt, category, content, status, publishDate, featuredImage } = await request.json();

    // Validate required fields
    if (!title || !excerpt || !category || !content) {
      return NextResponse.json({ error: "Missing required fields: title, excerpt, category, and content are required" }, { status: 400 });
    }

    // Validate scheduled posts have publish date
    if (status === "scheduled" && !publishDate) {
      return NextResponse.json({ error: "Scheduled posts must have a publish date" }, { status: 400 });
    }

    // Set publish date based on status
    let finalPublishDate = new Date();
    if (status === "scheduled" && publishDate) {
      finalPublishDate = new Date(publishDate);
    } else if (status === "draft") {
      // For drafts, use a future date so they don't show as published
      finalPublishDate = new Date("2099-01-01");
    }

    // Create the blog post in database
    const newPost = await prisma.post.create({
      data: {
        title,
        excerpt,
        category,
        content,
        status: status || "draft",
        publishDate: finalPublishDate,
        featuredImage: featuredImage || null,
        authorId: user.id,
      }
    });

    console.log("✅ Blog post created:", {
      id: newPost.id,
      title: newPost.title,
      status: newPost.status,
      publishDate: newPost.publishDate
    });

    return NextResponse.json({
      message: "Blog post created successfully",
      post: {
        id: newPost.id,
        title: newPost.title,
        status: newPost.status,
        publishDate: newPost.publishDate,
        category: newPost.category
      }
    });

  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
