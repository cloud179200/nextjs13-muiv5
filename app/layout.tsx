"use client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./themes";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <ThemeProvider theme={theme()}>
        <CssBaseline />
        <body>{children}</body>
      </ThemeProvider>
    </html>
  );
}