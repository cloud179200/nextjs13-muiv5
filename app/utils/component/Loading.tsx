"use client"
import React from "react";
import { Box, CircularProgress } from "@mui/material";
import loadingSVG from "@/public/images/loading.svg";
import { NEXT_AUTH_STATUS } from '@/app/config/constant';
import { useSession } from "next-auth/react";

const LoadingComponent = ({ isModal = false, height = "100vh" }) => {
  const { status } = useSession()
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: isModal ? "30vh" : height,
      }}
    >
      {status === NEXT_AUTH_STATUS.AUTHENTICATED ? (
        <img src={loadingSVG} width="" height="auto" alt="loading" />
        // <CircularProgress color={isModal ? "secondary" : "primary"} size={40} />
      ) : (
        <img src={loadingSVG} width="" height="auto" alt="loading" />
      )}
    </Box>
  );
};

export default LoadingComponent;
