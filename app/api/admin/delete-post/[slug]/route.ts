import { type NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function DELETE(
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
    
    // Sanitize slug to prevent directory traversal attacks
    const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-_]/g, '')
    if (sanitizedSlug !== slug) {
      return NextResponse.json({ error: "Invalid slug format" }, { status: 400 })
    }
    
    const contentDir = path.join(process.cwd(), "content", "blog")
    const filePath = path.join(contentDir, `${sanitizedSlug}.mdx`)
    
    // Ensure the file path is within the content directory (security check)
    const normalizedFilePath = path.normalize(filePath)
    const normalizedContentDir = path.normalize(contentDir)
    
    if (!normalizedFilePath.startsWith(normalizedContentDir)) {
      return NextResponse.json({ error: "Invalid file path" }, { status: 400 })
    }
    
    // Check if file exists
    if (!fs.existsSync(normalizedFilePath)) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }
    
    // Verify it's actually a file (not a directory)
    const stats = fs.statSync(normalizedFilePath)
    if (!stats.isFile()) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
    }
    
    // Get file info before deletion for logging
    const fileSize = stats.size
    const lastModified = stats.mtime
    
    // Delete the file
    fs.unlinkSync(normalizedFilePath)
    
    // Log the deletion for audit purposes
    console.log(`Blog post deleted: ${slug} (size: ${fileSize} bytes, last modified: ${lastModified})`)
    
    return NextResponse.json({ 
      message: "Blog post deleted successfully",
      slug: sanitizedSlug,
      deletedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    
    // More specific error handling
    if (error instanceof Error) {
      // Handle specific file system errors
      if (error.message.includes('ENOENT')) {
        return NextResponse.json(
          { error: "Blog post not found" }, 
          { status: 404 }
        )
      }
      
      if (error.message.includes('EACCES') || error.message.includes('EPERM')) {
        return NextResponse.json(
          { error: "Permission denied - unable to delete file" }, 
          { status: 403 }
        )
      }
      
      return NextResponse.json(
        { error: `Failed to delete blog post: ${error.message}` }, 
        { status: 500 }
      )
    }
    
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
