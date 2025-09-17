import { NextResponse } from 'next/server'
import { getPublishedPosts, getCategories } from '@/lib/database-blog'

export async function GET() {
  try {
    const posts = getPublishedPosts()
    const categories = getCategories(posts)
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to fetch categories: ${error.message}` }, 
        { status: 500 }
      )
    }
    
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}
