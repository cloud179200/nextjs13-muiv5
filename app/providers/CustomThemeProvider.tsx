"use client"
import React from 'react'
import theme from "@/app/config/themes";
import { useAppSelector } from '@/app/redux/store';
import { ThemeProvider } from '@mui/material';

function CustomThemeProvider({ children }: { children?: React.ReactNode }) {
  const customization = useAppSelector((state) => state.customization);
  return (
    <>
      <ThemeProvider theme={theme(customization)}>
        {children}
      </ThemeProvider>
    </>
  )
}

export default CustomThemeProvider