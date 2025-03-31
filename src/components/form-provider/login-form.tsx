'use client'

import { cn } from '@/lib/utils'
import { Label } from '../composables/label'
import { Input } from '../composables/input'
import { Button } from '../composables/button'
import { useAuth } from '../auth-provider'
import { useForm } from 'react-hook-form'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const USERNAME_REGEX = /^[a-z0-9_-]+$/

// Modified login schema to handle a combined input for email or username
const loginSchema = z.object({
  emailOrUsername: z.string().min(1, 'Email or username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const createSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    username: z.string().regex(USERNAME_REGEX, {
      message: 'Username can only contain lowercase letters, numbers, underscore and dash',
    }),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  })

type LoginFormValues = z.infer<typeof loginSchema>
type CreateFormValues = z.infer<typeof createSchema>

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'form'>) {
  const { user, login, create, loading, error: authError } = useAuth()
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrUsername: '',
      password: '',
    },
  })

  const createForm = useForm<CreateFormValues>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
    },
  })

  const handleLoginSubmit = async (data: LoginFormValues) => {
    try {
      setError(null)

      // Determine if input is email or username
      const isEmail = data.emailOrUsername.includes('@')

      // Prepare login payload with appropriate field
      const loginData = {
        password: data.password,
        ...(isEmail ? { email: data.emailOrUsername } : { username: data.emailOrUsername }),
      }

      const user = await login(loginData)

      if (user?.username) {
        router.replace(`/${user.username.toLowerCase()}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Auth error:', err)
    }
  }

  const handleCreateSubmit = async (data: CreateFormValues) => {
    try {
      setError(null)
      const createData = {
        email: data.email,
        username: data.username,
        password: data.password,
        // passwordConfirm is needed for zod validation but might not be needed for API
        // If the API needs it, keep it; otherwise, you can omit it
        passwordConfirm: data.passwordConfirm,
      }

      const user = await create(createData)

      if (user?.username) {
        router.replace(`/${user.username.toLowerCase()}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Auth error:', err)
    }
  }

  const toggleForm = () => {
    setIsLogin(!isLogin)
    setError(null)
    // Reset form errors when toggling
    if (isLogin) {
      createForm.reset()
    } else {
      loginForm.reset()
    }
  }

  useEffect(() => {
    if (error) {
      alert(error)
    }
  }, [error])

  // Render login form
  if (isLogin) {
    return (
      <form
        className={cn('flex flex-col gap-6 w-full max-w-md mx-auto p-6', className)}
        onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          {(error || authError) && <p className="text-sm text-red-500">{error || authError}</p>}
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="emailOrUsername">Email or Username</Label>
            <Input
              id="emailOrUsername"
              type="text"
              placeholder="Enter email or username"
              disabled={loading}
              {...loginForm.register('emailOrUsername')}
              aria-invalid={!!loginForm.formState.errors.emailOrUsername}
              aria-errormessage={loginForm.formState.errors.emailOrUsername?.message}
            />
            {loginForm.formState.errors.emailOrUsername && (
              <p className="text-sm text-red-500">
                {loginForm.formState.errors.emailOrUsername.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              disabled={loading}
              {...loginForm.register('password')}
            />
            {loginForm.formState.errors.password && (
              <p className="text-sm text-red-500">{loginForm.formState.errors.password.message}</p>
            )}
          </div>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Login'}
        </Button>

        <div className="text-center text-sm">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={toggleForm}
            className="text-primary underline underline-offset-4 hover:text-primary/90"
          >
            Sign up
          </button>
        </div>
      </form>
    )
  }

  // Render create account form
  return (
    <form
      className={cn('flex flex-col gap-6 w-full max-w-md mx-auto p-6', className)}
      onSubmit={createForm.handleSubmit(handleCreateSubmit)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        {(error || authError) && <p className="text-sm text-red-500">{error || authError}</p>}
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            disabled={loading}
            {...createForm.register('email')}
            aria-invalid={!!createForm.formState.errors.email}
            aria-errormessage={createForm.formState.errors.email?.message}
          />
          {createForm.formState.errors.email && (
            <p className="text-sm text-red-500">{createForm.formState.errors.email.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="username"
            disabled={loading}
            {...createForm.register('username')}
          />
          {createForm.formState.errors.username && (
            <p className="text-sm text-red-500">{createForm.formState.errors.username.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            disabled={loading}
            {...createForm.register('password')}
          />
          {createForm.formState.errors.password && (
            <p className="text-sm text-red-500">{createForm.formState.errors.password.message}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="passwordConfirm">Confirm Password</Label>
          <Input
            id="passwordConfirm"
            type="password"
            disabled={loading}
            {...createForm.register('passwordConfirm')}
          />
          {createForm.formState.errors.passwordConfirm && (
            <p className="text-sm text-red-500">
              {createForm.formState.errors.passwordConfirm.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Create Account'}
      </Button>

      <div className="text-center text-sm">
        Already have an account?{' '}
        <button
          type="button"
          onClick={toggleForm}
          className="text-primary underline underline-offset-4 hover:text-primary/90"
        >
          Login
        </button>
      </div>
    </form>
  )
}
