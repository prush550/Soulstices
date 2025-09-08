import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

export async function POST(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params
    const filePath = path.join(process.cwd(), "content", "blog", `${slug}.mdx`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    // Read the existing file
    const fileContents = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContents)

    // Update the status to published and set publish date
    const updatedData = {
      ...data,
      status: "published",
      publishDate: new Date().toISOString(),
    }

    // Create the updated content
    const updatedContent = matter.stringify(content, updatedData)

    // Write the updated file
    fs.writeFileSync(filePath, updatedContent, "utf-8")

    return NextResponse.json({
      message: "Blog post published successfully",
      slug,
    })
  } catch (error) {
    console.error("Error publishing blog post:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
