"use client";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Box, Typography } from "@mui/material"; // Material UI components
import CustomModal from "@/components/ui/Modal";
import AddForm from "./add-form";
import { getResturantPermission } from "@/lib/adminActions";

type Permission = {
  id: string;
  action: string;
  subject: string;
};

export type AddRolePopUpProps = {
  open: boolean;
  onClose: () => void;
};

function AddRolePopUp({ open, onClose }: AddRolePopUpProps) {
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
    } catch {
      setError("Failed to fetch permissions");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      getPermissions();
    }
  }, [open, getPermissions]);

  const role = useMemo(
    () => ({
      name: "",
      permissions,
    }),
    [permissions]
  );

  return (
    <CustomModal open={open} onClose={onClose} width="40%" height="100%">
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
        <AddForm role={role} onClose={onClose} />
      )}
    </CustomModal>
  );
}

export default AddRolePopUp;
