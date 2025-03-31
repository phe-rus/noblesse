'use client'

import { cn } from '@/lib/utils'
import { Button } from '../composables/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { BrandHolder } from './brand-holder'
import { InputForm } from '../composables/input-form'
import { useAuth } from '../auth-provider'
import { useCallback, useRef, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'

const authSchema = z
  .object({
    username: z
      .string()
      .regex(/^[a-zA-Z0-9_-]+$/, {
        message: 'Username can only contain letters, numbers, underscore and dash',
      })
      .min(3, 'Username must be at least 3 characters')
      .max(8, 'Username must be at most 8 characters'),
    email: z.string().min(1, 'Email is required').email('Invalid email address').max(255),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(12, 'Password must be at most 12 characters')
      .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
      }),
    rePassword: z.string().min(1, 'Re-password is required'),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ['rePassword'],
  })

type FormData = z.infer<typeof authSchema>

export function CreateForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)

  const { login, create } = useAuth()
  const router = useRouter()

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<FormData>({
    resolver: zodResolver(authSchema),
  })

  const onSubmit = useCallback(
    async (data: FormData) => {
      setLoading(true)
      try {
        const response = await create({
          username: data.username,
          email: data.email,
          password: data.password,
          passwordConfirm: data.rePassword,
        })

        if (!response) {
          toast.error('Failed to create account')
          return
        }

        try {
          const loginData = { email: data.email, password: data.password }
          await login(loginData)
          toast.success('Account created successfully')
          router.push(
            `${response?.username}?success=${encodeURIComponent('Account created successfully')}`,
          )
        } catch (error) {
          toast.error('Account created but failed to login')
        }
      } catch (error) {
        toast.error('Failed to create account')
      } finally {
        setLoading(false)
      }
    },
    [create, login, router],
  )

  return (
    <div className="flex flex-col gap-4 p-6 md:p-10">
      <BrandHolder />
      <div className="flex flex-1 items-center justify-center">
        <form
          className={cn('flex flex-col gap-6', className)}
          {...props}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-start gap-2 text-center">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-sm text-muted-foreground text-start">
              Enter your username, email and password below to create an account
            </p>
          </div>
          <div className="grid gap-6">
            <InputForm
              type="text"
              label="Username"
              {...register('username')}
              error={errors.username?.message}
              placeholder="username"
            />
            <InputForm
              type="email"
              label="Email"
              {...register('email')}
              error={errors.email?.message}
              placeholder="Email"
            />
            <InputForm
              type="password"
              label="Password"
              {...register('password')}
              error={errors.password?.message}
              placeholder="Password"
            />
            <InputForm
              type="password"
              label="Re-password"
              {...register('rePassword')}
              error={errors.rePassword?.message}
              placeholder="Re-password"
            />
            <Button
              type="submit"
              className="w-full rounded-none"
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
          </div>
          <div className="text-center text-sm">
            Already have an account?{' '}
            <a href="/login" className="underline underline-offset-4">
              Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
