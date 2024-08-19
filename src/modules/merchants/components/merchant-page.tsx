import React, { useEffect } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'
import { Button, Header, Icon, Text, useSnackbar } from 'zmp-ui'

import { IconLocationSolid } from '@/components/icons'
import { MerchantNotFoundError } from '@/constants/errors'
import { useOaState } from '@/modules/oa/oa.state'
import { useFollowOA, useOA } from '@/modules/oa/use-oa'
import { clsx } from '@/utils/clsx'

import { useMerchant } from '../use-merchant'
import { MerchantAvatar } from './merchant-avatar'
import { MerchantCover } from './merchant-cover'
import { MerchantPageLoading } from './merchant-page-loading'

const threshold: number[] = []
for (let i = 0; i <= 1.0; i += 0.01) {
  threshold.push(i)
}

export function MerchantPage() {
  const snackbar = useSnackbar()

  const { data: merchant, isLoading: merchantLoading } = useMerchant()
  const { data: merchantOA } = useOA()
  const oaActions = useOaState((state) => state.actions)
  const showCount = useOaState((state) => state.showCount)

  const { entry, ref } = useIntersectionObserver({ threshold })

  const isLoading = merchantLoading

  const followOA = useFollowOA()

  useEffect(() => {
    if (!merchantOA) return
    if (merchantOA.followed) return
    if (showCount > 0) return
    oaActions.openRequestFollowDialog()
  }, [merchantOA, oaActions, showCount])

  if (isLoading) return <MerchantPageLoading />
  if (!merchant) throw new MerchantNotFoundError()
  return (
    <div>
      <Header
        title={merchant.name}
        showBackIcon={false}
        className={clsx(
          'opacity-0 transition-opacity ease-in-out duration-50',
          entry && entry.intersectionRatio < 0.5 && 'opacity-1',
        )}
      />
      <MerchantCover coverUrl={merchant.coverUrl || ''} />
      <div className="relative translate-y-[-84px] h-[84px] mb-[-84px] flex px-4 items-end">
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-gradient-to-b from-[#00000000] to-[#000000]" />
        <div className="relative flex-shrink-0 translate-y-[42px]">
          <MerchantAvatar avatarUrl={merchant.logoUrl || ''} />
        </div>
        {merchantOA && (
          <div className="relative flex-1 flex flex-col gap-2 items-end py-4">
            <Button
              size="small"
              variant="secondary"
              type={merchantOA.followed ? 'neutral' : undefined}
              loading={followOA.isPending}
              onClick={() => {
                if (merchantOA.followed) return
                followOA.mutate(merchantOA.oa.id, {
                  onSuccess: () => {
                    snackbar.openSnackbar({
                      type: 'success',
                      text: 'Đã quan tâm OA',
                    })
                  },
                })
              }}
            >
              <span className="flex">
                {merchantOA.followed ? <span>Đã quan tâm</span> : <span>Quan tâm OA </span>}
                {merchantOA.followed && <Icon className="ml-2" icon="zi-check" size={18} />}
              </span>
            </Button>
            <div className="text-white">Nhận ưu đãi riêng cho bạn</div>
          </div>
        )}
      </div>
      <div className="pt-[52px] px-4 pb-3">
        <div className="flex flex-col space-y-4">
          <div ref={ref}>
            <Text size="xLarge" className="font-medium">
              {merchant?.name}
            </Text>
          </div>
          <div className="text-text-secondary">
            <Text size="normal" className="whitespace-break-spaces">
              {merchant.description}
            </Text>
          </div>
          <div className="bg-[#F7F7F8] rounded-lg px-3 py-4">
            <Text size="large" className="font-medium">
              {merchant.branches ? 'Hệ thống chi nhánh' : 'Địa chỉ'}
            </Text>
            {merchant.branches ? (
              <div>
                {merchant.branches.map((branch) => (
                  <div key={branch.id}>
                    <div className="bg-divider h-[1px] w-full my-3" />
                    <div className="flex items-center space-x-1">
                      <IconLocationSolid size={24} className="shrink-0 text-text-secondary" />
                      <Text size="small">{branch?.address}</Text>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div className="bg-divider h-[1px] w-full my-3" />
                <div className="flex items-center space-x-1">
                  <IconLocationSolid size={24} className="shrink-0 text-text-secondary" />
                  <Text size="small">{merchant?.address}</Text>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
