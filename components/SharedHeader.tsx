"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SoulsticesLogo } from "@/components/soulstices-logo";
import AdminButton from "@/components/AdminButton";

interface SharedHeaderProps {
  variant?: "default" | "blog";
}

export default function SharedHeader({ variant = "default" }: SharedHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isCurrentPage = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const getLinkClass = (path: string) => {
    const baseClass = variant === "blog" 
      ? "text-gray-600 hover:text-gray-900 transition-colors font-medium"
      : "text-slate-300 hover:text-teal-400 transition-colors font-medium";
    
    const activeClass = variant === "blog"
      ? "text-blue-600 font-medium border-b-2 border-blue-600"
      : "text-teal-400 font-medium";

    return isCurrentPage(path) ? activeClass : baseClass;
  };

  const getMobileLinkClass = (path: string) => {
    const baseClass = variant === "blog"
      ? "block text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
      : "block text-slate-300 hover:text-teal-400 transition-colors font-medium py-2";
    
    const activeClass = variant === "blog"
      ? "block text-blue-600 font-medium py-2 border-l-4 border-blue-600 pl-3 bg-blue-50"
      : "block text-teal-400 font-medium py-2 border-l-4 border-teal-400 pl-3 bg-teal-900/20";

    return isCurrentPage(path) ? activeClass : baseClass;
  };

  const headerBgClass = variant === "blog"
    ? "bg-white shadow-sm border-b"
    : "border-b border-slate-800 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60";

  const logoTextClass = variant === "blog"
    ? "text-xl font-bold text-gray-900"
    : "text-xl font-bold bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent";

  const mobileMenuBgClass = variant === "blog"
    ? "bg-white border-t border-gray-200"
    : "bg-slate-800 border-t border-slate-700";

  const mobileMenuButtonClass = variant === "blog"
    ? "p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
    : "p-2 rounded-md text-slate-300 hover:text-teal-400 hover:bg-slate-800";

  const getStartedButtonClass = variant === "blog"
    ? "bg-blue-600 hover:bg-blue-700 text-white"
    : "bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white border-0";

  return (
    <header className={`sticky top-0 z-50 ${headerBgClass}`}>
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <SoulsticesLogo size={32} />
          <span className={logoTextClass}>Soulstices</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/services" className={getLinkClass("/services")}>
            Services
          </Link>
          <Link href="/about" className={getLinkClass("/about")}>
            About
          </Link>
          <Link href="/contact" className={getLinkClass("/contact")}>
            Contact
          </Link>
          <Link href="/blog" className={getLinkClass("/blog")}>
            Blog
          </Link>
          
          {/* User Actions */}
          {status === "loading" ? (
            <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
          ) : session ? (
            <div className="flex items-center space-x-4">
              <Link href="/profile" className={getLinkClass("/profile")}>
                Profile
              </Link>
              <AdminButton />
              <Button 
                onClick={() => signOut()} 
                variant="outline" 
                size="sm"
                className={variant === "blog" ? "border-gray-300" : "border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline" size="sm" className={variant === "blog" ? "border-gray-300" : "border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"}>
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className={getStartedButtonClass}>
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${mobileMenuButtonClass}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className={`md:hidden ${mobileMenuBgClass}`}>
          <nav className="px-4 py-4 space-y-3">
            <Link 
              href="/services" 
              className={getMobileLinkClass("/services")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="/about" 
              className={getMobileLinkClass("/about")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={getMobileLinkClass("/contact")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/blog" 
              className={getMobileLinkClass("/blog")}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            
            {/* Mobile User Actions */}
            <div className={`pt-4 ${variant === "blog" ? "border-t border-gray-200" : "border-t border-slate-700"}`}>
              {status === "loading" ? (
                <div className="w-full h-8 bg-gray-200 animate-pulse rounded"></div>
              ) : session ? (
                <div className="space-y-3">
                  <Link 
                    href="/profile" 
                    className={getMobileLinkClass("/profile")}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <div className="py-2">
                    <AdminButton />
                  </div>
                  <Button 
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }} 
                    variant="outline" 
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className={`w-full ${getStartedButtonClass}`}>
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}