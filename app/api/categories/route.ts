import { NextResponse } from 'next/server'
import { getPublishedPosts, getCategories } from '@/lib/mdx'

export async function GET() {
  try {
    const posts = getPublishedPosts()
    const categories = getCategories(posts)
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}
