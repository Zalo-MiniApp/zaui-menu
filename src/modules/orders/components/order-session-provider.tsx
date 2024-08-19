import { useQuery } from '@tanstack/react-query'

import { OrderSessionExpiredError } from '@/constants/errors'
import { request } from '@/utils/request'

import { useCart } from '../use-cart'
import { OrderSessionOwner, useOrderSessionActions, useOrderSessionId } from '../use-order-session'

type OrderSessionResponse = {
  orderSession?: {
    id: string
  }
  owner: OrderSessionOwner
}

export function OrderSessionProvider({ children }: { children: React.ReactNode }) {
  const id = useOrderSessionId()
  const actions = useOrderSessionActions()
  const cartActions = useCart((state) => state.actions)
  const { data, error } = useQuery({
    queryKey: ['orderSession', id],
    queryFn: async () => {
      const query = new URLSearchParams()
      if (id) query.append('orderSessionId', id)
      const response = await request<OrderSessionResponse>(`/sessions?${query.toString()}`)
      if (id && !response.orderSession) {
        throw new OrderSessionExpiredError()
      }
      actions.setOwner(response.owner)
      if (id !== response.orderSession?.id) actions.setId(response.orderSession?.id)

      // Clear cart nếu orderSessionId thay đổi
      if (id && id !== response.orderSession?.id) cartActions.clear()

      return response
    },
    retry: false,
  })

  if (error) throw error
  if (!data) return null
  return children
}
