"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { BlogPost } from "@/lib/types"

interface BlogSearchResultsProps {
  posts: BlogPost[]
  searchQuery: string
  selectedCategory: string
  totalPosts: number
}

function highlightSearchTerm(text: string, searchTerm: string): string {
  if (!searchTerm || !text) return text

    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
  return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>')
}

export default function BlogSearchResults({
  posts,
  searchQuery,
  selectedCategory,
  totalPosts,
}: BlogSearchResultsProps) {
  const hasActiveSearch = searchQuery || selectedCategory

    if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">
          {hasActiveSearch ? (
            <>
              <h3 className="text-lg font-medium mb-2">No posts found</h3>
              <p>No posts match your search criteria. Try adjusting your search terms or browse all posts.</p>
            </>
          ) : (
            <>
              <h3 className="text-lg font-medium mb-2">No posts available</h3>
              <p>There are no blog posts to display at the moment.</p>
            </>
          )}
        </div>
      </div>
    )
  }

    return (
    <div>
      {/* Results Summary */}
      {hasActiveSearch && (
        <div className="mb-6 text-sm text-gray-600">
          Showing {posts.length} of {totalPosts} posts
          {searchQuery && ` for "${searchQuery}"`}
          {selectedCategory && ` in "${selectedCategory}"`}
                  </div>
      )}

      {/* Posts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.slug} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="p-0">
              {post.featuredImage ? (
                <div className="relative h-48 w-full">
                  <Image
                                      src={post.featuredImage || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">📝</div>
                    <div className="text-sm">Blog Post</div>
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-xs">
                                  {post.category}
                </Badge>
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(post.date).toLocaleDateString()}
                                  </div>
              </div>

              <Link href={`/blog/${post.slug}`} className="group">
                <h3
                  className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2"
                  dangerouslySetInnerHTML={{
                    __html: highlightSearchTerm(post.title, searchQuery),
                  }}
                                  />
              </Link>

              <p
                className="text-gray-600 text-sm mb-4 line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: highlightSearchTerm(post.excerpt, searchQuery),
                }}
              />

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <User className="w-3 h-3 mr-1" />
                  {post.author}
                                  </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {Math.ceil(post.content.split(" ").length / 200)} min read
                                  </div>
              </div>
            </CardContent>
          </Card>
        ))}
              </div>
    </div>
  )
}