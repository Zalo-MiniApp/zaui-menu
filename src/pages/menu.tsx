import React from 'react'
import { Page } from 'zmp-ui'

import { PageContainer } from '@/components'
import { MerchantLayout, MerchantMenuPage, MerchantTabs } from '@/modules/merchants/components'

export default function MerchantRootPage() {
  return (
    <MerchantLayout>
      <Page restoreScroll>
        <PageContainer withBottomNav>
          <MerchantMenuPage />
        </PageContainer>
      </Page>
      <MerchantTabs activeTab="menu" />
    </MerchantLayout>
  )
}
