import ClientOnly from '@/app/components/ClientOnly'
import React from 'react'
import MainLayout from './MainLayoutClient'

function Component({ children }: { children?: React.ReactNode }) {
  return (
    <ClientOnly>
      <MainLayout>
        {children}
      </MainLayout>
    </ClientOnly>
  )
}

export default Component