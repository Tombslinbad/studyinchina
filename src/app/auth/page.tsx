'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Image from 'next/image'

// Dynamically import Clerk components with SSR disabled
const AuthForm = dynamic(() => import('./AuthForm'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
      </div>
    </div>
  )
})

const features = [
  {
    icon: 'school',
    title: 'Access Top Universities',
    description: 'Apply to Tsinghua, Peking, Fudan and 100+ other prestigious institutions',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    icon: 'payments',
    title: 'Scholarship Matching',
    description: 'Get matched with CSC and university scholarships automatically',
    color: 'from-green-500 to-emerald-400'
  },
  {
    icon: 'tracking',
    title: 'Track Applications',
    description: 'Monitor your application status, visa progress, and admission results',
    color: 'from-purple-500 to-pink-400'
  },
  {
    icon: 'support_agent',
    title: 'Expert Support',
    description: 'Get guidance from education consultants throughout your journey',
    color: 'from-orange-500 to-amber-400'
  }
]

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary/5">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
                <span className="material-symbols-outlined text-white text-xl">school</span>
              </div>
              <span className="text-xl font-display font-bold hidden sm:block">
                StudyChina <span className="text-primary">2026</span>
              </span>
            </Link>
            <Link 
              href="/" 
              className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors px-4 py-2 rounded-xl hover:bg-slate-100"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Side - Info (Hidden on mobile, shown on lg+) */}
          <div className="hidden lg:block lg:sticky lg:top-28">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-3xl blur-2xl opacity-60"></div>
              
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-white/50">
                {/* Header */}
                <div className="mb-8">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                    Join 10,000+ Students
                  </span>
                  <h2 className="text-4xl font-display font-bold text-slate-900 leading-tight">
                    Your Gateway to{' '}
                    <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      China&apos;s Universities
                    </span>
                  </h2>
                  <p className="mt-4 text-lg text-slate-600">
                    Start your journey to world-class education in China&apos;s innovation hubs.
                  </p>
                </div>

                {/* Features Grid */}
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div 
                      key={feature.title}
                      className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all duration-300 group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="material-symbols-outlined text-white">{feature.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">100+</div>
                    <div className="text-xs text-slate-500">Universities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">50K+</div>
                    <div className="text-xs text-slate-500">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">95%</div>
                    <div className="text-xs text-slate-500">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="w-full max-w-md mx-auto lg:max-w-none">
            {/* Mobile Header (shown only on small screens) */}
            <div className="lg:hidden text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
                Welcome to <span className="text-primary">StudyChina</span>
              </h2>
              <p className="mt-2 text-slate-600">
                Your gateway to China&apos;s top universities
              </p>
            </div>

            <AuthForm isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-auto py-8 text-center text-sm text-slate-500">
        <p>© 2026 Modern China Study Abroad. All rights reserved.</p>
      </footer>
    </div>
  )
}
