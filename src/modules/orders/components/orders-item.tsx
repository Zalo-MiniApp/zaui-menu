import React from 'react'
import { Text } from 'zmp-ui'

import { IconPostNotif } from '@/components/icons'
import { clsx } from '@/utils/clsx'
import { formatMoney, formatTime } from '@/utils/format'

import { Order } from '../use-orders'

export function OrdersItem({ num, order, mutedPrice }: { num: number; order: Order; mutedPrice?: boolean }) {
  return (
    <div className="bg-background p-4">
      <div>
        <Text size="large" className="font-medium">
          Order lần {num} - {formatTime(order.createdAt, 'HH:mm')}
        </Text>
      </div>
      <div className="h-[1px] bg-divider my-4" />
      {order.items.map((item, index) => (
        <div key={item.id}>
          {index !== 0 && <div className="h-[1px] bg-divider my-4" />}
          <div className="flex gap-3">
            <div className="shrink space-y-2">
              <img src={item.product.imageUrl} alt={item.product.name} className="w-10 h-10 object-cover rounded-lg" />
              <Text className="text-center">x{item.quantity}</Text>
            </div>
            <div className="flex flex-col grow gap-2">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <Text size="large" className="font-medium">
                    {item.product.name}
                  </Text>
                </div>
                <Text size="small" className={clsx(mutedPrice ? 'text-text-secondary' : 'text-primary')}>
                  {formatMoney(item.itemPrice)}
                </Text>
              </div>
              {item.toppings && (
                <div className="text-text-secondary">
                  <Text>{item.toppings?.map((_) => _.name).join(', ')}</Text>
                </div>
              )}
              {item.note && (
                <div className="flex text-text-secondary space-x-1">
                  <span className="shrink-0 pt-[2px]">
                    <IconPostNotif size={18} />
                  </span>
                  <Text>{item.note}</Text>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
