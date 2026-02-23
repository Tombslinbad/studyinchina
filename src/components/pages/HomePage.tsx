'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut } from '@clerk/nextjs'

// Industry Hub Data
const industryHubs = [
  {
    id: 1,
    title: 'Web Dev & AI',
    icon: 'code',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    id: 2,
    title: 'Information Security',
    icon: 'security',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    id: 3,
    title: 'Smart Cities',
    icon: 'location_city',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    id: 4,
    title: 'Industry Tech',
    icon: 'precision_manufacturing',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    id: 5,
    title: 'Bio-Tech',
    icon: 'biotech',
    color: 'bg-rose-50 text-rose-600',
  },
]

// Top Universities Data
const topUniversities = [
  {
    id: 1,
    name: 'Tsinghua University',
    location: 'Beijing',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
    rating: 4.9,
    programs: 'Computer Science, AI, Engineering',
    students: '50,000+',
  },
  {
    id: 2,
    name: 'Zhejiang University',
    location: 'Hangzhou',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
    rating: 4.8,
    programs: 'Business, Technology, Innovation',
    students: '45,000+',
  },
  {
    id: 3,
    name: 'Fudan University',
    location: 'Shanghai',
    image: 'https://images.unsplash.com/photo-1592280771883-1cfae86b4321?w=800&q=80',
    rating: 4.8,
    programs: 'Medicine, Economics, Law',
    students: '40,000+',
  },
]

// Avatar images for CSC section
const avatars = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedHub, setSelectedHub] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-slate-600">Applications Open for 2026 Intake</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-responsive-hero font-bold text-slate-900 leading-tight mb-6">
              Study in the <span className="text-gradient">Silicon Valley</span>
              <br />
              of the <span className="text-blue-600">East</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Recognized China STEM Universities with AI & Innovation Programs.
              <br className="hidden md:block" />
              World-class education at affordable tuition.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-8">
              <div className="flex-1 relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search programs, universities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-gray-200 shadow-lg shadow-gray-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <Link
                href={`/search?q=${encodeURIComponent(searchQuery)}`}
                className="btn-primary py-4 px-8 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Browse Programs</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>

            {/* Auth CTA */}
            <SignedOut>
              <p className="text-sm text-slate-500">
                New student?{' '}
                <Link href="/auth" className="text-blue-600 font-semibold hover:underline">
                  Create an account
                </Link>{' '}
                to track your applications
              </p>
            </SignedOut>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-emerald-400/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Explore by Industry Hub */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="section-title">Explore by Industry Hub</h2>
            <Link href="/search" className="text-blue-600 font-semibold hover:underline flex items-center gap-1">
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {industryHubs.map((hub, index) => (
              <div
                key={hub.id}
                onClick={() => setSelectedHub(hub.id)}
                className={`card-hub text-center transition-all duration-300 ${
                  selectedHub === hub.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
                } animate-fade-in-up stagger-${index + 1}`}
                style={{ opacity: 0, animationFillMode: 'forwards' }}
              >
                <div className={`w-12 h-12 ${hub.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <span className="material-symbols-outlined text-2xl">{hub.icon}</span>
                </div>
                <h3 className="font-semibold text-slate-900 text-sm">{hub.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CSC Scholarship & AI Assistant Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* CSC Scholarship Card */}
            <div className="lg:col-span-2 blue-card-gradient rounded-2xl p-8 md:p-10 text-white relative overflow-hidden animate-fade-in-up">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Can you win the<br />
                  CSC Scholarship 2026?
                </h2>
                <p className="text-blue-100 mb-6 max-w-md leading-relaxed">
                  Get an eligibility check in 2 minutes. Our AI analyzes your academic profile against past winners.
                </p>

                {/* Avatars */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex -space-x-3">
                    {avatars.map((avatar, index) => (
                      <div
                        key={index}
                        className="w-10 h-10 rounded-full border-2 border-white overflow-hidden animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <Image
                          src={avatar}
                          alt={`Student ${index + 1}`}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">2,500+</span>
                    <span className="text-blue-200"> students checked</span>
                  </div>
                </div>

                <Link
                  href="#"
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg"
                >
                  <span>View Programs</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* AI Application Assistant */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 animate-fade-in-up stagger-2" style={{ opacity: 0, animationFillMode: 'forwards' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 animate-float">
                <span className="material-symbols-outlined text-3xl">smart_toy</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                AI Application Assistant
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Get personalized guidance on your application. Our AI helps you craft the perfect statement of purpose.
              </p>
              <button className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all">
                Sign up for Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Top-Ranked Programs */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <h2 className="section-title mb-2">Top-Ranked Programs</h2>
              <p className="text-slate-600">Discover world-class universities in China</p>
            </div>
            <div className="flex gap-3">
              <button className="btn-primary">All Courses</button>
              <button className="btn-secondary">Universities</button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topUniversities.map((university, index) => (
              <div
                key={university.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover-lift transition-all duration-300 animate-fade-in-up"
                style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={university.image}
                    alt={university.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                    <span className="font-semibold text-sm">{university.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                    <span className="material-symbols-outlined text-base">location_on</span>
                    <span>{university.location}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{university.name}</h3>
                  <p className="text-slate-600 text-sm mb-4">{university.programs}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <span className="material-symbols-outlined text-base">people</span>
                      <span>{university.students}</span>
                    </div>
                    <Link
                      href={`/search?university=${encodeURIComponent(university.name)}`}
                      className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-lg">school</span>
                </div>
                <span className="text-lg font-bold text-slate-900">
                  StudyChina <span className="text-blue-600">2026</span>
                </span>
              </Link>
              <p className="text-slate-600 text-sm leading-relaxed">
                Connecting global talent with China&apos;s innovation economy through world-class education.
              </p>
            </div>

            {/* Partners */}
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Partners</h4>
              <ul className="space-y-3 text-sm">
                <li><span className="text-slate-600">CSC Scholarship</span></li>
                <li><span className="text-slate-600">MOE China</span></li>
                <li><span className="text-slate-600">Study in China</span></li>
                <li><span className="text-slate-600">CUCAS</span></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Application Guide</Link></li>
                <li><Link href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Scholarship Tips</Link></li>
                <li><Link href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Visa Process</Link></li>
                <li><Link href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Student Stories</Link></li>
              </ul>
            </div>

            {/* Contact & Key Dates */}
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Contact</h4>
              <ul className="space-y-3 text-sm mb-6">
                <li className="flex items-center gap-2 text-slate-600">
                  <span className="material-symbols-outlined text-base">email</span>
                  info@studychina2026.com
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <span className="material-symbols-outlined text-base">phone</span>
                  +86 10 1234 5678
                </li>
              </ul>

              <h4 className="font-bold text-slate-900 mb-3">Key Dates</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Application Opens</span>
                  <span className="font-semibold text-slate-900">Dec 1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Deadline</span>
                  <span className="font-semibold text-slate-900">Mar 31</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Results</span>
                  <span className="font-semibold text-slate-900">Jun 15</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2026 StudyChina 2026. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-slate-500 hover:text-slate-900 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
