/* eslint-disable react/display-name */
import React, { forwardRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

import Link from "next/link";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";

// project imports
import {
  MENU_OPEN,
  SET_MENU,
} from "../../../../../redux/customization/actions";

// assets
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Animate from "../../../../../components/extended/AnimateButton";
import { IListMenuChildren } from "@/config/menu-items";
import { useAppDispatch, useAppSelector } from "@/redux";

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //
interface IProps {
  item: IListMenuChildren,
  level: number,
  children?: React.ReactNode
}

const NavItem = ({ item, level }: IProps) => {
  const [itemTarget, setItemTarget] = useState("_self");
  const [listItemProps, setListItemProps] = useState<ListItemButtonProps>({
    LinkComponent: forwardRef((props, ref: React.Ref<HTMLAnchorElement>) => (
      <Link ref={ref} {...props} href={item.url} target={itemTarget} />
    )),
  });
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const customization = useAppSelector((state) => state.customization);
  const matchesSM = useMediaQuery(theme.breakpoints.down("lg"));

  const itemIcon = item?.icon ? (
    <item.icon stroke={"currentColor"} strokeWidth={"1.5"} size="1.3rem" />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width:
          customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        height:
          customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
      }}
      fontSize={level > 0 ? "inherit" : "medium"}
    />
  );

  if (item?.target) {
    setItemTarget("_blank");
  }

  if (item?.external) {
    setListItemProps({
      LinkComponent: forwardRef((props, ref: React.Ref<HTMLAnchorElement>) => (
        <Link ref={ref} {...props} href={item.url} target={itemTarget} />
      ))
    });
  }

  const itemHandler = (id: string) => {
    dispatch({ type: MENU_OPEN, id });
    if (matchesSM) dispatch({ type: SET_MENU, opened: false });
  };

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split("/")
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch({ type: MENU_OPEN, id: item.id });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: `${customization.borderRadius}px`,
        mb: 0.5,
        alignItems: "flex-start",
        backgroundColor: level > 1 ? "transparent !important" : "inherit",
        py: level > 1 ? 1.25 : 1.5,
        pl: `${level * 24}px`,
      }}
      selected={
        customization.isOpen.findIndex((id) => id === item.id) > -1 ||
        document.location.pathname === item.url
      }
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon sx={{ my: "auto", minWidth: !item?.icon ? 18 : 36 }}>
        {itemIcon}
      </ListItemIcon>
      <Animate type="slide">
        <ListItemText
          primary={
            <Typography
              variant={
                customization.isOpen.findIndex((id) => id === item.id) > -1
                  ? "h5"
                  : "body1"
              }
              color="inherit"
            >
              {item.title}
            </Typography>
          }
          secondary={
            item.caption && (
              <Typography
                variant="caption"
                sx={{ ...theme.typography.subMenuCaption }}
                display="block"
                gutterBottom
              >
                {item.caption}
              </Typography>
            )
          }
        />
      </Animate>

      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
};

export default NavItem;
