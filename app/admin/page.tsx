"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { SoulsticesLogo } from "@/components/soulstices-logo"
import { FileText, Tag, Type, Upload, ImageIcon, Calendar, Code, Eye, Save } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    content: "",
    status: "draft" as "draft" | "published" | "scheduled",
    publishDate: "",
    featuredImage: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [showMediaPanel, setShowMediaPanel] = useState(false)
  const [showEmbedPanel, setShowEmbedPanel] = useState(false)
  const [embedCode, setEmbedCode] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const categories = [
    "Mental Health",
    "Community Support",
    "Wellness",
    "Personal Growth",
    "Resources",
    "Stories",
    "General",
  ]

  const handleSubmit = async (e: React.FormEvent, saveAs: "draft" | "published" | "scheduled" = formData.status) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const submitData = {
        ...formData,
        status: saveAs,
        date: new Date().toISOString(),
        publishDate: saveAs === "scheduled" ? formData.publishDate : new Date().toISOString(),
      }

      const response = await fetch("/api/admin/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })

      if (response.ok) {
        const result = await response.json()
        setMessage({
          type: "success",
          text: `Blog post ${saveAs === "draft" ? "saved as draft" : saveAs === "scheduled" ? "scheduled" : "published"} successfully!`,
        })
        setFormData({
          title: "",
          excerpt: "",
          category: "",
          content: "",
          status: "draft",
          publishDate: "",
          featuredImage: "",
        })
      } else {
        const error = await response.text()
        setMessage({ type: "error", text: `Error: ${error}` })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to save blog post. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("image", file)

    try {
      const response = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        setUploadedImages((prev) => [...prev, result.url])
        setMessage({ type: "success", text: "Image uploaded successfully!" })
      } else {
        setMessage({ type: "error", text: "Failed to upload image" })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error uploading image" })
    }
  }

  const insertImageIntoContent = (imageUrl: string) => {
    const imageMarkdown = `\n![Image](${imageUrl})\n`
    setFormData((prev) => ({
      ...prev,
      content: prev.content + imageMarkdown,
    }))
    setShowMediaPanel(false)
  }

  const insertEmbedCode = () => {
    if (!embedCode.trim()) return

    const embedMarkdown = `\n<div className="embed-container">\n${embedCode}\n</div>\n`
    setFormData((prev) => ({
      ...prev,
      content: prev.content + embedMarkdown,
    }))
    setEmbedCode("")
    setShowEmbedPanel(false)
  }

  const insertMediaTemplate = (type: string) => {
    let template = ""
    switch (type) {
      case "youtube":
        template = `\n<div className="video-container">\n<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameBorder="0" allowFullScreen></iframe>\n</div>\n`
        break
      case "codepen":
        template = `\n<div className="codepen-container">\n<iframe height="300" style={{width: "100%"}} scrolling="no" title="CodePen Embed" src="https://codepen.io/USERNAME/embed/PEN_ID?default-tab=result" frameBorder="no" loading="lazy"></iframe>\n</div>\n`
        break
      case "chart":
        template = `\n<div className="chart-container">\n{/* Add your chart component here */}\n</div>\n`
        break
      default:
        return
    }

    setFormData((prev) => ({
      ...prev,
      content: prev.content + template,
    }))
    setShowEmbedPanel(false)
  }

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
            <Link href="/admin/manage" className="text-slate-300 hover:text-teal-400 transition-colors">
              Manage Posts
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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                Create New Blog Post
              </span>
            </h1>
            <p className="text-slate-400">Write, schedule, and publish your blog posts</p>
          </div>

          {message && (
            <Alert className={`mb-6 ${message.type === "success" ? "border-green-500" : "border-red-500"}`}>
              <AlertDescription className={message.type === "success" ? "text-green-400" : "text-red-400"}>
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-slate-100">
                    <FileText className="w-5 h-5" />
                    <span>Blog Post Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title" className="flex items-center space-x-2 text-slate-200">
                        <Type className="w-4 h-4" />
                        <span>Title</span>
                      </Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        placeholder="Enter blog post title"
                        required
                        className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400"
                      />
                    </div>

                    {/* Category and Status */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category" className="flex items-center space-x-2 text-slate-200">
                          <Tag className="w-4 h-4" />
                          <span>Category</span>
                        </Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleInputChange("category", value)}
                        >
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            {categories.map((category) => (
                              <SelectItem key={category} value={category} className="text-slate-100">
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status" className="flex items-center space-x-2 text-slate-200">
                          <FileText className="w-4 h-4" />
                          <span>Status</span>
                        </Label>
                        <Select
                          value={formData.status}
                          onValueChange={(value: "draft" | "published" | "scheduled") =>
                            handleInputChange("status", value)
                          }
                        >
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            <SelectItem value="draft" className="text-slate-100">
                              Draft
                            </SelectItem>
                            <SelectItem value="published" className="text-slate-100">
                              Published
                            </SelectItem>
                            <SelectItem value="scheduled" className="text-slate-100">
                              Scheduled
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Scheduled Date */}
                    {formData.status === "scheduled" && (
                      <div className="space-y-2">
                        <Label htmlFor="publishDate" className="flex items-center space-x-2 text-slate-200">
                          <Calendar className="w-4 h-4" />
                          <span>Publish Date & Time</span>
                        </Label>
                        <Input
                          id="publishDate"
                          type="datetime-local"
                          value={formData.publishDate}
                          onChange={(e) => handleInputChange("publishDate", e.target.value)}
                          required={formData.status === "scheduled"}
                          className="bg-slate-700 border-slate-600 text-slate-100"
                        />
                      </div>
                    )}

                    {/* Featured Image */}
                    <div className="space-y-2">
                      <Label htmlFor="featuredImage" className="flex items-center space-x-2 text-slate-200">
                        <ImageIcon className="w-4 h-4" />
                        <span>Featured Image URL</span>
                      </Label>
                      <Input
                        id="featuredImage"
                        value={formData.featuredImage}
                        onChange={(e) => handleInputChange("featuredImage", e.target.value)}
                        placeholder="Enter image URL or upload an image"
                        className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400"
                      />
                      {formData.featuredImage && (
                        <div className="relative h-32 w-full rounded-lg overflow-hidden">
                          <Image
                            src={formData.featuredImage || "/placeholder.svg"}
                            alt="Featured image preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-2">
                      <Label htmlFor="excerpt" className="flex items-center space-x-2 text-slate-200">
                        <FileText className="w-4 h-4" />
                        <span>Excerpt</span>
                      </Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => handleInputChange("excerpt", e.target.value)}
                        placeholder="Brief description of the blog post (will appear in listings)"
                        required
                        rows={3}
                        className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400"
                      />
                    </div>

                    {/* Content Editor Toolbar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="content" className="flex items-center space-x-2 text-slate-200">
                          <FileText className="w-4 h-4" />
                          <span>Content</span>
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => setShowMediaPanel(!showMediaPanel)}
                            className="border-slate-600 text-slate-300 hover:bg-slate-700"
                          >
                            <ImageIcon className="w-4 h-4 mr-1" />
                            Media
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => setShowEmbedPanel(!showEmbedPanel)}
                            className="border-slate-600 text-slate-300 hover:bg-slate-700"
                          >
                            <Code className="w-4 h-4 mr-1" />
                            Embed
                          </Button>
                        </div>
                      </div>

                      {/* Media Panel */}
                      {showMediaPanel && (
                        <Card className="bg-slate-700 border-slate-600">
                          <CardContent className="p-4">
                            <div className="space-y-4">
                              <div>
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                  className="hidden"
                                />
                                <Button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="w-full bg-teal-600 hover:bg-teal-700"
                                >
                                  <Upload className="w-4 h-4 mr-2" />
                                  Upload Image
                                </Button>
                              </div>

                              {uploadedImages.length > 0 && (
                                <div>
                                  <p className="text-sm text-slate-300 mb-2">Recent uploads:</p>
                                  <div className="grid grid-cols-3 gap-2">
                                    {uploadedImages.map((url, index) => (
                                      <div
                                        key={index}
                                        className="relative h-16 cursor-pointer rounded overflow-hidden hover:opacity-75"
                                        onClick={() => insertImageIntoContent(url)}
                                      >
                                        <Image
                                          src={url || "/placeholder.svg"}
                                          alt={`Upload ${index}`}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Embed Panel */}
                      {showEmbedPanel && (
                        <Card className="bg-slate-700 border-slate-600">
                          <CardContent className="p-4">
                            <div className="space-y-4">
                              <div className="grid grid-cols-3 gap-2">
                                <Button
                                  type="button"
                                  size="sm"
                                  onClick={() => insertMediaTemplate("youtube")}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  YouTube
                                </Button>
                                <Button
                                  type="button"
                                  size="sm"
                                  onClick={() => insertMediaTemplate("codepen")}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  CodePen
                                </Button>
                                <Button
                                  type="button"
                                  size="sm"
                                  onClick={() => insertMediaTemplate("chart")}
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  Chart
                                </Button>
                              </div>

                              <div className="space-y-2">
                                <Label className="text-slate-300">Custom Embed Code:</Label>
                                <Textarea
                                  value={embedCode}
                                  onChange={(e) => setEmbedCode(e.target.value)}
                                  placeholder="Paste your embed code here (iframe, script, etc.)"
                                  rows={4}
                                  className="bg-slate-800 border-slate-600 text-slate-100 font-mono text-sm"
                                />
                                <Button
                                  type="button"
                                  size="sm"
                                  onClick={insertEmbedCode}
                                  disabled={!embedCode.trim()}
                                  className="bg-purple-600 hover:bg-purple-700"
                                >
                                  Insert Embed
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => handleInputChange("content", e.target.value)}
                        placeholder="Write your blog post content here. You can use Markdown formatting and embed media."
                        required
                        rows={20}
                        className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 font-mono text-sm"
                      />
                      <p className="text-sm text-slate-400">
                        Supports Markdown formatting, HTML embeds, and media components.
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <Button
                        type="button"
                        onClick={(e) => handleSubmit(e, "draft")}
                        disabled={isSubmitting}
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Draft
                      </Button>

                      {formData.status === "scheduled" && (
                        <Button
                          type="button"
                          onClick={(e) => handleSubmit(e, "scheduled")}
                          disabled={isSubmitting || !formData.publishDate}
                          className="bg-orange-600 hover:bg-orange-700"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Post
                        </Button>
                      )}

                      <Button
                        type="button"
                        onClick={(e) => handleSubmit(e, "published")}
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white"
                      >
                        {isSubmitting ? "Publishing..." : "Publish Now"}
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          setFormData({
                            title: "",
                            excerpt: "",
                            category: "",
                            content: "",
                            status: "draft",
                            publishDate: "",
                            featuredImage: "",
                          })
                        }
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        Clear Form
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Preview Panel */}
            <div className="lg:col-span-1">
              <Card className="bg-slate-800 border-slate-700 sticky top-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-slate-100">
                    <Eye className="w-5 h-5" />
                    <span>Preview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {formData.title ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-gradient-to-r from-teal-500 to-purple-600 text-white">
                          {formData.category || "Category"}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`border-slate-600 ${
                            formData.status === "published"
                              ? "text-green-400"
                              : formData.status === "scheduled"
                                ? "text-orange-400"
                                : "text-slate-400"
                          }`}
                        >
                          {formData.status}
                        </Badge>
                      </div>

                      {formData.featuredImage && (
                        <div className="relative h-32 rounded-lg overflow-hidden">
                          <Image
                            src={formData.featuredImage || "/placeholder.svg"}
                            alt="Featured image"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      <h2 className="text-xl font-bold text-slate-100 line-clamp-3">{formData.title}</h2>

                      {formData.excerpt && <p className="text-slate-300 text-sm line-clamp-4">{formData.excerpt}</p>}

                      <div className="text-xs text-slate-400">
                        {formData.status === "scheduled" && formData.publishDate ? (
                          <span>Scheduled for: {new Date(formData.publishDate).toLocaleString()}</span>
                        ) : (
                          <span>Created: {new Date().toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-400 text-center py-8">Start writing to see preview</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
