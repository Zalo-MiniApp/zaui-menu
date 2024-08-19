import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { clsx } from '@/utils/clsx'

const chipVariants = cva(
  [
    'h-[32px] inline-flex justify-center items-center rounded-full px-3 py-1.5 border border-solid border-[#EBEDEF] bg-[#EBEDEF] active:opacity-80 whitespace-nowrap flex-nowrap',
    'text-[15px] text-text',
  ],
  {
    variants: {
      variant: {
        outline: 'bg-transparent border-[#EBEDEF]',
        filled: 'bg-[#EBEDEF]',
        primary: 'bg-primary border-black/15 text-white',
      },
    },
    defaultVariants: {
      variant: 'filled',
    },
  },
)

export interface ChipProps extends React.HTMLAttributes<HTMLButtonElement>, VariantProps<typeof chipVariants> {}

export function Chip({ className, variant, ...props }: ChipProps) {
  return <button className={clsx(chipVariants({ variant }), className)} {...props} />
}
