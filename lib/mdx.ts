import type { BlogPost } from "./types"

// Only import Node.js modules if we're in a server environment
let fs: any = null
let path: any = null
let matter: any = null

if (typeof window === "undefined") {
  // We're on the server, safe to import Node.js modules
  fs = require("fs")
  path = require("path")
  matter = require("gray-matter")
}

const getPostsDirectory = () => {
  if (typeof window !== "undefined" || !path) {
    return null
  }
  return path.join(process.cwd(), "content/blog")
}

export function getAllPosts(status?: "published" | "draft" | "scheduled"): BlogPost[] {
  if (typeof window !== "undefined" || !fs || !path || !matter) {
    return []
  }

  try {
    const postsDirectory = getPostsDirectory()
    if (!postsDirectory || !fs.existsSync(postsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter((name: string) => name.endsWith(".mdx"))
      .map((name: string) => {
        const slug = name.replace(/\.mdx$/, "")
        const fullPath = path.join(postsDirectory, name)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        return {
          slug,
          title: data.title || "Untitled",
          date: data.date || new Date().toISOString(),
          excerpt: data.excerpt || "",
          category: data.category || "General",
          content,
          status: data.status || "published",
          publishDate: data.publishDate,
          featuredImage: data.featuredImage,
          author: data.author || "Soulstices Team",
          tags: data.tags || [],
        } as BlogPost
      })
      .sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime())

    if (status) {
      return allPostsData.filter((post: BlogPost) => post.status === status)
    }

    return allPostsData
  } catch (error) {
    console.error("Error reading posts:", error)
    return []
  }
}

export function getPublishedPosts(): BlogPost[] {
  const allPosts = getAllPosts("published")
  const now = new Date()

  return allPosts.filter((post) => {
    const postDate = new Date(post.date)
    return postDate <= now
  })
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (typeof window !== "undefined" || !fs || !path || !matter) {
    return null
  }

  try {
    const postsDirectory = getPostsDirectory()
    if (!postsDirectory) {
      return null
    }

    const fullPath = path.join(postsDirectory, `${slug}.mdx`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || "",
      category: data.category || "General",
      content,
      status: data.status || "published",
      publishDate: data.publishDate,
      featuredImage: data.featuredImage,
      author: data.author || "Soulstices Team",
      tags: data.tags || [],
    } as BlogPost
  } catch (error) {
    console.error("Error reading post:", error)
    return null
  }
}

export function getCategories(posts: BlogPost[]): { name: string; count: number }[] {
  const categoryCount = posts.reduce(
    (acc, post) => {
      const category = post.category || "General"
      acc[category] = (acc[category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return Object.entries(categoryCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export function searchPosts(posts: BlogPost[], query: string, category?: string): BlogPost[] {
  let filtered = posts

  if (category && category !== "all") {
    filtered = filtered.filter((post) => post.category === category)
  }

  if (query && query.trim()) {
    const searchTerm = query.toLowerCase().trim()
    filtered = filtered.filter((post) => {
      return (
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.category.toLowerCase().includes(searchTerm) ||
        (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(searchTerm)))
      )
    })
  }

  return filtered
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set(posts.map((post) => post.category))
  return Array.from(categories).sort()
}
