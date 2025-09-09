import { NextResponse } from 'next/server'
import { getAllPosts, getPublishedPosts } from '@/lib/mdx'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const published = searchParams.get('published')
    
    let posts
    if (published === 'true') {
      posts = getPublishedPosts()
    } else if (status) {
      posts = getAllPosts(status as 'published' | 'draft' | 'scheduled')
    } else {
      posts = getPublishedPosts() // Default to published posts for public
    }
    
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}
