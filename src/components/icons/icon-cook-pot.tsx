import React from 'react'

import { SvgIconProps } from './types'

export function IconCookPotSolid({ size = 24, ...props }: SvgIconProps) {
  return (
    <svg
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-xl"
      width={size}
      height={size}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.6328 4.45878H13.3759V3.2019H10.8622V4.45878H9.6053C4.5778 4.45878 3.32092 6.97253 3.32092 6.97253H20.9172C20.9172 6.97253 19.6603 4.45878 14.6328 4.45878Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.9172 9.48637V8.22949H3.32096V9.48637L2.06409 10.7432V12.0001H3.32096V17.0276C3.32096 17.0276 3.32096 19.5414 5.83471 19.5414H18.4035C20.9172 19.5414 20.9172 17.0276 20.9172 17.0276V12.0001H22.1741V10.7432L20.9172 9.48637Z"
        fill="currentColor"
      />
    </svg>
  )
}
