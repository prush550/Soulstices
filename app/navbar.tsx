// app/components/navbar.tsx
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // ✅ corrected import
import { SoulsticesLogo } from "@/components/soulstices-logo;
import { Button } from "./ui/button";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <header className="border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60">
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <SoulsticesLogo size={32} />
          <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
            Soulstices
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/services"
            className="text-slate-300 hover:text-teal-400 transition-colors"
          >
            Services
          </Link>
          <Link
            href="/about"
            className="text-slate-300 hover:text-teal-400 transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-slate-300 hover:text-teal-400 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/blog"
            className="text-slate-300 hover:text-teal-400 transition-colors"
          >
            Blog
          </Link>

          {!session?.user ? (
            <>
              <Link
                href="/signup"
                className="text-slate-300 hover:text-teal-400 transition-colors"
              >
                Signup
              </Link>
              <Link
                href="/login"
                className="text-slate-300 hover:text-teal-400 transition-colors"
              >
                Login
              </Link>
              <Button className="bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white border-0">
                Get Started
              </Button>
            </>
          ) : (
            <Link
              href="/profile"
              className="text-slate-300 hover:text-teal-400 transition-colors"
            >
              {session.user.name || session.user.email}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
