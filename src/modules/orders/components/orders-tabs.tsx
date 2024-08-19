import React from 'react'
import { Tabs as UITabs, Text } from 'zmp-ui'

import { Badge } from '@/components'

import { useCart } from '../use-cart'
import { useOrders } from '../use-orders'
import { OrderTabType, useOrdersTab } from '../use-orders-tab'

export function OrdersTabs() {
  const [tab, setTab] = useOrdersTab()
  const { data } = useOrders()
  const { items } = useCart()
  function handleChangeTab(tab: string) {
    setTab(tab as OrderTabType)
  }

  const cartCount = Object.values(items).reduce((acc, item) => acc + item.quantity, 0)
  const ordersCount =
    data?.orders?.reduce((acc, order) => acc + order.items.reduce((xa, or) => xa + or.quantity, 0), 0) || 0

  return (
    <UITabs activeKey={tab} onChange={handleChangeTab} className="zaui-tabs-fluid">
      <UITabs.Tab
        key="cart"
        label={
          <span className="flex justify-center">
            <Text>Món đang chọn</Text>
            {cartCount > 0 && (
              <Badge label={String(cartCount)} variant={tab === 'cart' ? 'primary' : 'inactive'}>
                <span className="ml-3" />
              </Badge>
            )}
          </span>
        }
      />
      <UITabs.Tab
        key="orders"
        label={
          <span className="flex justify-center">
            <Text>Món đã gọi</Text>
            {ordersCount > 0 && (
              <Badge label={String(ordersCount)} variant={tab === 'orders' ? 'primary' : 'inactive'}>
                <span className="ml-3" />
              </Badge>
            )}
          </span>
        }
      />
    </UITabs>
  )
}
