"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SoulsticesLogo } from "@/components/soulstices-logo"
import { Calendar, Trash2, Eye, Plus, Clock, FileText } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { BlogPost } from "@/lib/types"

export default function ManageBlogPage() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch posts from API instead of top-level await
        const response = await fetch('/api/posts?status=all')
        
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.status}`)
        }
        
        const posts = await response.json()
        setAllPosts(posts)
      } catch (error) {
        console.error("Error fetching posts:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch posts")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleDeletePost = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/delete-post/${slug}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setAllPosts(allPosts.filter((post) => post.slug !== slug))
        alert("Blog post deleted successfully!")
      } else {
        const errorData = await response.json()
        alert(`Failed to delete blog post: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error("Error deleting blog post:", error)
      alert("Error deleting blog post")
    }
  }

  const publishPost = async (slug: string) => {
    try {
      const response = await fetch(`/api/admin/publish-post/${slug}`, {
        method: "POST",
      })

      if (response.ok) {
        // Refresh posts after publishing
        const updatedResponse = await fetch('/api/posts?status=all')
        if (updatedResponse.ok) {
          const updatedPosts = await updatedResponse.json()
          setAllPosts(updatedPosts)
        }
        alert("Post published successfully!")
      } else {
        const errorData = await response.json()
        alert(`Failed to publish post: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error("Error publishing post:", error)
      alert("Error publishing post")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-600 text-white"
      case "scheduled":
        return "bg-orange-600 text-white"
      case "draft":
        return "bg-slate-600 text-white"
      default:
        return "bg-slate-600 text-white"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <Eye className="w-3 h-3" />
      case "scheduled":
        return <Clock className="w-3 h-3" />
      case "draft":
        return <FileText className="w-3 h-3" />
      default:
        return <FileText className="w-3 h-3" />
    }
  }

  const publishedPosts = allPosts.filter((post) => post.status === "published")
  const draftPosts = allPosts.filter((post) => post.status === "draft")
  const scheduledPosts = allPosts.filter((post) => post.status === "scheduled")

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Error loading posts: {error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-teal-600 hover:bg-teal-700"
          >
            Retry
          </Button>
        </div>
      </div>
    )
  }

  const PostCard = ({ post }: { post: BlogPost }) => (
    <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center space-x-2">
              <Badge className={`${getStatusColor(post.status)} border-0 flex items-center space-x-1`}>
                {getStatusIcon(post.status)}
                <span>{post.status}</span>
              </Badge>
              <Badge variant="outline" className="border-slate-600 text-slate-400">
                {post.category}
              </Badge>
              <div className="flex items-center space-x-1 text-sm text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>
                  {post.status === "scheduled" && post.publishDate
                    ? new Date(post.publishDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                </span>
              </div>
            </div>
            <CardTitle className="text-slate-100 text-xl line-clamp-2">{post.title}</CardTitle>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            {post.status === "published" && (
              <Link href={`/blog/${post.slug}`}>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </Link>
            )}
            {post.status === "draft" && (
              <Button
                size="sm"
                onClick={() => publishPost(post.slug)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Publish
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
              onClick={() => handleDeletePost(post.slug)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          {post.featuredImage && (
            <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image src={post.featuredImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
          )}
          <p className="text-slate-300 leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <SoulsticesLogo size={32} />
            <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
              Soulstices Admin
            </span>
          </Link>
          <nav className="flex items-center space-x-8">
            <Link href="/admin" className="text-slate-300 hover:text-teal-400 transition-colors">
              Create Post
            </Link>
            <Link href="/blog" className="text-slate-300 hover:text-teal-400 transition-colors">
              View Blog
            </Link>
            <Link href="/" className="text-slate-300 hover:text-teal-400 transition-colors">
              Home
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                  Manage Blog Posts
                </span>
              </h1>
              <p className="text-slate-400">View, edit, and manage your blog posts</p>
            </div>
            <Link href="/admin/create-post">
              <Button className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create New Post
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-slate-700 rounded-lg">
                    <FileText className="w-5 h-5 text-slate-300" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-100">{allPosts.length}</p>
                    <p className="text-sm text-slate-400">Total Posts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-100">{publishedPosts.length}</p>
                    <p className="text-sm text-slate-400">Published</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-slate-600 rounded-lg">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-100">{draftPosts.length}</p>
                    <p className="text-sm text-slate-400">Drafts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-orange-600 rounded-lg">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-100">{scheduledPosts.length}</p>
                    <p className="text-sm text-slate-400">Scheduled</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Posts Tabs */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="bg-slate-800 border-slate-700">
              <TabsTrigger value="all" className="data-[state=active]:bg-slate-700">
                All Posts ({allPosts.length})
              </TabsTrigger>
              <TabsTrigger value="published" className="data-[state=active]:bg-slate-700">
                Published ({publishedPosts.length})
              </TabsTrigger>
              <TabsTrigger value="drafts" className="data-[state=active]:bg-slate-700">
                Drafts ({draftPosts.length})
              </TabsTrigger>
              <TabsTrigger value="scheduled" className="data-[state=active]:bg-slate-700">
                Scheduled ({scheduledPosts.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {allPosts.length === 0 ? (
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="text-center py-12">
                    <p className="text-slate-400 text-lg mb-4">No blog posts found</p>
                    <Link href="/admin">
                      <Button className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white">
                        Create Your First Post
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {allPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="published" className="space-y-6">
              {publishedPosts.length === 0 ? (
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="text-center py-12">
                    <p className="text-slate-400 text-lg">No published posts</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {publishedPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="drafts" className="space-y-6">
              {draftPosts.length === 0 ? (
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="text-center py-12">
                    <p className="text-slate-400 text-lg">No draft posts</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {draftPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="scheduled" className="space-y-6">
              {scheduledPosts.length === 0 ? (
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="text-center py-12">
                    <p className="text-slate-400 text-lg">No scheduled posts</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {scheduledPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
