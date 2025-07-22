import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart, Brain, Users, ArrowRight, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { SoulsticesLogo } from "@/components/soulstices-logo"

export default function SoulsticesLanding() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <SoulsticesLogo size={32} />
            <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
              Soulstices
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#services" className="text-slate-300 hover:text-teal-400 transition-colors">
              Services
            </Link>
            <Link href="#about" className="text-slate-300 hover:text-teal-400 transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-slate-300 hover:text-teal-400 transition-colors">
              Contact
            </Link>
            <Button className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white border-0">
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Transform Your{" "}
                <span className="bg-gradient-to-r from-teal-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Inner Journey
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                A peer support community where people experiencing their own Soulstices can find connection,
                understanding, and encouragement on their journey toward mental wellness.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white border-0 px-8 py-3"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-3 bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">How We Support You</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Peer support services designed to complement your professional mental health journey
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-slate-800 border-slate-700 hover:border-teal-500/50 transition-all duration-300 group">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-100">Peer Support Groups</h3>
                <p className="text-slate-400">
                  Connect with others who understand your journey. Share experiences and find encouragement in a safe,
                  supportive environment.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700 hover:border-purple-500/50 transition-all duration-300 group">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-100">Professional Connections</h3>
                <p className="text-slate-400">
                  Get connected with licensed mental health professionals. We help bridge the gap between peer support
                  and professional care.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700 hover:border-pink-500/50 transition-all duration-300 group">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-100">Community Activities</h3>
                <p className="text-slate-400">
                  Participate in casual group activities, workshops, and events designed to foster connection and
                  personal growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">What is a Soulstice?</h2>
              <p className="text-slate-400 text-lg">Understanding the pivotal moments that shape our journey</p>
            </div>
            <div className="space-y-8">
              <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
                <p className="text-slate-300 leading-relaxed text-lg mb-6">
                  A <span className="text-teal-400 font-semibold">Soulstice</span> is like a solstice, but for the soul
                  — those pivotal moments in our lives when we reach a turning point, where darkness meets light, and
                  transformation becomes possible.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Just as the solstice marks the longest or shortest day of the year, a Soulstice represents those
                  profound moments when we pause, reflect, and find the courage to change direction. It's that space
                  between struggle and healing, between isolation and connection.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-100">Our Community</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Soulstices is a peer support community where people experiencing their own Soulstices can come
                    together, share their journeys, understand themselves better, and learn to navigate these
                    transformative moments with support and compassion.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    We are not professionally-certified mental health specialists. Instead, we're a group of people
                    dedicated to easing the pathway to mental health and well-being by bringing people together to
                    create a safe environment for sharing and growth.
                  </p>
                  <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                    <p className="text-amber-200 text-sm">
                      <strong>Important:</strong> Our services complement but do not replace professional mental health
                      care. We encourage all community members to seek professional help when needed.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full h-80 bg-gradient-to-br from-teal-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto backdrop-blur">
                        <SoulsticesLogo size={40} />
                      </div>
                      <p className="text-slate-300 font-medium">Your Soulstice journey starts here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Details Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Our Support Services</h2>
              <p className="text-slate-400 text-lg">
                Peer-led initiatives designed to support your mental wellness journey
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-100">Connect with Professionals</h3>
                  </div>
                  <p className="text-slate-400">
                    We help you find and connect with licensed mental health professionals in your area, making the
                    transition from peer support to professional care seamless.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-100">Group Activities</h3>
                  </div>
                  <p className="text-slate-400">
                    Participate in casual group activities, creative workshops, mindfulness sessions, and community
                    events that foster connection and personal growth.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-100">Safe Sharing Spaces</h3>
                  </div>
                  <p className="text-slate-400">
                    Join moderated discussion groups where you can share your experiences, listen to others, and find
                    comfort in knowing you're not alone in your journey.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-100">Resource Navigation</h3>
                  </div>
                  <p className="text-slate-400">
                    Get guidance on navigating mental health resources, understanding insurance options, and finding the
                    right type of professional support for your needs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-900/50 to-purple-900/50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Connect with Your Community?</h2>
            <p className="text-slate-300 text-lg">
              Take the first step in your Soulstice journey. Join our peer support community and find the encouragement
              you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-400"
              />
              <Button className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white border-0 whitespace-nowrap">
                Get Started
              </Button>
            </div>
            <p className="text-slate-400 text-sm">
              Join hundreds of individuals who have transformed their lives with Soulstices
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <SoulsticesLogo size={32} />
                <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
                  Soulstices
                </span>
              </div>
              <p className="text-slate-400">
                A peer support community helping people navigate their Soulstices with connection and compassion.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-200">Services</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-teal-400 transition-colors">
                    Mental Health Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal-400 transition-colors">
                    Life Coaching
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal-400 transition-colors">
                    Stress Management
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal-400 transition-colors">
                    Personal Development
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-200">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="#" className="hover:text-teal-400 transition-colors">
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
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal-400 transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-200">Contact</h4>
              <ul className="space-y-2 text-slate-400">
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>hello@soulstices.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
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
