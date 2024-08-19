import { useSearchParams } from 'react-router-dom'

export type OrderTabType = 'cart' | 'orders'

export function useOrdersTab() {
  const [params, setParams] = useSearchParams()

  const tab = (params.get('tab') || 'cart') as OrderTabType

  function setTab(tab: OrderTabType) {
    setParams({ tab })
  }
  return [tab, setTab] as const
}
