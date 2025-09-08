"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"

interface BlogSearchProps {
  categories: { name: string; count: number }[]
  onSearch: (query: string, category: string) => void
  initialQuery?: string
  initialCategory?: string
}

export default function BlogSearch({ categories, onSearch, initialQuery = "", initialCategory = "" }: BlogSearchProps) {
  const [query, setQuery] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)

  useEffect(() => {
    onSearch(query, selectedCategory)
  }, [query, selectedCategory, onSearch])

  const clearSearch = () => {
    setQuery("")
    setSelectedCategory("")
  }

  const hasActiveFilters = query || selectedCategory

  return (
    <div className="space-y-4 mb-8">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Search blog posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-4 py-2"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === "" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("")}
        >
          All Categories
        </Button>
        {categories.map((category) => (
          <Button
            key={category.name}
            variant={selectedCategory === category.name ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.name)}
            className="flex items-center gap-1"
          >
            {category.name}
            <Badge variant="secondary" className="ml-1 text-xs">
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Active filters:</span>
          {query && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: "{query}"
              <X className="w-3 h-3 cursor-pointer" onClick={() => setQuery("")} />
            </Badge>
          )}
          {selectedCategory && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {selectedCategory}
              <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory("")} />
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearSearch} className="text-xs">
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
