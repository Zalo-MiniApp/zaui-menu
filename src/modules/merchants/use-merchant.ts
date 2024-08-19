import { useQuery } from '@tanstack/react-query'

import { request } from '@/utils/request'

import { useCart } from '../orders/use-cart'

type Merchant = {
  name: string
  address: string
  logoUrl: string
  coverUrl: string
  description: string
  branches?: {
    id: string
    name: string
    address: string
  }[]
  status: 'ACTIVE' | 'INACTIVE'
  visibleOrder: 'DISABLE' | 'ENABLE'
}

type Res = {
  merchant: Merchant
}

export function useMerchant() {
  const cartActions = useCart((state) => state.actions)
  return useQuery({
    queryKey: ['merchants'],
    queryFn: async () => {
      const res = await request<Res>(`/`)
      if (res.merchant.status === 'INACTIVE' || res.merchant.visibleOrder === 'DISABLE') {
        cartActions.clear()
      }
      return res.merchant
    },
  })
}

export function useMerchantEnableOrder() {
  const { data } = useMerchant()
  return data?.visibleOrder === 'ENABLE'
}
