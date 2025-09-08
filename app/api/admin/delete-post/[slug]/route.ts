import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 })
    }

    const filePath = path.join(process.cwd(), "content", "blog", `${slug}.mdx`)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    // Delete the file
    fs.unlinkSync(filePath)

    return NextResponse.json({ message: "Blog post deleted successfully" })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
