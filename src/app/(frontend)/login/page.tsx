import { Media } from '@/components/media-image'
import coverImage from '../../../../public/auth/auth_cover.svg'
import { StaticImageData } from 'next/image'
import { AuthForm } from '@/components/form-provider/auth-form'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const url: StaticImageData = coverImage

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <AuthForm />
      <div className="relative hidden bg-muted lg:block">
        <Media
          src={url}
          fill
          priority
          imgClassName="object-cover"
          className="absolute inset-0 h-full w-full dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
