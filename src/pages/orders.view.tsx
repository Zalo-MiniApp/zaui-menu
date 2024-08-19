import React from 'react'
import { Page } from 'zmp-ui'

import { PageContainer } from '@/components'
import { MerchantLayout } from '@/modules/merchants/components'
import { OrdersViewOnlyPage } from '@/modules/orders/components'

export default function MerchantOrdersViewPage() {
  return (
    <MerchantLayout>
      <Page restoreScroll>
        <PageContainer noInsetTop>
          <OrdersViewOnlyPage />
        </PageContainer>
      </Page>
    </MerchantLayout>
  )
}
