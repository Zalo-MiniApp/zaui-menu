import React from 'react'

export function MerchantCover({ coverUrl }: { coverUrl: string }) {
  return (
    <div className="h-[200px] bg-slate-200 overflow-hidden">
      <img src={coverUrl} className="h-[200px] object-cover object-center w-full" />
    </div>
  )
}
