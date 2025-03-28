import React from 'react'
import { ThemeProviders } from '@/providers/theme-provider'
import '../globals.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <ThemeProviders>
          <main>{children}</main>
        </ThemeProviders>
      </body>
    </html>
  )
}
