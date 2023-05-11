"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import LoadingComponent from '@/utils/component/Loading'
import { NEXT_AUTH_STATUS } from '@/config/constant'

const page = () => {

  const { data, status } = useSession()
  if (NEXT_AUTH_STATUS.LOADING === status) {
    return (
      <LoadingComponent />
    )
  }

  if (NEXT_AUTH_STATUS.AUTHENTICATED === status) {
    return (
      <>
        <div>Signed in with {data?.user?.email} </div>
      </>
    )
  }

  return (
    <div>You are not Signed in</div>
  )
}

export default page