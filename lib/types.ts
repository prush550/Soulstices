export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  content: string
  status: "draft" | "published" | "scheduled"
  publishDate?: string
  featuredImage?: string
  author?: string
  tags?: string[]
}
