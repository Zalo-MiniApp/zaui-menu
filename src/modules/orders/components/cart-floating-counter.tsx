import React from 'react'
import { useDebounceValue } from 'usehooks-ts'
import { Text, useNavigate } from 'zmp-ui'

import { IconShoppingCart } from '@/components/icons'
import { Routes } from '@/constants/routes'
import { useAnimate } from '@/hooks/use-animate'
import { clsx } from '@/utils/clsx'
import { formatMoney } from '@/utils/format'

import { useCart, useTotalCartItems } from '../use-cart'

export function CartFloatingCounter() {
  const { total } = useCart()
  const totalItems = useTotalCartItems()

  const navigate = useNavigate()

  const [totalDebounced] = useDebounceValue(total, 350)
  const [totalItemsDebounced] = useDebounceValue(totalItems, 350)

  const [animate] = useAnimate(totalDebounced)

  return (
    <div
      className={clsx(
        'fixed left-0 right-0 z-10 with-bottom-nav bottom-2 px-3 duration-200 ease-in-out',
        totalItems > 0 ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <div
        className={clsx(
          'bg-[#212121] py-2 px-4 rounded-lg flex text-white gap-2 items-center',
          animate && 'animate-add-to-cart',
        )}
        onClick={() => {
          navigate(Routes.merchant.cart(), { animate: false, replace: true })
        }}
      >
        <IconShoppingCart className="shrink-0" />
        <Text className="shrink-0">Món đang chọn</Text>
        <Text className="text-right ml-auto break-all">
          {formatMoney(totalDebounced)} - {totalItemsDebounced} Món
        </Text>
      </div>
    </div>
  )
}
