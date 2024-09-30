"use client";

import React, { useState } from "react";
import CustomeTable from "@/components/table/custom-table";
import { MRT_ColumnDef } from "material-react-table";
import { Box, Switch } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

type Role = {
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

const data: Role[] = [
  {
    id: 1,
    name: "Admin",
    createdAt: "2021-10-10",
    permissions: ["create", "read", "update", "delete"],
    status: "Active",
  },
  {
    id: 2,
    name: "User",
    createdAt: "2021-10-10",
    permissions: ["read"],
    status: "InActive",
  },
];

function Roles() {
  return (
    <CustomeTable
      data={data}
      columns={columns}
      maxHeight="100%"
      title="roles"
    />
  );
}

export default Roles;
