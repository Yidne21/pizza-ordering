import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sideBarMenu } from "@/utils/constant";
import React from "react";

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const pathname = usePathname();

  const handleLogout = async () => {};

  return (
    <Box sx={{ p: 1, height: "100%" }}>
      <Box
        sx={{
          backgroundColor: "#171B36",
          color: "white",
          borderRadius: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          {/* Header Section */}
          {open ? (
            <Box
              sx={{
                px: 2,
                pt: 1,
                mb: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MenuIcon
                onClick={() => setOpen((prev) => !prev)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "#115293",
                  },
                }}
              />
              <AutoStoriesOutlinedIcon
                sx={{ width: 28, height: 28, color: "#117693" }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                pt: 1,
                mb: 2,
              }}
            >
              <MenuIcon
                onClick={() => setOpen((prev) => !prev)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "#115293",
                  },
                }}
              />
              <AutoStoriesOutlinedIcon
                sx={{ width: 35, height: 35, color: "#117693" }}
              />
              <Typography sx={{ fontSize: 20, color: "#117693" }}>
                Book Rent
              </Typography>
            </Box>
          )}

          {/* Menu Section */}
          <List sx={{ px: 1 }}>
            {sideBarMenu.map((item, index) => {
              const title = "admin";

              // Common styles for the list item
              const commonStyles = {
                textDecoration: "none",
                color: "inherit",
              };

              // Disabled styles
              const disabledStyles = {
                cursor: "not-allowed",
                pointerEvents: "none",
                opacity: 0.5,
              };

              return (
                <Box key={index}>
                  {index === sideBarMenu.length - 3 && (
                    <Divider
                      sx={{
                        my: 2,
                        borderColor: "gray",
                      }}
                    />
                  )}
                  <Box
                    component={item.disable ? "div" : Link}
                    href={item.disable ? undefined : item.path}
                    sx={{
                      ...commonStyles,
                      ...(item.disable && disabledStyles),
                    }}
                  >
                    <ListItem
                      disablePadding
                      sx={() => ({
                        ...((item.path === pathname ||
                          (item.path.startsWith("/dashboard/bookUpload") &&
                            pathname.includes("/update"))) && {
                          backgroundColor: "#115293",
                        }),

                        borderRadius: 2,
                        marginTop: 1,
                        "&:hover": {
                          backgroundColor: !item.disable
                            ? "#115293"
                            : undefined,
                        },
                      })}
                    >
                      <ListItemButton
                        onClick={() => {
                          if (item.title === "Login as") {
                            handleLogout();
                          }
                        }}
                      >
                        {open ? (
                          <Tooltip title={title}>
                            <ListItemIcon
                              sx={{
                                color: "white",
                                fontSize: 20,
                              }}
                            >
                              {React.createElement(item.icon)}
                            </ListItemIcon>
                          </Tooltip>
                        ) : (
                          <ListItemIcon
                            sx={{
                              color: "white",
                              fontSize: 20,
                            }}
                          >
                            {React.createElement(item.icon)}
                          </ListItemIcon>
                        )}

                        {!open && (
                          <ListItemText
                            primary={title}
                            sx={{
                              color: "white",
                              fontSize: 12,
                            }}
                          />
                        )}
                      </ListItemButton>
                    </ListItem>
                  </Box>
                </Box>
              );
            })}

            <Divider
              sx={{
                my: 2,
                borderColor: "gray",
              }}
            />
          </List>
        </Box>

        {/* Logout Button Section */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="error"
            startIcon={<ExitToAppIcon />}
            onClick={handleLogout}
            fullWidth
            sx={{
              backgroundColor: "#45495E",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
          >
            {!open && "Logout"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
