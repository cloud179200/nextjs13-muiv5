import ClientOnly from '@/app/components/ClientOnly'
import React from 'react'
import MinimalLayout from './MinimalLayoutClient'

function Component({ children }: { children?: React.ReactNode }) {
  return (
    <ClientOnly>
      <MinimalLayout>
        {children}
      </MinimalLayout>
    </ClientOnly>
  )
}

export default Component