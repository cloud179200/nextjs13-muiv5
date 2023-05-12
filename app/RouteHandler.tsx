"use client"
import React, { useMemo, useEffect } from 'react'
import { useSession } from "next-auth/react";
import { NEXT_AUTH_STATUS } from "@/config/constant";
import { usePathname, useRouter } from "next/navigation";
import { PRIVATE_ROUTE } from '@/config/route';
import toast from 'react-hot-toast';
import { useAppDispatch } from "@/redux/store"
// import { userActions, userActionsName } from '@/redux/user/slice';
interface IProps {
  children?: React.ReactNode
}
function RouteHandler(props: IProps) {
  const router = useRouter()
  const pathname = usePathname();
  const _dispatch = useAppDispatch()
  const { data, status } = useSession()
  const isPrivatePath = useMemo(() =>  PRIVATE_ROUTE.some(item => (pathname || "").startsWith(item.path)) , [pathname])

  useEffect(() => {
    switch (status) {
      case NEXT_AUTH_STATUS.LOADING:
        if (!isPrivatePath) {
          toast.loading("Loading Auth Session...", { id: NEXT_AUTH_STATUS.LOADING });
        }
        break;
      case NEXT_AUTH_STATUS.AUTHENTICATED:
        toast.remove(NEXT_AUTH_STATUS.LOADING)
        if (!isPrivatePath) {
          router.replace("/dashboard")
        }
        // dispatch(userActions[userActionsName.SET_USER_ACTION](data?.user || null))
        toast.success(`Welcome ${data?.user?.email}`, { duration: 3000 })
        break;
      case NEXT_AUTH_STATUS.UNAUTHENTICATED:
        toast.remove(NEXT_AUTH_STATUS.LOADING)
        if (!isPrivatePath) {
          router.replace("/auth/login")
        }
        break;
      default:
        break;
    }
  }, [status, isPrivatePath])

  console.log({pathname})

  return (
    <>
      {props.children}
    </>
  )
}

export default RouteHandler