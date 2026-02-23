'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth, SignInButton, SignUpButton } from '@clerk/nextjs'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isSignedIn } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'} border-b border-gray-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-lg">school</span>
            </div>
            <span className="text-lg font-bold text-slate-900">
              StudyChina <span className="text-blue-600">2026</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Home</Link>
            <Link href="#about" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">About</Link>
            <Link href="/search" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Programs</Link>
            <Link href="#scholarships" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Scholarships</Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isSignedIn ? (
              <Link href="/dashboard" className="btn-primary text-sm">
                Dashboard
              </Link>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors px-4 py-2">
                    Log in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="btn-primary text-sm">
                    Register
                  </button>
                </SignUpButton>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-3 rounded-lg hover:bg-gray-100 transition-colors touch-target"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-slate-600 text-2xl">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-gray-100 animate-slide-up">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-slate-600 hover:text-blue-600 font-medium">Home</Link>
              <Link href="#about" className="text-slate-600 hover:text-blue-600 font-medium">About</Link>
              <Link href="/search" className="text-slate-600 hover:text-blue-600 font-medium">Programs</Link>
              <Link href="#scholarships" className="text-slate-600 hover:text-blue-600 font-medium">Scholarships</Link>
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                {isSignedIn ? (
                  <Link href="/dashboard" className="btn-primary text-center text-sm">
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <SignInButton mode="modal">
                      <button className="text-slate-600 hover:text-blue-600 font-medium py-2">
                        Log in
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="btn-primary text-sm">
                        Register
                      </button>
                    </SignUpButton>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
