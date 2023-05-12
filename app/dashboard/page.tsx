"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import LoadingComponent from '@/utils/component/Loading'
import { NEXT_AUTH_STATUS } from '@/config/constant'
import CustomBox from '@/components/custom-box/CustomBox'

const page = () => {

  const { data, status } = useSession()

  const render = () => {
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

  return <CustomBox>
    {render()}
  </CustomBox>
}

export default page