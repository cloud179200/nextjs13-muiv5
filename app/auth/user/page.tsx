"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useSession()
  console.log({ data })
  return (
    <div>page</div>
  )
}

export default page