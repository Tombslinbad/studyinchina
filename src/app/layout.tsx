import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { ConvexClerkProvider } from '@/components/ConvexProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Modern China Study Abroad',
  description: 'Your gateway to studying in China - Programs, Visas, and Student Services',
}

export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <ConvexClerkProvider>
        <html lang="en" className="scroll-smooth">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
            <meta name="theme-color" content="#2563EB" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
          </head>
          <body className="bg-gray-50 text-slate-900 antialiased">
            {children}
          </body>
        </html>
      </ConvexClerkProvider>
    </ClerkProvider>
  )
}
