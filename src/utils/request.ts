import { getAccessToken } from 'zmp-sdk'

import { API_URL } from '@/constants/common'
import { MerchantNotFoundError } from '@/constants/errors'

const mockUrls = import.meta.glob<{ default: string }>('../mock/*.json', { query: 'url', eager: true })

export async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = API_URL
    ? `${API_URL}${path}`
    : mockUrls[`../mock${path === '/' ? '/index' : path.split('?')[0]}.json`]?.default

  const response = await fetch(url, {
    ...options,
    headers: API_URL
      ? {
          Authorization: `Bearer ${await getAccessToken()}`,
          ...options?.headers,
        }
      : options?.headers,
  })
  if (!response.ok) {
    try {
      const errorData = await response.json()
      throw errorData
    } catch (error) {
      throw new Error(response.statusText)
    }
  }
  const json = await response.json()
  if (json.error < 0) {
    if (json.message === 'Merchant not found') throw new MerchantNotFoundError()
    throw new Error(json.message)
  }
  return json.data as T
}
