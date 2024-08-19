import React from 'react'
import { Page } from 'zmp-ui'

import { PageContainer } from '@/components'
import { MerchantLayout, MerchantPage, MerchantTabs } from '@/modules/merchants/components'

export default function MerchantInfoPage() {
  return (
    <MerchantLayout>
      <Page restoreScroll className="bg-background">
        <PageContainer withBottomNav noInsetTop>
          <MerchantPage />
        </PageContainer>
      </Page>
      <MerchantTabs activeTab="info" />
    </MerchantLayout>
  )
}
