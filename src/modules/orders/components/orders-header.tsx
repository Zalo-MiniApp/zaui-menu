import React from 'react'
import { Text } from 'zmp-ui'

import { useOrderSessionOwner } from '@/modules/orders/use-order-session'
import { clsx } from '@/utils/clsx'

type Props = {
  highlightOwner?: boolean
}

export function OrdersHeader({ highlightOwner }: Props) {
  const owner = useOrderSessionOwner()
  return (
    <div className="inset-top bg-background">
      <div className="p-4">
        <Text size="xLarge" className="font-medium">
          Thông tin gọi món
        </Text>
        {owner && (
          <Text size="small" className="text-text-subtle">
            <span>Người tạo: </span>
            <span className={clsx(highlightOwner && 'text-primary font-bold')}>{owner.name}</span>
          </Text>
        )}
      </div>
    </div>
  )
}
