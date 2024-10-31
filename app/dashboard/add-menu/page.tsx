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

  const { role, resturantId } = session?.user || {};

  const ability = role ? createAbility(role.permissions) : null;

  if (!ability || !ability.can(Actions.create, Subjects.menu) || !resturantId) {
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
      <AddMenuForm resturantId={resturantId} />
    </Box>
  );
}

export default AddMenu;
