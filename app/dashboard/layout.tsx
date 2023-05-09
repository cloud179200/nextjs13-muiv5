"use client"
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { NEXT_AUTH_STATUS } from '@/config/constant';
import MainLayout from '@/layout/MainLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { status } = useSession()

  useEffect(() => {
    if (![NEXT_AUTH_STATUS.LOADING, NEXT_AUTH_STATUS.AUTHENTICATED].includes(status)) {
      router.replace("/")
    }
  }, [status])

  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}
