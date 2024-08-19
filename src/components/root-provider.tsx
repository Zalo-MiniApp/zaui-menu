import React from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { Text } from 'zmp-ui'

import { Errors } from '@/constants/errors'
import { OrderSessionProvider } from '@/modules/orders/components'

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <OrderSessionProvider>{children}</OrderSessionProvider>
    </ErrorBoundary>
  )
}

function ErrorPage(props: FallbackProps) {
  let message = 'Đã xảy ra lỗi, vui lòng quay lại sau'
  if (props.error?.message === Errors.MERCHANT_NOT_FOUND) {
    message = 'Cửa hàng này không tồn tại'
  } else if (props.error?.message === Errors.ORDER_SESSION_EXPIRED) {
    message = 'Phiên đặt hàng không tồn tại hoặc đã hết hạn'
  }
  return (
    <div className="flex flex-col pt-[148px] px-[52px] gap-4 justify-center items-center">
      <Text className="text-text-secondary text-center">{message}</Text>
    </div>
  )
}
