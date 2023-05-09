"use client";
import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../config/themes";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children?: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <Provider store={store}>
        <ThemeProvider theme={theme()}>
          <CssBaseline />
          <SessionProvider refetchOnWindowFocus={false}>
            <body suppressHydrationWarning={true}>
              <div><Toaster /></div>
              {children}
            </body>
          </SessionProvider>
        </ThemeProvider>
      </Provider>
    </html>
  );
}