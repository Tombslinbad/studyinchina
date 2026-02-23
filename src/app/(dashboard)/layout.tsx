'use client'

import { useAuth, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSyncUser } from '@/hooks/useSyncUser'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { href: '/applications', label: 'Applications', icon: 'inventory_2' },
  { href: '/documents', label: 'Documents', icon: 'folder' },
  { href: '/visa-tracker', label: 'Visa Tracker', icon: 'public' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoaded } = useAuth()
  const pathname = usePathname()
  
  useSyncUser()

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-0 z-40 hidden lg:block">
          <div className="p-6">
            <Link href="/" className="flex items-center gap-2 mb-10">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-lg">school</span>
              </div>
              <span className="font-bold text-lg text-slate-900">
                Study<span className="text-blue-600">China</span>
              </span>
            </Link>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                        : 'text-slate-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-lg">school</span>
              </div>
              <span className="font-bold text-slate-900">StudyChina</span>
            </Link>
            <UserButton />
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-4 py-2">
          <div className="flex justify-around">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                    isActive ? 'text-blue-600' : 'text-slate-500'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          {/* Top Header */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-30 hidden lg:flex items-center justify-between px-8 py-4">
            <h1 className="text-xl font-bold text-slate-900">
              {navItems.find(item => item.href === pathname)?.label || 'Dashboard'}
            </h1>
            <div className="flex items-center gap-4">
              <Link 
                href="/search" 
                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                <span className="material-symbols-outlined">search</span>
                <span className="text-sm font-medium">Search Programs</span>
              </Link>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: 'w-9 h-9',
                  }
                }}
              />
            </div>
          </header>

          {/* Page Content */}
          <div className="p-4 lg:p-8 pb-24 lg:pb-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
