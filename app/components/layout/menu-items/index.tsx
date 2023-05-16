import * as icons from "react-icons/tb";
import { NAME_TRANS_VN } from "@/app/config/constant";
import { IconType } from "react-icons";

export interface IListMenu {
  id: string;
  title: string;
  type: string;
  icon?: IconType;
  caption?: string;
  children?: IListMenuChildren[];
}
export interface IListMenuChildren {
  id: string;
  title: string;
  type: string;
  url: string;
  icon?: IconType;
  breadcrumbs: boolean;
  external?: boolean;
  target?:boolean,
  disabled?: boolean;
  caption?: string;
  chip?: any
}
const listMenuItems: IListMenu = {
  id: "dashboard",
  title: "",
  type: "group",
  children: [
    {
      id: NAME_TRANS_VN.HOME,
      title: NAME_TRANS_VN.HOME,
      type: "item",
      url: "/dashboard",
      icon: icons.TbDashboard,
      breadcrumbs: false,
    },
    {
      id: NAME_TRANS_VN.CLASS,
      title: NAME_TRANS_VN.CLASS,
      type: "item",
      url: "/class",
      icon: icons.TbChalkboard,
      breadcrumbs: false,
    },
    {
      id: NAME_TRANS_VN.TRANSACTION_HISTORY,
      title: NAME_TRANS_VN.TRANSACTION_HISTORY,
      type: "item",
      url: "/transaction/history",
      icon: icons.TbHistory,
      breadcrumbs: false,
    },
  ],
};
export const menuItems = {
  items: [listMenuItems],
};

const listMenuItemsAdmin: IListMenu = {
  id: "dashboard",
  title: "",
  type: "group",
  children: [
    {
      id: NAME_TRANS_VN.HOME,
      title: NAME_TRANS_VN.HOME,
      type: "item",
      url: "/dashboard",
      icon: icons.TbDashboard,
      breadcrumbs: false,
    },
    {
      id: NAME_TRANS_VN.CLASS,
      title: NAME_TRANS_VN.CLASS,
      type: "item",
      url: "/class",
      icon: icons.TbChalkboard,
      breadcrumbs: false,
    },
    {
      id: NAME_TRANS_VN.TEACHER,
      title: NAME_TRANS_VN.TEACHER,
      type: "item",
      url: "/teacher",
      icon: icons.TbUser,
      breadcrumbs: false,
    },
    {
      id: NAME_TRANS_VN.STUDENT,
      title: NAME_TRANS_VN.STUDENT,
      type: "item",
      url: "/student",
      icon: icons.TbUser,
      breadcrumbs: false,
    },
    {
      id: NAME_TRANS_VN.TRANSACTION_HISTORY,
      title: NAME_TRANS_VN.TRANSACTION_HISTORY,
      type: "item",
      url: "/transaction/history",
      icon: icons.TbHistory,
      breadcrumbs: false,
    },
    {
      id: NAME_TRANS_VN.LANDING_PAGE,
      title: NAME_TRANS_VN.LANDING_PAGE,
      type: "item",
      url: "/landing/manage",
      icon: icons.TbAd,
      breadcrumbs: false,
    },
  ],
};

export const menuItemsAdmin = {
  items: [listMenuItemsAdmin],
};
