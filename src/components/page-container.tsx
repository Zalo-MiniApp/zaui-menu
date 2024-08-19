import React from 'react'

import { clsx } from '@/utils/clsx'

type Props = {
  children: React.ReactNode
  withHeader?: boolean
  withBottomNav?: boolean
  noInsetTop?: boolean
  noInsetBottom?: boolean
}

export function PageContainer({ children, withHeader, withBottomNav, noInsetTop, noInsetBottom }: Props) {
  return (
    <div
      className={clsx(
        'page-container',
        withHeader && 'with-header',
        withBottomNav && 'with-bottom-nav',
        noInsetTop && 'no-inset-top',
        noInsetBottom && 'no-inset-bottom',
      )}
    >
      {children}
    </div>
  )
}
