import React from "react";
import { Box } from "@mui/material";
import { useAppSelector } from "@/redux/hooks";

const CustomBox = (props: any) => {
  const customization = useAppSelector((state) => state.customization);

  return (
    <Box
      m={1}
      mb={2}
      p={2}
      sx={{
        backgroundColor: "#fff",
        borderRadius: `${customization.borderRadius}px`,
        boxShadow: 4,
        ...(props?.sx || {}),
      }}
      className={props.className}
    >
      {props.children}
    </Box>
  );
};

export default CustomBox;
