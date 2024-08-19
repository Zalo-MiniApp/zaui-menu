import React from 'react'
import { Text } from 'zmp-ui'

import plateImage from '@/static/images/plate.svg'

import { useOrders } from '../use-orders'
import { OrdersItem } from './orders-item'

export function OrdersList() {
  const { data } = useOrders()
  if (!data?.orders?.length) return <OrdersEmpty />
  return (
    <div className="space-y-2">
      {data.orders.map((order, index) => (
        <OrdersItem key={order.id} order={order} num={data.orders.length - index} />
      ))}
    </div>
  )
}

export function OrdersEmpty() {
  return (
    <div className="flex flex-col pt-[148px] px-[72px] gap-4 justify-center items-center">
      <div>
        <img src={plateImage} className="h-[60px]" />
      </div>
      <Text className="text-text-secondary">Danh sách món đã gọi trống</Text>
    </div>
  )
}
