import React from 'react'

export function MerchantAvatar({ avatarUrl }: { avatarUrl: string }) {
  return (
    <div className="p-1 bg-white rounded-full inline-flex justify-center items-center">
      <img src={avatarUrl} className="w-[82px] h-[82px] rounded-full" />
    </div>
  )
}
