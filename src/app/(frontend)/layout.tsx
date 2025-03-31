import React from 'react'
import { ThemeProviders } from '@/providers/theme-provider'
import '../globals.css'
import { AuthProvider } from '@/components/auth-provider'
import { HeaderBar } from '@/components/header-bar'

export const metadata = {
  description:
    'Noblesse is an all-in-one cloud platform designed for developers, startups, and businesses that need scalable infrastructure for hosting, databases, storage, and version control.',
  title: 'Noblesse',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProviders>
          <AuthProvider>
            <HeaderBar />
            <main>{children}</main>
          </AuthProvider>
        </ThemeProviders>
      </body>
    </html>
  )
}
