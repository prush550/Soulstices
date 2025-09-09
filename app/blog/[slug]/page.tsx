import { getPostBySlug, getAllPosts } from "@/lib/mdx"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { SoulsticesLogo } from "@/components/soulstices-logo"
import { BlogSidebar } from "@/components/blog-sidebar"
import { CommentsSection } from "@/components/comments-section"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Await the params Promise to get the actual parameters
  const resolvedParams = await params
  const { slug } = resolvedParams

  // Validate slug
  if (!slug || typeof slug !== 'string') {
    notFound()
  }

  const post = getPostBySlug(slug)
  const allPosts = getAllPosts()

  if (!post) {
    notFound()
  }

  // Only show published posts
  if (post.status !== 'published') {
    notFound()
  }

  // Check if post should be published yet (for scheduled posts)
  const now = new Date()
  const postDate = new Date(post.date)
  
  if (postDate > now) {
    notFound()
  }

  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug && p.status === 'published')
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <SoulsticesLogo size={32} />
            <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
              Soulstices
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#services" className="text-slate-300 hover:text-teal-400 transition-colors">
              Services
            </Link>
            <Link href="/about" className="text-slate-300 hover:text-teal-400 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-slate-300 hover:text-teal-400 transition-colors">
              Contact
            </Link>
            <Link href="/blog" className="text-teal-400 font-medium">
              Blog
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <article className="flex-1">
            {/* Back to Blog */}
            <Link
              href="/blog"
              className="inline-flex items-center text-slate-400 hover:text-teal-400 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            {/* Post Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <Badge className="bg-gradient-to-r from-teal-500 to-purple-600 text-white border-0">
                  {post.category}
                </Badge>
                <div className="flex items-center space-x-4 text-sm text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{post.author || "Soulstices Team"}</span>
                  </div>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                {post.title}
              </h1>

              <p className="text-xl text-slate-400 leading-relaxed mb-8">{post.excerpt}</p>

              {/* Featured Image */}
              <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
                <Image
                  src={post.featuredImage || `/placeholder.png?height=400&width=800&text=${encodeURIComponent(post.title)}`}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Post Content */}
            <div className="prose prose-invert prose-slate max-w-none mb-12">
              <div className="text-slate-300 leading-relaxed space-y-6">
                {post.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-3 text-slate-300">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-slate-400 border-slate-600">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6 text-slate-100">Related Posts</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Card
                      key={relatedPost.slug}
                      className="bg-slate-800 border-slate-700 hover:border-teal-500/50 transition-all duration-300 group"
                    >
                      <div className="relative h-32 overflow-hidden">
                        <Image
                          src={relatedPost.featuredImage || `/placeholder_image.png?height=200&width=300&text=${encodeURIComponent(relatedPost.title)}`}
                          alt={relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <Badge className="mb-2 text-xs bg-slate-700 text-slate-300">{relatedPost.category}</Badge>
                        <h4 className="font-semibold text-slate-100 group-hover:text-teal-400 transition-colors mb-2 line-clamp-2">
                          <Link href={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                        </h4>
                        <p className="text-sm text-slate-400 line-clamp-2">{relatedPost.excerpt}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section */}
            <CommentsSection postSlug={post.slug} />
          </article>

          {/* Sidebar */}
          <div className="lg:w-80">
            <BlogSidebar posts={allPosts} />
          </div>
        </div>
      </div>
    </div>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const { slug } = resolvedParams
  
  const post = getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }
  
  return {
    title: `${post.title} | Soulstices Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'Soulstices Team'],
      tags: post.tags,
    },
  }
}

// Generate static params for build optimization
export async function generateStaticParams() {
  const posts = getAllPosts('published')
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
