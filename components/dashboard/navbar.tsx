"use client";

import { Box, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import React from "react";
import { UsersIcon } from "../ui/icons";

const Navbar = () => {
  const pathname = usePathname();

  const displayPath = pathname.split("/").slice(2).join("/").replace(/-/g, " ");

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "flex-start",
        padding: "20px 30px 20px 23px",
        justifyContent: "space-between",
        background: "#FFF",
        width: "100%",
        borderLeft: "1px solid rgba(0, 0, 0, 0.05)",
        boxShadow: "7px 0px 15px 0px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Typography
        sx={{
          color: "#000",
          fontWeight: 500,
          fontSize: "22px",
          lineHeight: "normal",
          fontFamily: "Inter",
          textTransform: "capitalize",
        }}
      >
        {displayPath}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "var(--3, 40px)",
        }}
      >
        <NotificationsOutlinedIcon
          sx={{
            color: "#000",
            width: "24px",
            height: "24px",
            cursor: "pointer",
          }}
        />
        <UsersIcon
          style={{
            color: "#000",
            width: "24px",
            height: "24px",
            cursor: "pointer",
          }}
        />
      </Box>
    </Box>
  );
};

export default Navbar;
