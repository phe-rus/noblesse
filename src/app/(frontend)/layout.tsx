import React from 'react'
import { ThemeProviders } from '@/providers/theme-provider'
import { AuthProvider } from '@/components/auth-provider'
import { HeaderBar } from '@/components/header-bar'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Toaster } from '@/components/composables/sonner'
import '../globals.css'
import { cn } from '@/lib/utils'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <ThemeProviders>
          <AuthProvider>
            <HeaderBar />
            <div className="flex-1">{children}</div>
            <Toaster />
          </AuthProvider>
        </ThemeProviders>
      </body>
    </html>
  )
}

export const metadata = {
  description:
    'Noblesse is an all-in-one cloud platform designed for developers, startups, and businesses that need scalable infrastructure for hosting, databases, storage, and version control.',
  title: 'Noblesse',
}
