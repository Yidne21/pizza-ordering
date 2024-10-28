import React from "react";
import AddMenuForm from "./add-menu-form";
import { Box } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { createAbility } from "@/abilities/abilities";
import { redirect } from "next/navigation";
import { Subjects, Actions } from "@/utils/permissionSetting";

async function AddMenu() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { role } = session.user;

  const ability = createAbility(role.permissions);

  if (!ability.can(Actions.create, Subjects.menu)) {
    redirect("/403");
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <AddMenuForm />
    </Box>
  );
}

export default AddMenu;
