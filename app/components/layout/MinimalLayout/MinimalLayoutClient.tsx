import { Box } from "@mui/material";
import React from "react";
import Customization from "../Customization";
import Animate from "@/app/components/extended/Animate";
interface IProps {
  children?: React.ReactNode
}
const MinimalLayout = (props: IProps) => (
  <>
    <Box
      sx={{
        background: `background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);`,
      }}
    >
      <Animate animateWhenInView>
        {props.children}
      </Animate>
      <Customization />
    </Box>
  </>
);

export default MinimalLayout;
