"use client";
import Sidebar from "@/components/dashboard/sidebar";
import { Box } from "@mui/material";
import { useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          flex: 1,
          height: "100vh",
          width: open ? 100 : 240,
          position: "fixed",
          top: 0,
        }}
      >
        <Sidebar open={open} setOpen={setOpen} />
      </Box>
      <Box sx={{ flex: 4, p: 1, ml: open ? 12 : 30, width: "100vh" }}>
        <Box sx={{ mt: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
}
