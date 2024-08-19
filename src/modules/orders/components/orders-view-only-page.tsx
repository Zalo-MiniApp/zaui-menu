import React from 'react'
import { openShareSheet } from 'zmp-sdk'
import { Button, Icon } from 'zmp-ui'
import { useStore } from 'zustand'

import { useMerchant } from '@/modules/merchants/use-merchant'

import { useOrderSessionOwner } from '../use-order-session'
import { useOrderURL } from '../use-order-url'
import { useOrders } from '../use-orders'
import { OrdersHeader } from './orders-header'
import { OrdersItem } from './orders-item'
import { OrdersEmpty } from './orders-list'
import { OrdersTotal } from './orders-total'

export function OrdersViewOnlyPage() {
  const { data } = useOrders()

  if (!data?.orders?.length) return <OrdersEmpty />

  return (
    <div>
      <OrdersHeader highlightOwner />
      <div className="space-y-2 pb-4">
        <div className="space-y-2">
          {data.orders.map((order, index) => (
            <OrdersItem key={order.id} order={order} num={data.orders.length - index} mutedPrice />
          ))}
        </div>
        <OrdersTotal />
      </div>
    </div>
  )
}
