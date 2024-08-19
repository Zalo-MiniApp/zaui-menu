import React, { useState } from 'react'
import { Button, Input, Sheet, Text } from 'zmp-ui'

import { Portal } from '@/components/portal'

import { useCart } from '../use-cart'

type Props = {
  open: boolean
  onClose: () => void
  itemId: string
}

export function EditNoteSheet(props: Props) {
  const { open, onClose } = props
  return (
    <Portal>
      <Sheet autoHeight visible={open} onClose={onClose} unmountOnClose>
        <EditNoteForm {...props} />
      </Sheet>
    </Portal>
  )
}

function EditNoteForm({ itemId, onClose }: Props) {
  const { items, actions } = useCart()
  const item = items[itemId]
  const [note, setNote] = useState(item?.note || '')

  function handleUpdateNote() {
    actions.updateNote(itemId, note)
    onClose()
  }

  if (!item) return null

  return (
    <div>
      <div className="px-4 pt-4 flex flex-col gap-4">
        <Text size="xLarge" className="font-medium">
          {item.product.name}
        </Text>
        <Input.TextArea
          label="Ghi chú"
          placeholder="Thêm ghi chú"
          maxLength={40}
          showCount
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <div className="flex gap-4 p-4">
        <Button variant="secondary" type="neutral" onClick={onClose}>
          Đóng
        </Button>
        <Button className="flex-grow" variant="primary" onClick={handleUpdateNote}>
          Lưu ghi chú
        </Button>
      </div>
    </div>
  )
}
