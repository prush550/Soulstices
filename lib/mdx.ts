import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { BlogPost } from "./types"

const postsDirectory = path.join(process.cwd(), "content/blog")

export function getAllPosts(status?: "published" | "draft" | "scheduled"): BlogPost[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter((name) => name.endsWith(".mdx"))
      .map((name) => {
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
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    if (status) {
      return allPostsData.filter((post) => post.status === status)
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
  try {
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
