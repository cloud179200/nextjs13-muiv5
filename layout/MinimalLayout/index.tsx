import { Box } from "@mui/material";
import React from "react";
interface IProps{
  children?: React.ReactNode
}
const MinimalLayout = (props: IProps) => (
  <>
    <Box
      sx={{
        background: `background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);`,
      }}
    >
      {props.children}
    </Box>
  </>
);

export default MinimalLayout;
