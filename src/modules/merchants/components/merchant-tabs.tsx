import React, { useState } from 'react'
import { BottomNavigation, useNavigate } from 'zmp-ui'

import { Badge } from '@/components'
import { IconCookPotSolid, IconNoteSolid } from '@/components/icons'
import { IconRestaurant } from '@/components/icons/icon-restaurant'
import { Routes } from '@/constants/routes'
import { useTotalCartItems } from '@/modules/orders/use-cart'

import { useMerchant, useMerchantEnableOrder } from '../use-merchant'

type MenuType = 'menu' | 'orders' | 'info'

export function MerchantTabs({ activeTab }: { activeTab: MenuType }) {
  const navigate = useNavigate()
  const { isLoading } = useMerchant()
  const enableOrder = useMerchantEnableOrder()
  const total = useTotalCartItems()

  const [tab, setTab] = useState(activeTab)

  function handleTabChange(tab: string) {
    setTab(tab as MenuType)
    let url = Routes.merchant.page()
    switch (tab) {
      case 'orders':
        url = Routes.merchant.cart()
        break
      case 'info':
        url = Routes.merchant.info()
        break
      default:
        break
    }
    navigate(url, { animate: false, replace: true })
  }

  if (isLoading) return null

  return (
    <BottomNavigation fixed activeKey={tab} onChange={handleTabChange}>
      <BottomNavigation.Item key="menu" label="Menu" icon={<IconNoteSolid />} />
      {enableOrder && (
        <BottomNavigation.Item
          className="z-10"
          label="Món đang chọn"
          key="orders"
          icon={
            total > 0 ? (
              <Badge label={String(total)}>
                <IconCookPotSolid />
              </Badge>
            ) : (
              <IconCookPotSolid />
            )
          }
        />
      )}
      <BottomNavigation.Item key="info" label="Nhà hàng" icon={<IconRestaurant />} />
    </BottomNavigation>
  )
}
