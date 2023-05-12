import React from "react";
import { Box, Button } from "@mui/material";
import NotFoundPNG from "@/assets/images/404.png";
import SearchSVG from "@/assets/images/search.svg";
import Link from "next/link";
import Image from "next/image";
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
          <Image src={SearchSVG} width="100" alt="img"/>
          <Image src={NotFoundPNG} width="300" alt="img"/>
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
