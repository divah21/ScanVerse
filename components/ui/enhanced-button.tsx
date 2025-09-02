'use client'

import type React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface EnhancedButtonProps extends React.ComponentProps<typeof Button> {
  ripple?: boolean
  glow?: boolean
}

export const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ className, ripple = false, glow = false, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          'relative overflow-hidden transition-all duration-300',
          ripple && 'hover:scale-105 active:scale-95',
          glow && 'hover:shadow-lg hover:shadow-primary/25',
          'before:absolute before:inset-0 before:bg-white/20 before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]',
          className
        )}
        {...props}
      >
        {children}
      </Button>
    )
  }
)

EnhancedButton.displayName = 'EnhancedButton'
