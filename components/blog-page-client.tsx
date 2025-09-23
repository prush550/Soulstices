"use client";

import { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import type { BlogPost } from "@/lib/types";
import BlogSearch from "@/components/blog-search";
import BlogSearchResults from "@/components/blog-search-results";
import { BlogSidebar } from "@/components/blog-sidebar";
import { Button } from "@/components/ui/button";
import AdminButton from "@/components/AdminButton";

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

  const clientSearchPosts = (posts: BlogPost[], query: string, category: string): BlogPost[] => {
    let filtered = posts;

    if (category) filtered = filtered.filter((post) => post.category === category);
    if (query) {
      const searchTerm = query.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.excerpt.toLowerCase().includes(searchTerm) ||
          post.category.toLowerCase().includes(searchTerm),
      );
    }

    return filtered;
  };

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
    const response = await fetch('/api/posts?status=published');
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
        refreshPosts();
      } else {
        alert("Failed to delete blog post.");
      }
    }
  };

  const hasActiveSearch = searchQuery || selectedCategory;
  const hasMorePosts = displayedPosts.length < filteredPosts.length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                Soulstices Blog
              </h1>
              <p className="text-lg text-slate-400">
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
                <Button 
                  onClick={loadMorePosts} 
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  Load More Posts
                </Button>
              </div>
            )}

            <div className="mt-8">
              <AdminButton />
            </div>
          </div>

          <div className="lg:w-80">
            <BlogSidebar posts={initialPosts} />
          </div>
        </div>
      </div>
    </div>
  );
}