"use client"
import React from "react";
import { Box, Button } from "@mui/material";
import NotFoundPNG from "@/assets/images/404.png";
import SearchSVG from "@/assets/images/search.svg";
import Link from "next/link";
import MinimalLayout from "@/components/layout/MinimalLayout";

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
          <img src={SearchSVG} width="100" alt="img"/>
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
