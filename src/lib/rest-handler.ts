import type { User } from '@/payload-types'

interface ApiResponse {
  user?: User
  errors?: Array<{ message: string }>
}

export const resthandler = async <T = User>(
  url: string,
  args?: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  options?: RequestInit,
): Promise<T | null> => {
  const method = options?.method || 'POST'

  try {
    const response = await fetch(url, {
      method,
      ...(method === 'POST' ? { body: JSON.stringify(args) } : {}),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: ApiResponse = await response.json()

    if (data.errors?.length) {
      throw new Error(data.errors[0].message)
    }

    return (data.user as T) || null
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('An unexpected error occurred')
  }
}
