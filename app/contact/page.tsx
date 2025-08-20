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
import { submitAboutForm } from "./action"
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
            <Link href="/contact" className="text-slate-300 hover:text-teal-400 transition-colors">
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
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>
        <div className="relative z-10 h-full flex items-end">
          <div className="container mx-auto px-4 lg:px-6 pb-16">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Sometimes the best ideas come during{" "}
                <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                  quiet moments
                </span>
              </h1>
              <p className="text-xl text-slate-300">
                Like watching the rain while sipping chai, wondering how we can make a difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-purple-50 to-white">
      {/* Company Name */}
          <h1 className="text-4xl font-bold text-purple-700 mb-4 text-center">
            Soulstices
          </h1>

      {/* Contact Info */}
          <div className="text-center mb-6">
            <p className="text-lg text-gray-700">
              📧 Email: <a href="mailto:mail.soulstices@gmail.com" className="text-purple-600">mail.soulstices@gmail.com</a>
            </p>
            <p className="text-lg text-gray-700">
              📞 Contact: <a href="tel:+91-8619987836" className="text-purple-600">+91-8619987836</a>
            </p>
          </div>
        </section>
      
      {/* Tell Us About Yourself Form */}
      <section className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Tell Us About Yourself</h2>
              <p className="text-slate-400 text-lg">We'd love to know who you are and what brings you here</p>
            </div>

            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-8">
                {formState && (
                  <Alert
                    className={`mb-6 ${
                      formState.success ? "border-green-500 bg-green-500/10" : "border-red-500 bg-red-500/10"
                    }`}
                  >
                    {formState.success ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                    <AlertDescription className={formState.success ? "text-green-200" : "text-red-200"}>
                      {formState.message}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-200">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="What should we call you?"
                        className="bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-200">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@email.com"
                        className="bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-slate-200">
                        City
                      </Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="Which city are you from?"
                        className="bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="happiness" className="text-slate-200">
                        Are You Happy?
                      </Label>
                      <Select value={formData.happiness} onValueChange={(value) => handleInputChange("happiness", value)}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                          <SelectValue placeholder="Honestly..." />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          <SelectItem value="very-happy" className="text-slate-100">
                            Very happy! 😊
                          </SelectItem>
                          <SelectItem value="mostly-happy" className="text-slate-100">
                            Mostly happy 🙂
                          </SelectItem>
                          <SelectItem value="neutral" className="text-slate-100">
                            It's complicated 😐
                          </SelectItem>
                          <SelectItem value="struggling" className="text-slate-100">
                            Struggling a bit 😔
                          </SelectItem>
                          <SelectItem value="not-happy" className="text-slate-100">
                            Not really 😞
                          </SelectItem>
                          <SelectItem value="prefer-not-say" className="text-slate-100">
                            I'd rather not say
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expectations" className="text-slate-200">
                      What are your expectations from us?
                    </Label>
                    <Textarea
                      id="expectations"
                      value={formData.expectations}
                      onChange={(e) => handleInputChange("expectations", e.target.value)}
                      placeholder="Tell us what you're hoping to find here, what you need, or what you'd like to see..."
                      className="bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400 min-h-[120px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white border-0 py-3 disabled:opacity-50"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sharing Your Story...
                      </>
                    ) : (
                      "Share Your Story"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Random Note Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gradient-to-r from-teal-900/30 to-purple-900/30 rounded-2xl p-8 border border-slate-700">
              <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed">{randomNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <SoulsticesLogo size={32} />
                <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                  Soulstices
                </span>
              </Link>
              <p className="text-slate-400">
                A peer support community helping people navigate their Soulstices with connection and compassion.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-200">Services</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/#services" className="hover:text-teal-400 transition-colors">
                    Peer Support Groups
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="hover:text-teal-400 transition-colors">
                    Professional Connections
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="hover:text-teal-400 transition-colors">
                    Community Activities
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="hover:text-teal-400 transition-colors">
                    Resource Navigation
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-200">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/about" className="hover:text-teal-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal-400 transition-colors">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal-400 transition-colors">
                    Community Stories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal-400 transition-colors">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-200">Contact</h4>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-center space-x-2">
                  <span>mail.soulstices@gmail.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span>+91-8619987836</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} Soulstices. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
