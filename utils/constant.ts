"use client";

import React from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";

type AdminLink = {
  title: string;
  path: string;
  icon: React.ElementType;
  id: string;
  disable: boolean;
};

export const sideBarMenu: AdminLink[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: DashboardOutlinedIcon,
    id: "dashboard",
    disable: false,
  },
  {
    title: "Books",
    path: "/dashboard/books",
    icon: BookmarksOutlinedIcon,
    id: "books",
    disable: false,
  },
  {
    title: "Owners",
    path: "/dashboard/owners",
    icon: PersonOutlineOutlinedIcon,
    id: "owners",
    disable: false,
  },
];
