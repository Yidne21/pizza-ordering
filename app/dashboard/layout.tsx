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
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        backgroundColor: "#F8F8F8",
      }}
    >
      <Box
        sx={{
          flex: 1,
          height: "100vh",
          width: isOpen ? 100 : 240,
          position: "fixed",
          transition: "0.5s ease",
          top: 0,
        }}
      >
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </Box>
      <Box
        sx={{
          flex: 4,
          ml: isOpen ? 12 : 30,
          height: "100%",
          width: "100%",
          background: "#F8F8F8",
          transition: "0.5s ease",
        }}
      >
        <Navbar />
        <Box
          sx={{
            m: "20px",
            padding: "49px 46px 50px 47px",
            // boxShadow: "0px 0px 15px 0px rgba(0, 0, 0, 0.5)",
            display: "inline-flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            backgroundColor: "#FFF",
            borderRadius: "5px",
            width: "1085px",
            transition: "0.5s ease",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
