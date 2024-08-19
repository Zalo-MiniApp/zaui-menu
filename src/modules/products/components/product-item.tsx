import React, { useState } from 'react'
import { Button, Checkbox, Icon, List, Sheet, Text } from 'zmp-ui'

import { Portal } from '@/components/portal'
import { useToggle } from '@/hooks/use-toggle'
import { useMerchantEnableOrder } from '@/modules/merchants/use-merchant'
import { useCart } from '@/modules/orders/use-cart'
import { clsx } from '@/utils/clsx'
import { formatMoney } from '@/utils/format'

import { Product, Topping } from '../use-menu'

type Props = {
  item: Product
  onAddSuccess?: () => void
}

export function ProductItem({ item, onAddSuccess }: Props) {
  const actions = useCart((state) => state.actions)

  const enableOrder = useMerchantEnableOrder()

  const [openOptions, togglerOption] = useToggle(false)
  const [openDetail, togglerDetail] = useToggle(false)
  const itemCount = useCart((state) =>
    Object.values(state.items)
      .filter((i) => i.id.startsWith(String(item.id)))
      .reduce((acc, item) => acc + item.quantity, 0),
  )

  function addToCart(toppings?: Topping[]) {
    actions.add({ product: item, toppings })
    onAddSuccess?.()
  }

  function handleClickDetail() {
    togglerDetail.on()
  }

  function handleClickAdd() {
    if (item.toppings && item.toppings.length > 0) {
      togglerOption.on()
    } else {
      addToCart()
    }
  }

  return (
    <>
      <div
        className="relative border border-solid border-[#DCDFE5] rounded-lg overflow-hidden"
        onClick={handleClickDetail}
      >
        <div className="aspect-w-16 aspect-h-12">
          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-center object-cover" />
        </div>
        <div className="p-3 flex flex-col gap-2">
          <div className="line-clamp-2 h-[42px] font-bold">{item.name}</div>
          <div className="flex items-center justify-between">
            <span className="text-primary shrink-0">
              <Text size="small">{formatMoney(item.price)}</Text>
            </span>
            {enableOrder && (
              <Button
                className="shrink-0 relative after:content-[''] after:absolute after:-inset-2 after:bg-transparent"
                icon={<Icon icon="zi-plus" />}
                size="small"
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClickAdd()
                }}
              />
            )}
          </div>
        </div>
        {itemCount > 0 && (
          <div className="absolute right-3 top-3 bg-white w-[28px] h-[28px] border border-solid border-black/20 rounded-full flex items-center justify-center">
            <span className="font-bold">{itemCount}</span>
          </div>
        )}
      </div>
      <Portal>
        <Sheet autoHeight visible={openDetail} onClose={togglerDetail.off} unmountOnClose>
          <DetailSheetContent
            enableOrder={enableOrder}
            item={item}
            onClose={togglerDetail.off}
            onAdd={() => {
              togglerDetail.off()
              handleClickAdd()
            }}
          />
        </Sheet>
        <Sheet autoHeight visible={openOptions} onClose={togglerOption.off} unmountOnClose>
          <OptionsSheetContent
            item={item}
            onClose={togglerOption.off}
            onAdd={(toppings) => {
              togglerOption.off()
              addToCart(toppings)
            }}
          />
        </Sheet>
      </Portal>
    </>
  )
}

function DetailSheetContent({
  item,
  onClose,
  onAdd,
  enableOrder,
}: {
  item: Product
  onClose: () => void
  onAdd?: () => void
  enableOrder: boolean
}) {
  return (
    <div className="max-h-[80vh] overflow-auto primary-scrollbar">
      <div className="h-full">
        <div className="p-3 pb-4">
          <div className="aspect-w-16 aspect-h-12">
            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-center object-cover rounded-lg" />
          </div>
        </div>
        <div className="px-4 flex gap-4">
          <div className="flex-grow">
            <Text size="xLarge" className="font-medium">
              {item.name}
            </Text>
          </div>
          <div className="shrink-1">
            <Text size="xLarge" className="font-medium text-primary">
              {formatMoney(item.price)}
            </Text>
          </div>
        </div>
        <div className="mt-4" />
        <div className="px-4">
          <Text size="normal" className="text-text-secondary whitespace-break-spaces">
            {item.description}
          </Text>
        </div>
        {item.toppings && item.toppings?.length > 0 && !enableOrder && (
          <div className="mt-4">
            <List divider noSpacing>
              <List.Item>
                <Text size="small" className="text-text-subtle">
                  Tùy chọn
                </Text>
              </List.Item>
              {item.toppings?.map((topping) => (
                <List.Item key={topping.id}>
                  <Text size="large">
                    <span>{topping.name}</span>
                    <span className={clsx(['inline ml-1', topping.price > 0 && 'text-primary'])}>
                      (+{formatMoney(topping.price)})
                    </span>
                  </Text>
                </List.Item>
              ))}
            </List>
          </div>
        )}
      </div>
      <div className="flex gap-4 p-4 sticky bottom-0 bg-background">
        <Button
          fullWidth={!enableOrder}
          variant={enableOrder ? 'secondary' : 'primary'}
          type="neutral"
          onClick={onClose}
        >
          Đóng
        </Button>
        {enableOrder && (
          <Button className="flex-grow" variant="primary" onClick={onAdd}>
            Thêm vào giỏ hàng
          </Button>
        )}
      </div>
    </div>
  )
}

function OptionsSheetContent({
  item,
  onClose,
  onAdd,
}: {
  item: Product
  onClose: () => void
  onAdd: (toppings?: Topping[]) => void
}) {
  const [selected, setSelected] = useState(new Map<Topping['id'], Topping>())

  function handleClickAddToCart() {
    onAdd(Array.from(selected.values()))
  }

  return (
    <div className="max-h-[80vh] overflow-auto">
      <div className="h-full">
        <div className="p-4">
          <Text size="xLarge" className="font-medium">
            {item.name}
          </Text>
          <Text size="normal" className="text-text-subtle">
            Tùy chọn
          </Text>
        </div>
        <div className="h-[1px] bg-divider mx-4" />
        <div>
          <List divider noSpacing>
            {item.toppings?.map((topping) => (
              <List.Item
                key={topping.id}
                onClick={() => {
                  const checked = !selected.has(topping.id)
                  if (checked) {
                    setSelected((prev) => new Map(prev).set(topping.id, topping))
                  } else {
                    const copy = new Map(selected)
                    copy.delete(topping.id)
                    setSelected(copy)
                  }
                }}
                prefix={
                  <Checkbox
                    value={topping.id}
                    checked={selected.has(topping.id)}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e: any) => {
                      if (e.target.checked) {
                        setSelected((prev) => new Map(prev).set(topping.id, topping))
                      } else {
                        const copy = new Map(selected)
                        copy.delete(topping.id)
                        setSelected(copy)
                      }
                    }}
                  />
                }
              >
                <Text size="large">
                  <span>{topping.name}</span>
                  <span className={clsx(['inline ml-1', topping.price > 0 && 'text-primary'])}>
                    (+{formatMoney(topping.price)})
                  </span>
                </Text>
              </List.Item>
            ))}
          </List>
        </div>
      </div>
      <div className="flex p-4 gap-4 sticky bottom-0">
        <Button variant="secondary" type="neutral" onClick={onClose}>
          Đóng
        </Button>
        <Button className="flex-grow" variant="primary" onClick={handleClickAddToCart}>
          Thêm vào giỏ hàng
        </Button>
      </div>
    </div>
  )
}
