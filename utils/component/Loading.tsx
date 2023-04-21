"use client"
import React from "react";
import { Box, CircularProgress } from "@mui/material";
// import loadingSVG from "@/assets/images/loading.svg";

const LoadingComponent = ({ isModal = false, height = "100vh" }) => {
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
      {/* <img src={loadingSVG} width="20%" /> */}
      <CircularProgress color={isModal ? "secondary" : "primary"} size={40} />
    </Box>
  );
};

export default LoadingComponent;
