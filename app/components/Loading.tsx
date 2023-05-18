"use client"
import React from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";
import { NEXT_AUTH_STATUS } from '@/app/config/constant';
import { useSession } from "next-auth/react";
import { ProgressBar } from "react-loader-spinner";

const LoadingComponent = ({ isModal = false, height = "100vh" }) => {
  const { status } = useSession()
  const theme = useTheme()
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
        <ProgressBar
          height="auto"
          width="30%"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor={theme.palette.primary.main}
          barColor={theme.palette.secondary.main}
        />
      )}
    </Box>
  );
};

export default LoadingComponent;
