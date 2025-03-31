import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { redirect } from 'next/navigation'
import '../../globals.css'

export default async function PherusLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  if (!user) {
    redirect(`/login?message=${encodeURIComponent('Login to access this page.')}`)
  }
  return <div className="container z-0">{children}</div>
}
