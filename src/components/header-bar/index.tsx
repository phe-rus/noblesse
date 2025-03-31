'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '../composables/button'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '../auth-provider'
import { Avatar, AvatarFallback, AvatarImage } from '../composables/avatar'

type NavItem = {
  href: string
  label: string
  className?: string
}

const navigationItems: NavItem[] = [
  {
    href: '/',
    label: 'Overview',
    className: 'font-bold',
  },
  {
    href: '/developers',
    label: 'Developers',
    className: 'font-extralight',
  },
  {
    href: '/read-docs',
    label: 'Read our docs',
    className: 'font-extralight',
  },
]

const dashboardItems: NavItem[] = [
  {
    href: '/overview',
    label: 'Overview',
    className: 'font-bold',
  },
  {
    href: '/repository',
    label: 'Repository',
    className: 'font-extralight',
  },
  {
    href: '/database',
    label: 'Database',
    className: 'font-extralight',
  },
  {
    href: '/storage',
    label: 'Storage',
    className: 'font-extralight',
  },
  {
    href: '/analytics',
    label: 'Analytics',
    className: 'font-extralight',
  },
  {
    href: '/domain',
    label: 'Domains',
    className: 'font-extralight',
  },
  {
    href: '/settings',
    label: 'Settings',
    className: 'font-extralight',
  },
]

export const HeaderBar = () => {
  const pathName = usePathname()
  const { user, loading } = useAuth()
  const router = useRouter() // renamed from route for clarity

  if (pathName.includes('login') || pathName.includes('create')) return null

  const handleLogin = () => {
    router.push(`/login?message=${encodeURIComponent('Login to your account')}`)
  }

  const userAvatar = () => {
    if (!user) return null
    if (typeof user.avatar === 'object') {
      return user.avatar?.url ?? 'https://github.com/shadcn.png'
    }
    return 'https://github.com/shadcn.png'
  }

  const handleProfile = (username: string) => {
    router.push(`/${username}`)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/5 text-white',
      )}
      role="banner"
    >
      {loading ? (
        <div className="w-full h-1 bg-muted/20 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-full"
            style={{
              animation: 'loading 2s ease-in-out infinite',
            }}
          />
        </div>
      ) : !pathName.includes(user?.username!) ? (
        <div className="container flex h-14 items-center gap-2 md:gap-4">
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-start">
            <Link href="/" className="hover:underline">
              Noblesse
            </Link>
          </div>

          <nav
            className="ml-auto flex items-center gap-2 md:flex-1 md:justify-center"
            role="navigation"
          >
            <ul className="flex items-center gap-4 text-sm xl:gap-6">
              {navigationItems.map(({ href, label, className }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(className, 'hover:underline active:underline')}
                    aria-current={href === pathName ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <nav className="flex items-center gap-0.5">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => (user ? handleProfile(user.username) : handleLogin())}
                className={cn(
                  'rounded-full bg-muted/10 text-white/80 hover:text-white hover:bg-muted/30 active:bg-muted/50',
                )}
              >
                {user && (
                  <Avatar className="size-5">
                    <AvatarImage src={userAvatar()!} />
                    <AvatarFallback>NO</AvatarFallback>
                  </Avatar>
                )}
                {user ? user.username : 'Login to noblesse'}
              </Button>
            </nav>
          </div>
        </div>
      ) : (
        <div className="container flex flex-col w-full h-fit gap-2 md:gap-4">
          <div className="flex h-14 items-center gap-2 md:gap-4">
            <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-start">
              <Link href={`/${user?.username}`} className="text-2xl font-bold">
                Noblesse
              </Link>
            </div>

            <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
              <nav className="flex items-center gap-0.5">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => (user ? handleProfile(user.username) : handleLogin())}
                  className={cn(
                    'rounded-full bg-muted/40 text-white/80 hover:text-white hover:bg-muted/80 active:bg-muted/50',
                  )}
                >
                  <Avatar className="size-5">
                    <AvatarImage src={userAvatar()!} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  {user ? user.username : 'Login to noblesse'}
                </Button>
              </nav>
            </div>
          </div>
          <div className="flex h-14 items-start gap-2 md:gap-4">
            <nav className="flex items-start gap-0.5">
              <ul className="flex items-center gap-4 text-sm xl:gap-6">
                {dashboardItems.map(({ href, label, className }) => (
                  <li key={href}>
                    <Link
                      href={`${user?.username}/*${href}`}
                      className={cn(
                        className,
                        'hover:underline active:underline tracking-wide decoration-wavy',
                      )}
                      aria-current={href === pathName ? 'page' : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
