import React from "react";
import AddMenuForm from "./add-menu-form";
import { Box } from "@mui/material";

function AddMenu() {
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
