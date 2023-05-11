"use client"
import React from 'react'
import theme from "@/config/themes";
import { useAppSelector } from '@/redux/store';
import { ThemeProvider } from '@mui/material';

function CustomThemeProviders({ children }: { children?: React.ReactNode }) {
  const customization = useAppSelector((state) => state.customization);
  return (
    <>
    <ThemeProvider theme={theme(customization)}>
      {children}
    </ThemeProvider>
    </>
  )
}

export default CustomThemeProviders