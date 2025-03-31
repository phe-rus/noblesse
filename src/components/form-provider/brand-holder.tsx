'use client'

import { GalleryVerticalEnd } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const BrandHolder = () => {
  const route = useRouter()
  return (
    <div className="flex justify-center gap-2 md:justify-start">
      <a
        onClick={() => route.push('/')}
        className="flex items-center gap-2 font-medium cursor-pointer"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <GalleryVerticalEnd className="size-4" />
        </div>
        Noblesse
      </a>
    </div>
  )
}
