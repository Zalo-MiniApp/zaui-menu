import React from 'react'
import { Text } from 'zmp-ui'

import { formatMoney } from '@/utils/format'

import { useOrders } from '../use-orders'

export function OrdersTotal() {
  const { data } = useOrders()
  if (!data?.orders) return null

  const total = data.orders.reduce((acc, order) => acc + order.total, 0)
  const totalItems = data.orders.reduce(
    (acc, order) => acc + order.items.reduce((accItem, item) => accItem + item.quantity, 0),
    0,
  )

  return (
    <div className="p-4 bg-background">
      <div className="flex justify-between mb-2">
        <Text className="text-text-secondary">Số món đã gọi</Text>
        <Text className="text-text-secondary">{totalItems} món</Text>
      </div>
      <div className="flex gap-2 justify-between mb-2">
        <Text size="large" className="font-medium">
          Tổng cộng
        </Text>
        <Text size="xLarge" className="text-primary font-medium">
          {formatMoney(total)}
        </Text>
      </div>
      <Text size="small" className="text-text-secondary">
        (*) Giá chưa bao gồm thuế VAT và phí phục vụ
      </Text>
    </div>
  )
}
