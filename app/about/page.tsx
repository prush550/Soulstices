"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { SoulsticesLogo } from "@/components/soulstices-logo"
import { submitAboutForm } from "./actions"
import { useState, useTransition } from "react"

export default function AboutPage() {
  const [isPending, startTransition] = useTransition()
  const [formState, setFormState] = useState<{
    success?: boolean
    message?: string
    data?: any
  } | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    happiness: "",
    expectations: "",
  })

  const randomNotes = [
    "Sometimes the best conversations happen over chai and contemplation (or coffee, if you're into that). ☕",
    "The wound is the place where the light enters you - Rumi 🌧️",
    "Life is a long preparation for something that never happens - Yeats (probably) 🚶‍♀️",
    "It is not death that a man should fear, but never beginning to live - Marcus Aurelius 💭",
    "The more you are motivated by love, the more fearless and free your action will be - Dalai Lama 🤝",
    "Loneliness is the human condition - Janet Fitch 🛤️",
    "Some of the deepest healing happens in the most ordinary moments. ✨",
    "Man is the only creature who refuses to be what he is - Albert Camus",
    "We are all in the gutter, but some of us are looking at the stars - Oscar Wilde",
    "What hurts us is what heals us - Paulo Coelho",
    "Nothing in life is to be feared, it is only to be understood - Marie Curie",
    "A man is not idle because he is absorbed in thought. There is a visible labor and there is an invisible labor - Victor Hugo",
    "You cannot protect yourself from sadness without protecting yourself from happiness - Jonathan Safran Foer",
    "The world breaks everyone and afterward many are strong at the broken places - Ernest Hemingway",
    "Existence is suffering - Buddha (paraphrase, obviously)",
    "He alone sees truly who sees the Lord the same in every creature... seeing the same Lord everywhere, he does not harm himself or others - Gita (the actual book)",
    "This moment is all there is - Thích Nhất Hạnh",
    "There is more to life than increasing its speed - Mahatma Gandhi",
    "Freedom is not worth having if it does not include the freedom to make mistakes - Mahatma Gandhi",
    "Happiness is when what you think, what you say, and what you do are in harmony - Mahatma Gandhi",
  ]

  const randomNote = randomNotes[Math.floor(Math.random() * randomNotes.length)]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // clear previous state before a new submit
    if (formState) setFormState(null)

    startTransition(async () => {
      try {
        const result = await submitAboutForm(formData)

        setFormState(result)

        if (result?.success) {
          // Reset form on success
          setFormData({
            name: "",
            email: "",
            city: "",
            happiness: "",
            expectations: "",
          })
        }
      } catch (err) {
        console.error("Submit error:", err)
        setFormState({
          success: false,
          message: "There was an error submitting your form. Please try again later.",
        })
      }
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (formState) setFormState(null)
  }

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
            <Link href="/about" className="text-teal-400 font-medium">
              About
            </Link>
            <Link href="/#contact" className="text-slate-300 hover:text-teal-400 transition-colors">
              Contact
            </Link>
            <Button className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white border-0">
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Image Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/placeholder.svg?height=800&width=1200"
            alt="Person contemplating by the window during rain"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via
