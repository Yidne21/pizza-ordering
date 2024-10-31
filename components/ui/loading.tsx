import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

const LoadingComponent = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <CircularProgress color="primary" size={60} thickness={5} />
      <Typography
        variant="h6"
        color="textSecondary"
        style={{ marginTop: "1rem", fontWeight: 500 }}
      >
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default LoadingComponent;
