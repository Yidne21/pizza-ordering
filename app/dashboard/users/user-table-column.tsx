"use client";

import React, { useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { Box, Switch } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateUserStatus, deleteUser } from "@/lib/adminActions";
import { toast } from "react-toastify";

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

      // status update
      const [checked, setChecked] = useState(
        row.original.status === "ACTIVE"
      );
      const status = row.original.status === "ACTIVE" ? "Active": "Inactive"; 

      const handleSwitchChange = async (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const newChecked = event.target.checked;
        setChecked(newChecked);
        const newNewStatus = row.original.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
       const result = await updateUserStatus({status: newNewStatus, userId: row.original.id});
       if (result.success){
        toast.success(result.message);
       }
      };

      // delete user

      const handleDelete = async ()=> {
        const result = await deleteUser({userId: row.original.id});
        if(result.success){
          toast.success(result.message);
        }else {
          toast.error(result.message)
        }
      }

      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >

          {/* status update switch */}
          <Box
            sx={{
              backgroundColor: status === 'Active' ? "rgba(0, 128, 0, 0.10)" : "#ffbaba",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              color: status === 'Active' ? "#14a514" : "#ff0000",
              justifyContent: "center",
              width: "102px",
            }}
          >
            {status}
            <Switch
              {...label}
              size="small"
              color={status === "Active" ? "success": "error"}
              checked={checked}
              onChange={handleSwitchChange}
            />
          </Box>

          {/* delete user icon */}
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
              onClick={handleDelete}
            />
          </Box>
        </Box>
      );
    },
  },
];

export default columns;
