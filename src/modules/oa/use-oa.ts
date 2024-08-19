import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { followOA } from 'zmp-sdk'

import { request } from '@/utils/request'

type Res = {
  oa: {
    id: string
    name: string
    coverUrl: string
    avatarUrl: string
    phone: string
  }
  followed: boolean
}

export function useOA() {
  return useQuery({
    queryKey: ['oa'],
    queryFn: async () => request<Res>(`/oa`),
  })
}

export function useFollowOA() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => followOA({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['oa'],
      })
    },
  })
}
