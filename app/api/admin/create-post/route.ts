import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const { title, excerpt, category, content, date, status, publishDate, featuredImage } = await request.json()

    // Validate required fields
    if (!title || !excerpt || !category || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate scheduled posts have publish date
    if (status === "scheduled" && !publishDate) {
      return NextResponse.json({ error: "Scheduled posts must have a publish date" }, { status: 400 })
    }

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    // Create the blog post content with all metadata
    const blogPostContent = `---
title: "${title}"
date: "${date}"
excerpt: "${excerpt}"
category: "${category}"
status: "${status || "published"}"
${publishDate ? `publishDate: "${publishDate}"` : ""}
${featuredImage ? `featuredImage: "${featuredImage}"` : ""}
---

${content}
`

    // Ensure the content/blog directory exists
    const blogDir = path.join(process.cwd(), "content", "blog")
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true })
    }

    // Write the file
    const filePath = path.join(blogDir, `${slug}.mdx`)

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      return NextResponse.json({ error: "A blog post with this title already exists" }, { status: 409 })
    }

    fs.writeFileSync(filePath, blogPostContent, "utf-8")

    return NextResponse.json({
      message: "Blog post created successfully",
      slug,
      status,
      filePath: `content/blog/${slug}.mdx`,
    })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
