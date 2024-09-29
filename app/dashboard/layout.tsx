"use client";
import Sidebar from "@/components/dashboard/sidebar";
import { Box } from "@mui/material";
import { useState } from "react";
import Navbar from "@/components/dashboard/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          flex: 1,
          height: "100vh",
          width: isOpen ? 100 : 240,
          position: "fixed",
          top: 0,
        }}
      >
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </Box>
      <Box sx={{ flex: 4, ml: isOpen ? 12 : 30, width: "100vh" }}>
        <Navbar />
        <Box sx={{ mt: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
}
