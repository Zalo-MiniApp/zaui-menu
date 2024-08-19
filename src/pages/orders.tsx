import React from 'react'
import { Page } from 'zmp-ui'

import { PageContainer } from '@/components'
import { MerchantLayout, MerchantTabs } from '@/modules/merchants/components'
import { OrdersPage } from '@/modules/orders/components'

export default function MerchantOrdersPage() {
  return (
    <MerchantLayout>
      <Page restoreScroll>
        <PageContainer withBottomNav>
          <OrdersPage />
        </PageContainer>
      </Page>
      <MerchantTabs activeTab="orders" />
    </MerchantLayout>
  )
}
