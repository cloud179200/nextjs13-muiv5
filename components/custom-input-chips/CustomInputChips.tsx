import React from "react";
import { MuiChipsInput, MuiChipsInputProps } from "mui-chips-input";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme: any) => ({
  root: {
    "& > .MuiInputBase-root > .MuiInputBase-input": {
      padding: theme.spacing(1.5),
    },
  },
}));

const CustomChipsInput = (props: MuiChipsInputProps) => {
  const classes = useStyles();
  return (
    <>
      <MuiChipsInput {...props} className={classes.root} />
    </>
  );
};

export default CustomChipsInput;
