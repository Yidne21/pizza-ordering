"use client";

import React, { useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { Box, Switch } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateRolePopUp from "./update-role-popup";
import { updateRoleStatus, deleteRole } from "@/lib/adminActions";
import { toast } from "react-toastify";


type Permission = {
  id: string;
  roleId: string;
  action: string;
  subject: string;
}

export type Role = {
  id: string;
  name: string;
  permissions: Permission[];
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
      //update role status
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
       const result = await updateRoleStatus({status: newNewStatus, roleId: row.original.id});
       if (result.success){
        toast.success(result.message);
       }

      };

      // update role
      const [open, setOpen] = useState(false);
      const handleModalClose = () => {
        setOpen(!open);
      };

      const handleModalOpen = () => {
        setOpen(!open);
      };

      const role = {
        name: row.original.name,
        roleId: row.original.id,
        permissions: row.original.permissions,
      };

      // delete role

      const handleDelete = async ()=> {
        const result = await deleteRole({roleId: row.original.id});
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

          {/* status switch */}
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

          {/* eye icon */}
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

          {/* delete icon */}
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
              onClick={handleDelete}
            />
          </Box>
        </Box>
      );
    },
  },
];

export default columns;
