"use client";
import { Button, Grid, Stack } from "@mui/material";
import Link from "next/link";
export default function Home() {
  return (
    <Grid container height="100vh" alignItems="center" justifyContent="center" direction="column">
      <h1>Using Material UI with Next.js 13</h1>
      <Stack direction="row" columnGap={1}>
        <Button variant="contained" LinkComponent={Link} href="/auth/login">Login</Button>
        <Button variant="outlined" LinkComponent={Link} href="/auth/register">Register</Button>
      </Stack>
    </Grid>
  );
}