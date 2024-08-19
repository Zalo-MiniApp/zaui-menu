import { useQuery } from '@tanstack/react-query'

import { request } from '@/utils/request'

import { useCart } from '../orders/use-cart'

export type Category = {
  id: number
  name: string
}

export type Topping = {
  id: number
  name: string
  price: number
}

export type Product = {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  toppings?: Topping[]
}

export type MenuItem = {
  category: Category
  products: Product[]
}

export function useMenu() {
  const actions = useCart((state) => state.actions)
  return useQuery({
    queryKey: ['menu'],
    queryFn: async () => {
      const res = await request<MenuItem[]>(`/menu-items`)
      const menuItems = res?.filter((item) => item.products.length > 0)
      const products = menuItems?.flatMap((item) => item.products)
      actions.productsUpdated(products)
      return menuItems
    },
  })
}
