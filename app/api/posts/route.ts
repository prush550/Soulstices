// In your /api/posts/route.ts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    
    let posts
    if (status === 'all') {
      // Return all posts regardless of status for admin
      posts = getAllPosts() // Without status filter
    } else if (status) {
      posts = getAllPosts(status as 'published' | 'draft' | 'scheduled')
    } else {
      posts = getPublishedPosts() // Default for public
    }
    
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}
