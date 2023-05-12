"use client"
import React from "react";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { store } from "@/redux/store";
import CustomThemeProvider from "./CustomThemeProvider";
import RouteHandler from "./RouteHandler";
import MinimalLayout from "@/components/layout/MinimalLayout";

import "@/assets/scss/style.scss"

function RootLayout({ children }: { children?: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <SessionProvider refetchOnWindowFocus={false}>
        <Provider store={store}>
          <RouteHandler>
            <CustomThemeProvider>
              <CssBaseline />
              <body suppressHydrationWarning={true}>
                <div><Toaster /></div>
                <MinimalLayout>
                {children}
                </MinimalLayout>
              </body>
            </CustomThemeProvider>
          </RouteHandler>
        </Provider>
      </SessionProvider>
    </html>
  );
}

export default RootLayout