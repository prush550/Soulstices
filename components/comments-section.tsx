"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Send } from "lucide-react"

interface Comment {
  id: string
  author: string
  content: string
  timestamp: string
}

interface CommentsSectionProps {
  postSlug: string
}

export function CommentsSection({ postSlug }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState({ author: "", content: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load comments from localStorage on component mount
  useEffect(() => {
    const savedComments = localStorage.getItem(`comments-${postSlug}`)
    if (savedComments) {
      setComments(JSON.parse(savedComments))
    }
  }, [postSlug])

  // Save comments to localStorage whenever comments change
  useEffect(() => {
    localStorage.setItem(`comments-${postSlug}`, JSON.stringify(comments))
  }, [comments, postSlug])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newComment.author.trim() || !newComment.content.trim()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const comment: Comment = {
      id: Date.now().toString(),
      author: newComment.author.trim(),
      content: newComment.content.trim(),
      timestamp: new Date().toISOString(),
    }

    setComments((prev) => [comment, ...prev])
    setNewComment({ author: "", content: "" })
    setIsSubmitting(false)
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Comments Header */}
      <div className="flex items-center space-x-2">
        <MessageCircle className="w-6 h-6 text-teal-400" />
        <h3 className="text-2xl font-bold text-slate-100">Comments ({comments.length})</h3>
      </div>

      {/* Comment Form */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100 text-lg">Leave a Comment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Your name"
                value={newComment.author}
                onChange={(e) => setNewComment((prev) => ({ ...prev, author: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <Textarea
                placeholder="Share your thoughts..."
                value={newComment.content}
                onChange={(e) => setNewComment((prev) => ({ ...prev, content: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-teal-500 focus:ring-teal-500 min-h-[100px]"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting || !newComment.author.trim() || !newComment.content.trim()}
              className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white border-0"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Post Comment
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-8 text-center">
              <MessageCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No comments yet. Be the first to share your thoughts!</p>
            </CardContent>
          </Card>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-r from-teal-500 to-purple-600 text-white">
                      {comment.author.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-slate-100">{comment.author}</h4>
                      <span className="text-sm text-slate-400">{formatDate(comment.timestamp)}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
