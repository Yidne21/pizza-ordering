"use client";

import React from "react";
import {
  UsersIcon,
  RolesIcon,
  OrderIcon,
  AddMenuIcon,
} from "@/components/ui/icons";
import { Subjects, Actions } from "./permissionSetting";

type AdminLink = {
  title: string;
  path: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  id: string;
  subject: string;
  action: string;
};

export const sideBarMenu: AdminLink[] = [
  {
    title: "Orders",
    path: "/dashboard/orders",
    icon: OrderIcon,
    id: "orders ",
    subject: Subjects.orders,
    action: Actions.read,
  },
  {
    title: "Add menu",
    path: "/dashboard/add-menu",
    icon: AddMenuIcon,
    id: "add-menu",
    subject: Subjects.menu,
    action: Actions.create,
  },
  {
    title: "Roles",
    path: "/dashboard/roles",
    icon: RolesIcon,
    id: "roles",
    subject: Subjects.roles,
    action: Actions.read,
  },

  {
    title: "Users",
    path: "/dashboard/users",
    icon: UsersIcon,
    id: "users",
    subject: Subjects.users,
    action: Actions.read,
  },
];
