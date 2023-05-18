"use client";
import Animate from "@/app/components/extended/AnimateButton";
import Link from "next/link";
import { Button, Grid, Stack, useTheme } from "@mui/material";
import { useAppSelector } from "./redux/store";

export default function Home() {
  const theme: any = useTheme()
  const commonLoading = useAppSelector(state => state.common.loadingCommon)
  return (
    <Grid container height="100vh" alignItems="center" justifyContent="center" direction="column">
      <h1>Using Material UI with Next.js 13</h1>
      <Stack direction="row" columnGap={1} marginTop={theme.spacing(2)}>
        <Animate>
          <Button variant="contained" LinkComponent={Link} href="/auth/login" disabled={commonLoading}>Login</Button>
        </Animate>
        <Animate>
          <Button variant="outlined" LinkComponent={Link} href="/auth/register" disabled={commonLoading}>Register</Button>
        </Animate>
      </Stack>
    </Grid>
  );
}