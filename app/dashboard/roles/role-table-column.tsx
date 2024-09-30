"use client";

import React, { useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { Box, Switch } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateRolePopUp from "./update-role-popup";

export type Role = {
  id: number;
  name: string;
  permissions: string[];
  createdAt: string;
  status: string;
};
const label = { inputProps: { "aria-label": "Switch demo" } };

const columns: MRT_ColumnDef<Role>[] = [
  {
    accessorKey: "name",
    header: "Role Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    Cell: ({ row }) => {
      const [checked, setChecked] = useState(
        row.original.status === "APPROVED"
      );

      const handleSwitchChange = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const newChecked = event.target.checked;
        setChecked(newChecked);
      };

      const [open, setOpen] = useState(false);
      const handleModalClose = () => {
        setOpen(!open);
      };

      const handleModalOpen = () => {
        setOpen(!open);
      };

      const role = {
        name: row.original.name,
        permissions: row.original.permissions,
      };

      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(0, 128, 0, 0.10)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              color: "#14a514",
              justifyContent: "center",
              width: "102px",
            }}
          >
            {row.original.status}
            <Switch
              {...label}
              size="small"
              color="success"
              checked={checked}
              onChange={handleSwitchChange}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: "5px",
              borderRadius: "100%",
              backgroundColor: "#FFF",
              "&:hover": {
                background: "#d9e2e9",
              },
            }}
          >
            <VisibilityIcon
              sx={{
                width: "24px",
                height: "24px",
                cursor: "pointer",
              }}
              onClick={handleModalOpen}
            />
            <UpdateRolePopUp
              open={open}
              onClose={handleModalClose}
              role={role}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: "5px",
              borderRadius: "100%",
              backgroundColor: "#FFF",
              "&:hover": {
                background: "#d9e2e9",
              },
            }}
          >
            <DeleteIcon
              sx={{
                width: "24px",
                height: "24px",
                cursor: "pointer",
              }}
            />
          </Box>
        </Box>
      );
    },
  },
];

export default columns;
