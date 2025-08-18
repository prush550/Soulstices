import Link from "next/link"
import SoulsticesLogo from "@/components/SoulsticesLogo"
import Button from "@/components/Button"

const AboutPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault()
    // Handle form submission logic here
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
      {/* Rest of the component continues... */}
    </div>
  )
}

export default AboutPage
