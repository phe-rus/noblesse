'use client'

import { cn } from '@/lib/utils'
import { Input } from './input'
import { Label } from './label'
import React, { ChangeEvent, forwardRef } from 'react'

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  trialingHandler?: React.ReactNode
  error?: string
}

export const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  ({ label, trialingHandler, error, className, ...props }, ref) => {
    const id = label.toLowerCase()
    const displayLabel = label.charAt(0).toUpperCase() + label.slice(1)

    return (
      <div className={cn('grid gap-2', className)}>
        <div className="flex items-center">
          <Label htmlFor={id.trim()}>{displayLabel}</Label>
          {trialingHandler}
        </div>
        <Input
          id={id.trim()}
          className={cn('rounded-none', error && 'border-red-500')}
          ref={ref}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  },
)

InputForm.displayName = 'InputForm'
