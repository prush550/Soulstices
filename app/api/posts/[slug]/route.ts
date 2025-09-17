import { NextRequest, NextResponse } from 'next/server'
import { getPostBySlug } from '@/lib/database-blog'

export async function GET(
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
    
    // Sanitize slug to prevent potential issues
    const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-_]/g, '')
    if (sanitizedSlug !== slug) {
      return NextResponse.json({ error: "Invalid slug format" }, { status: 400 })
    }
    
    // Get the post
    const post = getPostBySlug(sanitizedSlug)
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    
    // Only return published posts for public API
    if (post.status !== 'published') {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    
    // Check if post should be published yet (for scheduled posts)
    const now = new Date()
    const postDate = new Date(post.date)
    
    if (postDate > now) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching post:', error)
    
    // More specific error handling
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to fetch post: ${error.message}` }, 
        { status: 500 }
      )
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
