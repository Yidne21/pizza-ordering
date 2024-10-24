import React from "react";
import Navbar from "@/components/Home/navbar";
import { Box } from "@mui/material";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      {children}
    </Box>
  );
}

export default Layout;
