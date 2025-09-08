"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Tag, TrendingUp, Mail, Settings } from "lucide-react"
import Link from "next/link"
import type { BlogPost } from "@/lib/types"

interface BlogSidebarProps {
  posts: BlogPost[]
}

export function BlogSidebar({ posts }: BlogSidebarProps) {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)

  // Get categories with counts
  const categories = posts.reduce(
    (acc, post) => {
      const category = post.category || "General"
      acc[category] = (acc[category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const categoryList = Object.entries(categories)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)

  // Get recent posts (last 5)
  const recentPosts = posts.slice(0, 5)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)

    // Simulate newsletter signup
    await new Promise((resolve) => setTimeout(resolve, 1000))

    alert("Thank you for subscribing to our newsletter!")
    setEmail("")
    setIsSubscribing(false)
  }

  return (
    <div className="space-y-6">
      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Tag className="w-5 h-5" />
            <span>Categories</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Link
              href="/blog"
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span>All Posts</span>
              <Badge variant="secondary">{posts.length}</Badge>
            </Link>
            {categoryList.map((category) => (
              <Link
                key={category.name}
                href={`/blog?category=${encodeURIComponent(category.name)}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span>{category.name}</span>
                <Badge variant="secondary">{category.count}</Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Recent Posts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group hover:bg-gray-50 p-3 rounded-lg transition-colors"
              >
                <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors mb-1 line-clamp-2">
                  {post.title}
                </h4>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {post.category}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>Stay Updated</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4 text-sm">
            Subscribe to our newsletter for the latest insights and community updates.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="space-y-3">
            <div>
              <Label htmlFor="newsletter-email" className="sr-only">
                Email address
              </Label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={isSubscribing} className="w-full">
              {isSubscribing ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Admin Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Admin</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Link href="/admin" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Create New Post
            </Link>
            <Link href="/admin/manage" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors">
              Manage Posts
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Default export
export default BlogSidebar
