"use client";

import React from "react";
import {
  UsersIcon,
  RolesIcon,
  OrderIcon,
  AddMenuIcon,
} from "@/components/ui/icons";

type AdminLink = {
  title: string;
  path: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  id: string;
};

export const sideBarMenu: AdminLink[] = [
  {
    title: "Orders",
    path: "/dashboard/orders",
    icon: OrderIcon,
    id: "orders ",
  },
  {
    title: "Add menu",
    path: "/dashboard/add-menu",
    icon: AddMenuIcon,
    id: "add-menu",
  },
  {
    title: "Roles",
    path: "/dashboard/roles",
    icon: RolesIcon,
    id: "roles",
  },

  {
    title: "Users",
    path: "/dashboard/users",
    icon: UsersIcon,
    id: "users",
  },
];
