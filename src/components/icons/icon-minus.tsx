import React from 'react'

import { SvgIconProps } from './types'

export function IconMinus({ size = 24, ...props }: SvgIconProps) {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.22794 6.47266C2.93799 6.47266 2.70294 6.70771 2.70294 6.99766C2.70294 7.28761 2.93799 7.52266 3.22794 7.52266C8.29611 7.52266 6.0451 7.52266 10.7529 7.52266C11.0429 7.52266 11.2779 7.28761 11.2779 6.99766C11.2779 6.70771 11.0429 6.47266 10.7529 6.47266C6.248 6.47266 8.06167 6.47266 3.22794 6.47266Z"
        fill="currentColor"
      />
    </svg>
  )
}
