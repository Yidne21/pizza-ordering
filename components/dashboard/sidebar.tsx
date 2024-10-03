"use client";

import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Link from "next/link";
import { sideBarMenu } from "@/utils/constant";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const pathname = usePathname();

  const handleLogout = async () => {
    signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Header Section */}

      {isOpen && (
        <Box
          sx={{
            p: "21px 10px 0px 10px",
            background: "rgba(243, 243, 243, 0.25)",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            height: "65px",
          }}
        >
          <MenuIcon
            onClick={() => setIsOpen((prev) => !prev)}
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "#FF8100",
              },
              width: "var(--3, 24px)",
              height: "var(--3, 24px)",
            }}
          />
        </Box>
      )}

      {!isOpen && (
        <Box
          sx={{
            p: "21px 10px 0px 10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(243, 243, 243, 0.25)",
            height: "65px",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "#000",
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "normal",
              textTransform: "uppercase",
            }}
          >
            pizza
          </Typography>
          <MenuOpenOutlinedIcon
            onClick={() => setIsOpen((prev) => !prev)}
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "#FF8100",
              },
              width: "var(--3, 24px)",
              height: "var(--3, 24px)",
            }}
          />
        </Box>
      )}

      {/* Logo */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "31px 0px 32px 0px",
          borderTop: "1px solid rgba(0, 0, 0, 0.05)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
          background: "rgba(255, 129, 0, 0.05)",
        }}
      >
        <Image
          src="/images/emojione-pizza.svg"
          alt="logo"
          width={isOpen ? 40 : 50}
          height={isOpen ? 40 : 50}
        />
      </Box>

      {/* Menu Section */}
      <List
        disablePadding
        sx={{
          px: "4px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          rowGap: "5px",
          alignSelf: "stretch",
          width: "100%",
        }}
      >
        {sideBarMenu.map((item, index) => {
          return (
            <ListItem
              component={Link}
              href={item.path}
              disablePadding
              key={index}
              sx={() => ({
                display: "flex",
                width: "100%",
                height: "44px",
                pr: isOpen ? "var(--5, 20px)" : "var(--5, 40px)",
                columnGap: isOpen ? "20px" : "45px",
                alignItems: "center",
                justifyContent: "flex-start",
                "&:hover": {
                  background: "rgba(255, 129, 0, 0.15)",
                },
                textDecoration: "none",
                color: "inherit",
                ...(item.path === pathname && {
                  backgroundColor: "rgba(255, 129, 0, 0.40)",
                }),
              })}
            >
              <Box
                sx={() => ({
                  width: "var(--borderRadius, 4px)",
                  height: "30px",
                  borderRadius: "100px",
                  ...(item.path === pathname && {
                    background: "#FF8100",
                  }),
                })}
              ></Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {isOpen && (
                  <Tooltip
                    title={item.title}
                    sx={{
                      fontSize: 16,
                      color: "rgba(0, 0, 0, 0.75)",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "rgba(0, 0, 0, 0.75)",
                        fontSize: 20,
                        minWidth: 0,
                      }}
                    >
                      <item.icon
                        width={24}
                        height={24}
                        stroke={item.path === pathname ? "#FF8100" : ""}
                      />{" "}
                    </ListItemIcon>
                  </Tooltip>
                )}

                {!isOpen && (
                  <ListItemIcon
                    sx={{
                      color: "rgba(0, 0, 0, 0.75)",
                      fontSize: 20,
                      minWidth: 0,
                      width: "24px",
                      height: "24px",
                    }}
                  >
                    <item.icon
                      width={24}
                      height={24}
                      stroke={item.path === pathname ? "#FF8100" : ""}
                    />
                  </ListItemIcon>
                )}

                {!isOpen && (
                  <ListItemText
                    primary={item.title}
                    sx={() => ({
                      color: "#000",
                      fontFamily: "Inter",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                      ...(item.path === pathname && {
                        color: "#FF8100",
                      }),
                    })}
                  />
                )}
              </Box>
            </ListItem>
          );
        })}
        {/* Logout Button Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            borderTop: "1px solid rgba(0, 0, 0, 0.10)",
            padding: "10px 5px",
            width: "100%",
            mt: 2,
          }}
        >
          <Button
            variant="text"
            startIcon={
              <ExitToAppIcon
                sx={{
                  width: isOpen ? 24 : 20,
                  height: isOpen ? 24 : 20,
                }}
              />
            }
            onClick={handleLogout}
            fullWidth
            sx={{
              color: "#F00",
              fontSize: "18px",
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "24px",
              textTransform: "capitalize",
              padding: "12px 20px",

              ":hover": {
                color: "none",
                background: "none",
              },
            }}
          >
            {!isOpen && "Logout"}
          </Button>
        </Box>
      </List>
    </Box>
  );
};

export default Sidebar;
