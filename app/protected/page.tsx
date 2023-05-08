"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();

  const { data, status } = useSession()

  console.log({ data, status, router })
  if(data){
    return (
      <div>Signed in with {data.user?.email}</div>
    )
  }

  return (
    <div>You are not Signed in</div>
  )
}

export default page