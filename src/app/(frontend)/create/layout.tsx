import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { redirect } from 'next/navigation'

export default async function CreateLayout({ children }: { children: React.ReactNode }) {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect(
      `/${user?.username}?message=${encodeURIComponent('Cannot create a new account while logged in, please log out and try again.')}`,
    )
  }

  return children
}
