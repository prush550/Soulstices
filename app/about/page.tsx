import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { SoulsticesLogo } from "@/components/soulstices-logo"

export default function AboutPage() {
  const randomNotes = [
    "Sometimes the best conversations happen over chai and contemplation. ☕",
    "Life is like monsoon rain - unpredictable, necessary, and beautiful in its own way. 🌧️",
    "We're all just walking each other home, one story at a time. 🚶‍♀️",
    "The best therapy sometimes comes from strangers who become friends. 💭",
    "In a world of algorithms, we choose authentic conversations. 🤝",
    "Mental health is not a destination, it's a journey with good company. 🛤️",
    "Some of the deepest healing happens in the most ordinary moments. ✨",
    "We're not fixing anyone - we're just creating space for growth. 🌱",
  ]

  const randomNote = randomNotes[Math.floor(Math.random() * randomNotes.length)]

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
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Why We Exist</h2>
                <p className="text-slate-400 text-lg">The story of three friends with different dreams</p>
              </div>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-8 md:p-12">
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-slate-300 leading-relaxed text-lg mb-6">
                      We are a group of mutual friends who, despite sharing different goals and being driven in separate
                      directions, decided to work on our skills through a joint medium during our individual journeys.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 my-12">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-2xl">🚀</span>
                        </div>
                        <h3 className="text-xl font-semibold text-teal-400">The Entrepreneur</h3>
                        <p className="text-slate-400 text-sm">
                          Dreaming of building something meaningful that could impact lives and create lasting change.
                        </p>
                      </div>

                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-2xl">✊</span>
                        </div>
                        <h3 className="text-xl font-semibold text-purple-400">The Social Activist</h3>
                        <p className="text-slate-400 text-sm">
                          Passionate about social justice and creating platforms for voices that need to be heard.
                        </p>
                      </div>

                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-2xl">💻</span>
                        </div>
                        <h3 className="text-xl font-semibold text-pink-400">The Technologist</h3>
                        <p className="text-slate-400 text-sm">
                          Eager to experiment with technical skills and explore how technology can serve humanity.
                        </p>
                      </div>
                    </div>

                    <p className="text-slate-300 leading-relaxed text-lg mb-6">
                      What started as casual conversations over coffee about our individual aspirations slowly evolved
                      into something bigger. We realized that our diverse perspectives and skills could complement each
                      other in ways we hadn't imagined.
                    </p>

                    <p className="text-slate-300 leading-relaxed text-lg">
                      Soulstices became our joint medium - a space where entrepreneurial vision meets social
                      consciousness and technical innovation. It's where we learned that sometimes the most meaningful
                      projects emerge not from individual brilliance, but from the beautiful intersection of different
                      dreams working toward a common purpose.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
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
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-200">
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="What should we call you?"
                        className="bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-200">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400"
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
                        placeholder="Which city are you from?"
                        className="bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="happiness" className="text-slate-200">
                        Are You Happy?
                      </Label>
                      <Select>
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
                      placeholder="Tell us what you're hoping to find here, what you need, or what you'd like to see..."
                      className="bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400 min-h-[120px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white border-0 py-3"
                  >
                    Share Your Story
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
                  <span>Coming Soon...</span>
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
