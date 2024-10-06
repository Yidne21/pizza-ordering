import React, { useCallback, useEffect, useMemo, useState } from "react";
import CustomModal from "@/components/ui/Modal";
import Form from "./form";
import { getResturantRoles } from "@/lib/adminActions";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";



type role = {
  id: string;
  name: string;
}


export type AddUserPopUpProps = {
  open: boolean;
  onClose: () => void;
};

function AddUserPopUp(props: AddUserPopUpProps) {

  const [roles, setRoles] = useState<role[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setIsLoading] = useState(false);



  const getroles = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getResturantRoles();
      if (result.success) {
        setRoles(result.roles);
      } else {
        setError(result.message);
      }
    } catch{
      setError("Failed to fetch roles");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (props.open) {
      getroles();
    }
  }, [props.open, getroles]);


  // prevents unncessary re-render
  const resturantRoles = useMemo(() => ({
    roles,
  }), [roles]);

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
            Loading roles...
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
        <Form roles={resturantRoles.roles} isEdit={false} onClose={props.onClose} />
      )}
    </CustomModal>
  );
}

export default AddUserPopUp;
