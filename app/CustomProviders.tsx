"use client"
import React from 'react'
import { store } from '@/redux/store';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import RouteHandler from './RouteHandler';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import CustomThemeProvider from './CustomThemeProvider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { Toaster } from "react-hot-toast";
import "@/assets/scss/style.scss"

function CustomProviders({ children, session }: { children?: React.ReactNode, session?: Session | null }) {
  return (
    <>
      <SessionProvider session={session} refetchOnWindowFocus>
        <Provider store={store}>
          <RouteHandler>
            <CustomThemeProvider>
              <CssBaseline />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <div><Toaster /></div>
                {children}
              </LocalizationProvider>
            </CustomThemeProvider>
          </RouteHandler>
        </Provider>
      </SessionProvider>
    </>
  )
}

export default CustomProviders