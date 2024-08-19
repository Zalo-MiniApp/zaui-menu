import { getStorage, removeStorage, setStorage } from 'zmp-sdk'

export const storage = {
  getItem: async <T>(key: string) => {
    const items = await getStorage({ keys: [key] })
    return items[key] as T
  },
  setItem: async <T>(key: string, value: T) => {
    await setStorage({ data: { [key]: value } })
  },
  removeItem: async (key: string) => {
    await removeStorage({ keys: [key] })
  },
}
