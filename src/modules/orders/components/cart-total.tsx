import React, { useRef } from 'react'
import { useResizeObserver } from 'usehooks-ts'
import { Button, Text, useNavigate, useSnackbar } from 'zmp-ui'

import { Routes } from '@/constants/routes'
import { formatMoney } from '@/utils/format'

import { useCart } from '../use-cart'
import { useOrderSessionActions } from '../use-order-session'
import { useSubmitOrder } from '../use-orders'

export function CartTotal() {
  const snackbar = useSnackbar()
  const { items, total, actions } = useCart()
  const ref = useRef<HTMLDivElement>(null)
  const { height } = useResizeObserver({ ref, box: 'border-box' })
  const navigate = useNavigate()

  const orderMutation = useSubmitOrder()
  const orderSessionActions = useOrderSessionActions()

  function handleCheckoutCart() {
    orderMutation.mutate(
      {
        items: Object.values(items).map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          note: item.note || '',
          toppingIds: item.toppings?.map((t) => t.id) || [],
        })),
      },
      {
        onSuccess: (data) => {
          orderSessionActions.setId(data.orderSessionId)
          actions.clear()
          snackbar.openSnackbar({
            type: 'success',
            text: 'Gọi món thành công',
          })
          navigate(Routes.merchant.orders(), { animate: false, replace: true })
        },
        onError() {
          snackbar.openSnackbar({
            type: 'error',
            text: 'Đã xảy ra lỗi, không thể thêm món',
          })
        },
      },
    )
  }

  if (Object.keys(items).length === 0) return null

  return (
    <>
      <div style={{ height: (height || 0) + 16 }} />
      <div className="fixed bottom-0 left-0 right-0 with-bottom-nav bg-background shadow-[0px_-2px_6px_0px_#0D0D0D24]">
        <div className="p-4">
          <div className="flex gap-2 justify-between mb-2">
            <Text size="large" className="font-medium">
              Tổng cộng
            </Text>
            <Text size="xLarge" className="text-primary font-medium">
              {formatMoney(total)}
            </Text>
          </div>
          <div className="mt-4" />
          <Button fullWidth size="large" onClick={handleCheckoutCart} loading={orderMutation.isPending}>
            Gọi món
          </Button>
        </div>
      </div>
    </>
  )
}
