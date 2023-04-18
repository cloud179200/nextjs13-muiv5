import { TypographyOptions } from "@mui/material/styles/createTypography";

declare module '@mui/material/styles/createTypography' {
  interface Typography {    
    [key: string]: TypographyStyleOptions
  }
}