import { APP_ENV, APP_ID } from '@/constants/common'

import { useOrderSessionId } from './use-order-session'

export function useOrderURL({ utmSource }: { utmSource: string }) {
  const orderSession = useOrderSessionId()
  const query = new URLSearchParams({ utm_source: utmSource })
  if (orderSession) query.append('orderSession', orderSession)
  if (APP_ENV) query.append('env', APP_ENV)

  const path = `/orders/view?${query.toString()}`
  const qrUrl = `https://zalo.me/s/${APP_ID}${path}`
  return {
    url: qrUrl,
    path,
  }
}
