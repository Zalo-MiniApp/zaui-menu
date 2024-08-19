import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'zmp-ui'

import { MerchantNotFoundError } from '@/constants/errors'
import { Routes } from '@/constants/routes'
import { useMerchant, useMerchantEnableOrder } from '@/modules/merchants/use-merchant'

import { useOrdersTab } from '../use-orders-tab'
import { CartList } from './cart-list'
import { CartTotal } from './cart-total'
import { OrdersHeader } from './orders-header'
import { OrdersList } from './orders-list'
import { OrdersTabs } from './orders-tabs'
import { OrdersTotal } from './orders-total'

export function OrdersPage() {
  const navigate = useNavigate()
  const [tab] = useOrdersTab()
  const { data, isLoading } = useMerchant()
  const ref = useRef<HTMLDivElement>(null)
  const enableOrder = useMerchantEnableOrder()

  useEffect(() => {
    if (data && !enableOrder) {
      navigate(Routes.merchant.page(), { replace: true, animate: false })
    }
  }, [navigate, data, enableOrder])

  if (isLoading) return null
  if (!data) throw new MerchantNotFoundError()

  return (
    <div>
      <div className="bg-background z-10 fixed top-0 left-0 right-0" ref={ref}>
        <OrdersHeader />
        <OrdersTabs />
      </div>
      <div style={{ height: 118 }} />
      {tab === 'cart' && (
        <>
          <CartList />
          <CartTotal />
        </>
      )}
      {tab === 'orders' && (
        <>
          <div className="mt-2" />
          <OrdersList />
          <div className="mt-4" />
          <OrdersTotal />
          <div className="mt-4" />
        </>
      )}
    </div>
  )
}
