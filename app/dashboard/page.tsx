"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { NEXT_AUTH_STATUS } from '@/app/config/constant'
import CustomBox from '@/app/components/custom-box/CustomBox'
import LoadingComponent from '@/app/utils/component/Loading'

const page = () => {

  const { data, status } = useSession()

  const render = () => {

    if (NEXT_AUTH_STATUS.AUTHENTICATED === status) {
      return (
        <>
          <div>Signed in with {data?.user?.email} </div>
        </>
      )
    }

    return (
      <>
        <LoadingComponent />
      </>
    )
  }

  return <CustomBox>
    {render()}
    <LoadingComponent />
  </CustomBox>
}

export default page