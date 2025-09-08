"use client"

import { useState, useEffect, useCallback } from "react"
import { getPublishedPosts, getCategories, searchPosts, type BlogPost } from "@/lib/mdx"
import BlogSearch from "@/components/blog-search"
import BlogSearchResults from "@/components/blog-search-results"
import { BlogSidebar } from "@/components/blog-sidebar"
import { Button } from "@/components/ui/button"
import { SoulsticesLogo } from "@/components/soulstices-logo"
import Link from "next/link"

export default function BlogPage() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [postsToShow, setPostsToShow] = useState(6)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = getPublishedPosts()
        setAllPosts(posts)
        setFilteredPosts(posts)
        setDisplayedPosts(posts.slice(0, postsToShow))
        setCategories(getCategories(posts))
      } catch (error) {
        console.error("Error loading posts:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [postsToShow])

  const handleSearch = useCallback(
    (query: string, category: string) => {
      setSearchQuery(query)
      setSelectedCategory(category)

      const filtered = searchPosts(allPosts, query, category)
      setFilteredPosts(filtered)
      setDisplayedPosts(filtered.slice(0, postsToShow))
    },
    [allPosts, postsToShow],
  )

  const loadMorePosts = () => {
    const newPostsToShow = postsToShow + 6
    setPostsToShow(newPostsToShow)
    setDisplayedPosts(filteredPosts.slice(0, newPostsToShow))
  }

  const hasActiveSearch = searchQuery || selectedCategory
  const hasMorePosts = displayedPosts.length < filteredPosts.length

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <SoulsticesLogo size={32} />
            <span className="text-xl font-bold text-gray-900">Soulstices</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#services" className="text-gray-600 hover:text-gray-900 transition-colors">
              Services
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </Link>
            <Link href="/blog" className="text-blue-600 font-medium">
              Blog
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Soulstices Blog</h1>
              <p className="text-lg text-gray-600">
                Insights, stories, and resources for mental health and personal growth
              </p>
            </div>

            {/* Search */}
            <div className="mb-8">
              <BlogSearch
                categories={categories}
                onSearch={handleSearch}
                initialQuery={searchQuery}
                initialCategory={selectedCategory}
              />
            </div>

            {/* Results */}
            <BlogSearchResults
              posts={displayedPosts}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              totalPosts={allPosts.length}
            />

            {/* Load More */}
            {hasMorePosts && !hasActiveSearch && (
              <div className="text-center mt-8">
                <Button onClick={loadMorePosts} variant="outline">
                  Load More Posts
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <BlogSidebar posts={allPosts} />
          </div>
        </div>
      </div>
    </div>
  )
}
