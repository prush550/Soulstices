import { NextResponse } from 'next/server'
import { getPublishedPosts, searchPosts } from '@/lib/mdx'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const category = searchParams.get('category') || undefined
    
    const allPosts = getPublishedPosts()
    const results = searchPosts(allPosts, query, category)
    
    return NextResponse.json(results)
  } catch (error) {
    console.error('Error searching posts:', error)
    return NextResponse.json({ error: 'Failed to search posts' }, { status: 500 })
  }
}
