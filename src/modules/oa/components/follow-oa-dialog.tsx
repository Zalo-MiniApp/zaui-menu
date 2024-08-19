import React from 'react'
import { useDebounceValue } from 'usehooks-ts'
import { followOA } from 'zmp-sdk'
import { Modal, Text, useSnackbar } from 'zmp-ui'

import { IconOAVerified } from '@/components/icons'
import { Portal } from '@/components/portal'

import { useOaState } from '../oa.state'
import { useOA } from '../use-oa'

export function FollowOaDialog() {
  const snackbar = useSnackbar()
  const { data: merchantOA, refetch } = useOA()
  const { requestFollowDialog, actions } = useOaState()

  const [open] = useDebounceValue(requestFollowDialog, 1000)

  async function handleFollow() {
    if (!merchantOA) return
    try {
      await followOA({
        id: merchantOA?.oa.id,
      })
      snackbar.openSnackbar({
        type: 'success',
        text: 'Đã quan tâm OA',
      })
      refetch()
    } finally {
      actions.closeRequestFollowDialog()
    }
  }

  if (!merchantOA || merchantOA.followed) return null

  return (
    <Portal>
      <Modal
        visible={open && requestFollowDialog}
        onClose={actions.closeRequestFollowDialog}
        coverSrc={merchantOA.oa.coverUrl}
        className="modal-oa-follow"
        unmountOnClose
        actions={[
          {
            text: 'Để sau',
            onClick: () => {
              actions.closeRequestFollowDialog()
            },
          },
          {
            text: 'Quan tâm OA',
            highLight: true,
            close: false,
            onClick: handleFollow,
          },
        ]}
      >
        <div className="absolute translate-y-[-55px]">
          <div className="shadow-[0px_0px_0px_4px] shadow-white rounded-full inline-flex justify-center items-center relative">
            <img src={merchantOA.oa.avatarUrl} className="w-[48px] h-[48px] rounded-full" />
            <IconOAVerified size={18} className="absolute -right-1 -bottom-1" />
          </div>
        </div>
        <Text size="large" className="font-medium mb-2">
          {merchantOA.oa.name}
        </Text>
        <Text className="text-text-secondary">Nhận thông tin ưu đãi, khuyến mãi và quà tặng của bạn</Text>
      </Modal>
    </Portal>
  )
}
