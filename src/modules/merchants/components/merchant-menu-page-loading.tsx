import React from 'react'

export function MerchantMenuPageLoading() {
  return (
    <div className="fixed top-0 left-0 right-0 overflow-hidden">
      <div className="bg-background inset-top">
        <div className="h-[44px] px-4 py-3 flex items-center">
          <div className="bg-[#EBEDEF] h-[24px] w-[208px] rounded-lg" />
        </div>
      </div>
      <div className="bg-background pb-4">
        <div className="p-2 flex gap-2 overflow-hidden hide-scrollbar border-0 border-b border-solid border-border">
          <div className="shrink-0 bg-[#EBEDEF] h-[32px] w-[80px] rounded-full" />
          <div className="shrink-0 bg-[#F7F7F8] h-[32px] w-[100px] rounded-full" />
          <div className="shrink-0 bg-[#F7F7F8] h-[32px] w-[86px] rounded-full" />
          <div className="shrink-0 bg-[#F7F7F8] h-[32px] w-[96px] rounded-full" />
        </div>
        <div className="px-4 flex flex-col gap-3 mt-4">
          <div className="bg-[#EBEDEF] h-[24px] w-[108px] rounded-lg" />
          <div className="flex gap-3">
            <div className="bg-[#F7F7F8] h-[224px] w-full rounded-md" />
            <div className="bg-[#F7F7F8] h-[224px] w-full rounded-md" />
          </div>
          <div className="bg-[#EBEDEF] h-[24px] w-[108px] rounded-lg" />
          <div className="flex gap-3">
            <div className="bg-[#F7F7F8] h-[224px] w-full rounded-md" />
            <div className="bg-[#F7F7F8] h-[224px] w-full rounded-md" />
          </div>
          <div className="bg-[#EBEDEF] h-[24px] w-[108px] rounded-lg" />
          <div className="flex gap-3">
            <div className="bg-[#F7F7F8] h-[224px] w-full rounded-md" />
            <div className="bg-[#F7F7F8] h-[224px] w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
