"use client"
import React from "react";
import { Box, CircularProgress } from "@mui/material";
// import loadingSVG from "@/assets/images/loading.svg";
import { NEXT_AUTH_STATUS } from '@/config/constant';
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
        <CircularProgress color={isModal ? "secondary" : "primary"} size={40} />
      ) : (
        <img src={""} width="100%" height="auto" alt="loading" />
      )}
    </Box>
  );
};

export default LoadingComponent;
