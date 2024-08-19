import React from 'react'

export function MerchantPageLoading() {
  return (
    <div className="fixed left-0 right-0 overflow-hidden">
      <div className="h-[200px] bg-[#EBEDEF] overflow-hidden" />
      <div className="relative translate-y-[-84px] h-[84px] mb-[-84px] flex px-4 items-end">
        <div className="relative flex-shrink-0 translate-y-[42px]">
          <div className="p-1 bg-white rounded-full inline-flex justify-center items-center">
            <div className="bg-[#F7F7F8] w-[82px] h-[82px] rounded-full" />
          </div>
        </div>
        <div className="relative flex-1 flex flex-col gap-2 items-end py-4">
          <div className="bg-[#F4F5F6] text-[#F4F5F6] h-[32px] w-[115px] rounded-full" />
          <div className="bg-[#F4F5F6] text-[#F4F5F6] h-[16px] w-[164px] rounded-lg" />
        </div>
      </div>
      <div className="pt-[52px] px-4 pb-3">
        <div className="flex flex-col gap-2">
          <div className="bg-[#EBEDEF] h-[44px] rounded-md" />
          <div className="bg-[#EBEDEF] h-[16px] rounded-md w-[220px]" />
          <div className="bg-[#EBEDEF] h-[16px] rounded-md w-[150px]" />
          <div className="bg-[#EBEDEF] h-[16px] rounded-md w-[260px]" />
        </div>
      </div>
    </div>
  )
}
