"use client"
import React from "react";
import { Box, Button } from "@mui/material";
import NotFoundPNG from "@/public/images/404.png";
import SearchSVG from "@/public/images/search.svg";
import Link from "next/link";
import MinimalLayout from "@/app/components/layout/MinimalLayout/MinimalLayoutClient";

const NotFoundComponent = () => {
  return (
    <MinimalLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <img src={SearchSVG.src} width="100" alt="img"/>
          <img src={NotFoundPNG.src} width="300" alt="img"/>
        </Box>
        <Button
          disableElevation
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="secondary"
          LinkComponent={Link}
          href="/"
        >
          Trở Về Trang Chủ
        </Button>
      </Box>
    </MinimalLayout>
  );
};

export default NotFoundComponent;
