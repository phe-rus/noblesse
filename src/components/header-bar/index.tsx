import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '../composables/button'

export const HeaderBar = () => {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/5 text-white',
      )}
    >
      <div className="container flex h-14 items-center gap-2 md:gap-4">
        <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-start">
          <h1>Noblesse</h1>
        </div>

        <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-center">
          <nav className="flex items-center gap-4 text-sm xl:gap-6">
            <Link href={'/'} className="font-bold hover:underline active:underline">
              Overview
            </Link>
            <Link href={'/developers'} className="font-extralight hover:underline active:underline">
              Developers
            </Link>
            <Link href={'/read-docs'} className="font-extralight hover:underline active:underline">
              Read our docs
            </Link>
          </nav>
        </div>

        <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
          <nav className="flex items-center gap-0.5">
            <Button
              size={'sm'}
              variant={'ghost'}
              className={cn(
                'rounded-full bg-muted/10 text-white/80 hover:text-white hover:bg-muted/30 active:bg-muted/50',
              )}
            >
              Login to noblesse
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
