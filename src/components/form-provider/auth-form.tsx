'use client'

import { cn } from '@/lib/utils'
import { Button } from '../composables/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { BrandHolder } from './brand-holder'
import { InputForm } from '../composables/input-form'
import { useCallback, useState } from 'react'
import { useAuth } from '../auth-provider'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react' // Add this import for loading animation

const authSchema = z.object({
  usernameOrEmail: z.string().min(1, 'Username or email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type FormData = z.infer<typeof authSchema>

export function AuthForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const router = useRouter()

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(authSchema),
  })

  const usernameOrEmail = watch('usernameOrEmail')

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        setIsLoading(true)
        const loginData = data.usernameOrEmail.includes('@')
          ? { email: data.usernameOrEmail, password: data.password }
          : { username: data.usernameOrEmail, password: data.password }

        const response = await login(loginData)

        if (!response) {
          throw new Error('Invalid credentials')
        }

        toast.success('Logged in successfully')
        router.push(redirect || `/${response.username}`)
      } catch (error) {
        toast.error('Invalid credentials. Please try again.')
      } finally {
        setIsLoading(false)
      }
    },
    [login, router, redirect],
  )

  return (
    <div className="flex flex-col gap-4 p-6 md:p-10">
      <BrandHolder />
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-sm">
          <form
            className={cn('flex flex-col gap-6', className)}
            {...props}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col items-start gap-2 text-center">
              <h1 className="text-2xl font-bold">Login to your account</h1>
              <p className="text-balance text-sm text-muted-foreground">
                Enter your email or username below to login to your account
              </p>
            </div>
            <div className="grid gap-6">
              <InputForm
                type={usernameOrEmail?.includes('@') ? 'email' : 'text'}
                label="Email or Username"
                {...register('usernameOrEmail')}
                error={errors.usernameOrEmail?.message}
                placeholder="m@example.com or username"
                disabled={isLoading}
              />
              <InputForm
                type="password"
                label="Password"
                {...register('password')}
                error={errors.password?.message}
                placeholder="*******"
                disabled={isLoading}
                trialingHandler={
                  <a
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                }
              />

              <Button type="submit" className="w-full rounded-none" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </div>
            <div className="text-center text-sm">
              Don&apos;t have an account?{' '}
              <a href="/create" className="underline underline-offset-4 hover:text-primary">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
