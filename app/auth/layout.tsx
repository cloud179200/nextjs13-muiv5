"use client"
import React from 'react'
import MinimalLayout from '@/components/layout/MinimalLayout';

export default function Layout({ children }: { children?: React.ReactNode }) {

  return (
    <>
      <MinimalLayout>
        {children}
      </MinimalLayout>
    </>
  );
}
