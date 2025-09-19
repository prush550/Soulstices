"use client";

import { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import type { BlogPost } from "@/lib/types";
import BlogSearch from "@/components/blog-search";
import BlogSearchResults from "@/components/blog-search-results";
import { BlogSidebar } from "@/components/blog-sidebar";
import { Button } from "@/components/ui/button";
import { SoulsticesLogo } from "@/components/soulstices-logo";
import Link from "next/link";

interface BlogPageClientProps {
  initialPosts: BlogPost[];
  initialCategories: { name: string; count: number }[];
}

export default function BlogPageClient({ initialPosts, initialCategories }: BlogPageClientProps) {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(initialPosts);
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>(initialPosts.slice(0, 6));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [postsToShow, setPostsToShow] = useState(6);
  const { data: session, status } = useSession();

  const handleSearch = useCallback(
    (query: string, category: string) => {
      setSearchQuery(query);
      setSelectedCategory(category);
      const filtered = clientSearchPosts(initialPosts, query, category);
      setFilteredPosts(filtered);
      setDisplayedPosts(filtered.slice(0, postsToShow));
    },
    [initialPosts, postsToShow],
  );

  const loadMorePosts = () => {
    const newPostsToShow = postsToShow + 6;
    setPostsToShow(newPostsToShow);
    setDisplayedPosts(filteredPosts.slice(0, newPostsToShow));
  };

  const refreshPosts = async () => {
    const response = await fetch('/api/posts?status=published'); // Adjust the API endpoint as needed
    if (response.ok) {
      const updatedPosts = await response.json();
      setFilteredPosts(updatedPosts);
      setDisplayedPosts(updatedPosts.slice(0, postsToShow));
    }
  };

  const handleDeletePost = async (slug: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      const response = await fetch(`/api/admin/delete-post/${slug}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Blog post deleted successfully!");
        refreshPosts(); // Refresh posts after deletion
      } else {
        alert("Failed to delete blog post.");
      }
    }
  };

  const hasActiveSearch = searchQuery || selectedCategory;
  const hasMorePosts = displayedPosts.length < filteredPosts.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <SoulsticesLogo size={32} />
            <span className="text-xl font-bold text-gray-900">Soulstices</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/services" className="text-gray-600 hover:text-gray-900 transition-colors">
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
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Soulstices Blog</h1>
              <p className="text-lg text-gray-600">
                Insights, stories, and resources for mental health and personal growth
              </p>
            </div>

            <div className="mb-8">
              <BlogSearch
                categories={initialCategories}
                onSearch={handleSearch}
                initialQuery={searchQuery}
                initialCategory={selectedCategory}
              />
            </div>

            <BlogSearchResults
              posts={displayedPosts}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              totalPosts={initialPosts.length}
            />

            {hasMorePosts && !hasActiveSearch && (
              <div className="text-center mt-8">
                <Button onClick={loadMorePosts} variant="outline">
                  Load More Posts
                </Button>
              </div>
            )}

            {renderAdminPanel()}
          </div>

          <div className="lg:w-80">
            <BlogSidebar posts={initialPosts} />
          </div>
        </div>
      </div>
    </div>
  );
}
