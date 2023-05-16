"use client"
import React, { useEffect } from "react";
import { styled, useTheme, Theme } from "@mui/material/styles";
import {
  AppBar,
  Backdrop,
  Box,
  CircularProgress,
  CssBaseline,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Customization from "../Customization";
import { drawerWidth } from "@/app/config/constant";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { customizationActions, customizationActionsName } from "@/app/redux/customization/slice";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }: { theme: Theme, open: boolean }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up("md")]: {
        marginLeft: -(drawerWidth - 20),
        width: `calc(100% - ${drawerWidth}px)`,
      },
      [theme.breakpoints.down("md")]: {
        marginLeft: "20px",
        width: `calc(100% - ${drawerWidth}px)`,
        padding: "16px",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "10px",
        width: `calc(100% - ${drawerWidth}px)`,
        padding: "16px",
        marginRight: "10px",
      },
    }),
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      width: `calc(100% - ${drawerWidth}px)`,
      [theme.breakpoints.down("md")]: {
        marginLeft: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "10px",
      },
    }),
  })
);

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = (props: { children?: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const loadingCommon = useAppSelector((state) => state.common.loading);
  const theme: any = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));

  // Handle left drawer
  const leftDrawerOpened = useAppSelector((state) => state.customization.opened);
  const handleLeftDrawerToggle = () => {
    dispatch(customizationActions[customizationActionsName.SET_MENU]({
      opened: !leftDrawerOpened
    }))
  };

  useEffect(() => {
    dispatch(customizationActions[customizationActionsName.SET_MENU]({
      opened: !matchDownMd
    }))
  }, [matchDownMd]);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened
            ? theme.transitions.create("width")
            : "none",
          minHeight: "88px",
        }}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      {/* drawer */}
      <Sidebar
        drawerOpen={leftDrawerOpened}
        drawerToggle={handleLeftDrawerToggle}
      />

      {/* main content */}
      <Main
        theme={theme}
        open={leftDrawerOpened}
        style={{
          marginLeft: leftDrawerOpened ? "20px" : "",
          overflow: "auto",
        }}
      >
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={Boolean(loadingCommon)}
        >
          <CircularProgress color="secondary" size={80} />
        </Backdrop>
        {props.children}
      </Main>
      <Customization />
    </Box>
  );
};

export default MainLayout;
