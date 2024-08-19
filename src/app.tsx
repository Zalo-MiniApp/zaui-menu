import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import { Route } from 'react-router-dom'
import { AnimationRoutes, App, SnackbarProvider, ZMPRouter } from 'zmp-ui'

import { RootProvider } from './components'
import MerchantInfoPage from './pages/info'
import MerchantRootPage from './pages/menu'
import MerchantOrdersPage from './pages/orders'
import MerchantOrdersViewPage from './pages/orders.view'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
})

const MyApp = () => {
  return (
    <App>
      <Suspense>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            <RootProvider>
              <ZMPRouter>
                <AnimationRoutes>
                  <Route path="/" element={<MerchantRootPage />} />
                  <Route path="/orders" element={<MerchantOrdersPage />} />
                  <Route path="/orders/view" element={<MerchantOrdersViewPage />} />
                  <Route path="/info" element={<MerchantInfoPage />} />
                </AnimationRoutes>
              </ZMPRouter>
            </RootProvider>
          </SnackbarProvider>
        </QueryClientProvider>
      </Suspense>
    </App>
  )
}
export default MyApp
