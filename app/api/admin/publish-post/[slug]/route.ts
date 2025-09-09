import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

export async function POST(
  request: NextRequest, 
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Await the params Promise to get the actual parameters
    const resolvedParams = await params
    const { slug } = resolvedParams
    
    // Validate slug parameter
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ error: "Invalid slug parameter" }, { status: 400 })
    }
    
    const filePath = path.join(process.cwd(), "content", "blog", `${slug}.mdx`)
    
    // Check if file exists
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
      // Ensure date is set if not already present
      date: data.date || new Date().toISOString(),
    }
    
    // Create the updated content
    const updatedContent = matter.stringify(content, updatedData)
    
    // Write the updated file
    fs.writeFileSync(filePath, updatedContent, "utf-8")
    
    return NextResponse.json({
      message: "Blog post published successfully",
      slug,
      publishDate: updatedData.publishDate,
    })
  } catch (error) {
    console.error("Error publishing blog post:", error)
    
    // More specific error handling
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to publish blog post: ${error.message}` }, 
        { status: 500 }
      )
    }
    
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
