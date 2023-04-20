"use client"
import React from "react";
const { Box, CircularProgress } = require("@mui/material");
import loadingSVG from "../../assets/images/loading.svg";

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
      <CircularProgress color={isModal ? "secondary" : "primary"} size={40} />
    </Box>
  );
};

export default LoadingComponent;
