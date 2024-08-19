import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'
import { Text } from 'zmp-ui'

import { clsx } from '@/utils/clsx'

const badgeVariants = cva(
  'absolute top-0 right-[-12px] w-5 h-5 rounded-full border-solid border-2 border-white flex justify-center items-center',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        inactive: 'bg-inactive text-inactive-foreground',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

type Props = {
  children: React.ReactNode
  label: string
  className?: string
} & VariantProps<typeof badgeVariants>

export function Badge({ variant, label, children, className }: Props) {
  return (
    <span className="inline-flex relative flex-shrink-0 align-middle">
      {children}
      <span className={clsx(badgeVariants({ variant, className }))}>
        <Text size="xxxxSmall" className="font-medium">
          {label}
        </Text>
      </span>
    </span>
  )
}
