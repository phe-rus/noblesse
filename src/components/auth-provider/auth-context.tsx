'use client'

import { useEffect } from 'react'
import { useAuth } from '.'
import { GalleryVerticalEnd } from 'lucide-react'
import { LoginForm } from '../form-provider/login-form'
import { Media } from '../media-image'
import { StaticImageData } from 'next/image'
import coverImage from '../../../public/auth/auth_cover.svg'
import { useRouter } from 'next/navigation'

export const AuthContext: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const route = useRouter()
  const url: StaticImageData = coverImage
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      route.replace(`/${user.username.toLowerCase()}`)
    }
  }, [user])

  if (!user) {
  } else {
    return <div className="flex flex-col">{children}</div>
  }
}
