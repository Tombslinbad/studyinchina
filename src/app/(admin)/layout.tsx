'use client'

import { useAuth, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: 'dashboard' },
  { href: '/universities', label: 'Universities', icon: 'school' },
  { href: '/students', label: 'Students', icon: 'group' },
  { href: '/pipeline', label: 'Pipeline', icon: 'view_kanban' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoaded, sessionClaims } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Check admin role
  useEffect(() => {
    if (isLoaded) {
      const metadata = (sessionClaims as any)?.metadata
      const role = metadata?.role as string
      if (role !== 'admin') {
        router.push('/dashboard')
      }
    }
  }, [isLoaded, sessionClaims, router])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 h-16 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">admin_panel_settings</span>
            <span className="font-display font-bold text-xl">Admin Portal</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-slate-600 hover:text-primary transition-colors text-sm">
              Back to Student View
            </Link>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: 'w-10 h-10',
                }
              }}
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 shrink-0">
            <nav className="space-y-1 sticky top-24">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                        : 'text-slate-600 hover:bg-white hover:shadow-sm'
                    }`}
                  >
                    <span className="material-symbols-outlined">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
