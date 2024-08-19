import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import React, { useRef, useState } from 'react'
import { useResizeObserver } from 'usehooks-ts'
import { Button, Icon, Modal, Text } from 'zmp-ui'

import { Portal } from '@/components'
import { IconMinus, IconPostNotif } from '@/components/icons'
import plateImage from '@/static/images/plate.svg'
import { clsx } from '@/utils/clsx'
import { formatMoney } from '@/utils/format'

import { CartItem, useCart } from '../use-cart'
import { useOrdersTab } from '../use-orders-tab'
import { EditNoteSheet } from './edit-note-sheet'

export function CartList() {
  const { items, actions } = useCart()

  const [editNoteId, setEditNoteId] = useState('')
  const [openEdit, setOpenEdit] = useState(false)
  const [deleteId, setDeleteId] = useState('')

  const itemsCount = Object.keys(items).length

  return (
    <>
      {itemsCount === 0 && <Empty />}
      {itemsCount > 0 && (
        <div className="px-3 py-4">
          <Text size="xSmall" className="mb-4 text-text-secondary flex space-x-1 items-center">
            <span>Nhấn vào </span>
            <IconPostNotif size={17} className="text-primary" />
            <span> để ghi chú cho món ăn</span>
          </Text>
          <div className="flex flex-col space-y-2">
            {Object.values(items)
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((item) => (
                <Item
                  key={item.id}
                  item={item}
                  onIncrease={() => {
                    actions.increase(item.id)
                  }}
                  onDecrease={() => {
                    actions.decrease(item.id)
                  }}
                  onRemove={() => {
                    setDeleteId(item.id)
                  }}
                  onUpdateNote={() => {
                    setEditNoteId(item.id)
                    setOpenEdit(true)
                  }}
                />
              ))}
          </div>
        </div>
      )}
      <EditNoteSheet open={openEdit} onClose={() => setOpenEdit(false)} itemId={editNoteId} />
      <Portal>
        <Modal
          className="zaui-modal-title-left"
          visible={!!deleteId}
          title="Xóa món đang chọn"
          unmountOnClose
          onClose={() => {
            setDeleteId('')
          }}
          children={<Text className="text-text-subtle">Bạn có chắc muốn xóa món ăn này ra khỏi danh sách?</Text>}
          actions={[
            {
              text: 'Quay lại',
              close: true,
            },
            {
              text: 'Xóa',
              danger: true,
              onClick: () => {
                actions.remove(deleteId)
                setDeleteId('')
              },
            },
          ]}
        />
      </Portal>
    </>
  )
}

type ItemProps = {
  item: CartItem
  onIncrease: () => void
  onDecrease: () => void
  onRemove: () => void
  onUpdateNote?: () => void
}

function Item({ item, onIncrease, onDecrease, onRemove, onUpdateNote }: ItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { width } = useResizeObserver({ ref, box: 'border-box' })
  const [{ x }, api] = useSpring(() => ({ x: 0 }))
  const bind = useDrag(
    ({ last, offset: [ox] }) => {
      if (last) {
        const deleteOffset = (width || 0) + 12
        if (ox < -deleteOffset) {
          api.start({ x: -deleteOffset })
        } else {
          api.start({ x: 0 })
        }
      } else {
        api.start({ x: Math.min(ox, 0), immediate: true })
      }
    },
    {
      from: () => [x.get(), 0],
      axis: 'x',
      bounds: { left: -100, right: 0, top: 0, bottom: 0 },
      rubberband: true,
      preventScroll: true,
    },
  )
  return (
    <div className="relative">
      <div
        ref={ref}
        className={clsx([
          'absolute right-[1px] top-[1px] bottom-[1px] p-4 rounded-lg flex justify-center items-center',
          'text-white font-medium bg-primary',
        ])}
        onClick={onRemove}
      >
        Xóa
      </div>
      <animated.div
        {...bind()}
        style={{ x }}
        className="flex flex-col bg-background rounded-lg px-3 pt-4 pb-2 gap-3 relative"
      >
        <div className="flex">
          <div className="shrink">
            <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg" />
          </div>
          <div className="grow flex flex-col gap-2 ml-3">
            <div className="line-clamp-1 font-medium">
              <Text size="large">{item.product.name}</Text>
            </div>
            {item.toppings && item.toppings.length > 0 && (
              <div className="text-text-secondary">
                <Text>{item.toppings?.map((_) => _.name).join(', ')}</Text>
              </div>
            )}
            <div
              className="flex text-text-secondary space-x-1"
              onClick={(e) => {
                e.stopPropagation()
                onUpdateNote?.()
              }}
            >
              <span className="shrink-0 pt-[2px]">
                <IconPostNotif size={18} className="text-primary" />
              </span>
              <Text>{item.note ? item.note : 'Thêm ghi chú'}</Text>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <Text className="text-text-secondary inline">Tổng tiền: </Text>
            <span className="text-primary">{formatMoney(item.total)}</span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              className="w-7 h-7"
              size="small"
              variant="secondary"
              type="neutral"
              icon={<IconMinus size={16} />}
              onClick={(e) => {
                e.stopPropagation()
                if (item.quantity === 1) {
                  onRemove()
                } else {
                  onDecrease()
                }
              }}
            />
            <Text className="min-w-5 text-center">{item.quantity}</Text>
            <Button
              className="w-7 h-7"
              size="small"
              variant="secondary"
              type="neutral"
              icon={<Icon icon="zi-plus" size={16} />}
              onClick={(e) => {
                e.stopPropagation()
                onIncrease()
              }}
            />
          </div>
        </div>
      </animated.div>
    </div>
  )
}

function Empty() {
  const [, setTab] = useOrdersTab()
  return (
    <div className="flex flex-col pt-[148px] px-[72px] gap-4 justify-center items-center">
      <div>
        <img src={plateImage} className="h-[60px]" />
      </div>
      <Text className="text-text-secondary">Danh sách món đang chọn trống</Text>
      <Button variant="primary" size="small" className="rounded-lg" onClick={() => setTab('orders')}>
        Xem danh sách món đã gọi
      </Button>
    </div>
  )
}
