import React, { useCallback, useEffect, useState } from "react";
import CustomModal from "@/components/ui/Modal";
import UpdateForm from "./update-form";
import { getResturantPermission } from "@/lib/adminActions";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";


type Permission = {
  id: string;
  action: string;
  subject: string;
};

export type UpdateRolePopUpProps = {
  open: boolean;
  onClose: () => void;

  role: {
    roleId: string
    name: string;
    permissions: Permission[];
  };
};

function UpdateRolePopUp(props: UpdateRolePopUpProps) {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setIsLoading] = useState(false);

  const getPermissions = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getResturantPermission();
      if (result.success) {
        setPermissions(result.permissions);
      } else {
        setError(result.message);
      }
    } catch{
      setError("Failed to fetch permissions");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (props.open) {
      getPermissions();
    }
  }, [props.open, getPermissions]);


  return (
    <CustomModal
      open={props.open}
      onClose={props.onClose}
      width="40%"
      height="100%"
    >
      {loading ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Typography variant="h6" mt={2}>
            Loading permissions...
          </Typography>
        </Box>
      ) : error ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Typography variant="h6" color="error" align="center">
            Error: {error}
          </Typography>
        </Box>
      ) : (
        <UpdateForm role={props.role} onClose={props.onClose} permissions={permissions} />)}
    </CustomModal>
  );
}

export default UpdateRolePopUp;
