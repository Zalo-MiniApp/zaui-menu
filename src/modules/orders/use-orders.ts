import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { request } from '@/utils/request'

import { Product, Topping } from '../products/use-menu'
import { useOrderSessionId } from './use-order-session'

export type Order = {
  id: number
  total: number
  items: { id: string; product: Product; toppings: Topping[]; quantity: number; note: string; itemPrice: number }[]
  createdAt: number
}

export type OrderSession = {
  orders: Order[]
  total: number
}

export function useOrders() {
  const orderSessionId = useOrderSessionId()
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const query = new URLSearchParams({})
      if (orderSessionId) query.append('orderSessionId', orderSessionId)
      const res = await request(`/orders?${query.toString()}`)

      return {
        orders: res,
        total: 0,
      } as OrderSession
    },
  })
}

type OrderDto = {
  items: {
    productId: number
    quantity: number
    note: string
    toppingIds: number[]
  }[]
}

export function useSubmitOrder() {
  const orderSessionId = useOrderSessionId()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (order: OrderDto) => {
      console.log('Gửi thông tin này về server của bạn để xử lý gọi món:', {
        order,
        orderSessionId,
      })
      return {
        orderSessionId,
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      })
    },
  })
}
