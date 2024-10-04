"use client";

import React, { useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { Box, Switch } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
};

const label = { inputProps: { "aria-label": "Switch demo" } };

const columns: MRT_ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone No",
  },
  {
    accessorKey: "email",
    header: "Email",
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
              p: "5px",
              borderRadius: "100%",
              cursor: "pointer",
              "&:hover": {
                background: "#d9e2e9",
              },
            }}
          >
            <DeleteIcon
              sx={{
                width: "24px",
                height: "24px",
              }}
            />
          </Box>
        </Box>
      );
    },
  },
];

export default columns;
