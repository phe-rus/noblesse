import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { redirect } from 'next/navigation'

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect(`/${user?.username}?message=${encodeURIComponent('You are already logged in.')}`)
  }

  return children
}
