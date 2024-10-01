"use client";

import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { CustomLink } from "@/app/custom-link";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleRegister = () => {
    router.push("/manager-sign-up");
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        background: "#FFF8F1",
        boxShadow: "0px 0px 15px 0px rgba(255, 129, 0, 0.20)",
        height: "75px",
      }}
    >
      <Box
        sx={{
          gap: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "26px", sm: "26px", md: "50px", lg: "50px" },
            height: { xs: "26px", sm: "26px", md: "50px", lg: "50px" },
            position: "relative",
          }}
        >
          <Image
            src="/images/emojione-pizza.svg"
            fill
            alt="logo"
            style={{ objectFit: "cover" }}
          />
        </Box>

        <Typography
          sx={{
            color: "#FF890F",
            fontFamily: "Inter",
            fontSize: { xs: "20px", sm: "23px", md: "23px", lg: "25px" },
            fontWeight: "bold",
            lineHeight: "36px",
          }}
        >
          Pizza
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
          width: { xs: "100px", sm: "100px", md: "400px", lg: "600px" },
        }}
      >
        <CustomLink href="/">
          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: { xs: "13px", sm: "18px", md: "23px", lg: "25px" },
              fontWeight: "700px",
              lineHeight: "36px",
              letterSpacing: "0.75px",
            }}
          >
            Home
          </Typography>
        </CustomLink>

        <CustomLink href="/orders">
          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: { xs: "13px", sm: "18px", md: "23px", lg: "25px" },
              fontWeight: "700px",
              lineHeight: "36px",
              letterSpacing: "0.75px",
            }}
          >
            Orders
          </Typography>
        </CustomLink>
        <Box sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
          <CustomLink href="/about">
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "26px",
                fontWeight: "700px",
                lineHeight: "36px",
                letterSpacing: "0.75px",
              }}
            >
              Who we are
            </Typography>
          </CustomLink>
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "none", md: "flex" },
        }}
      >
        <Button
          variant="contained"
          sx={{
            background: "#FF890F",
            color: "#FFFF",
            padding: "10px 20px",
            borderRadius: "5px",
            fontFamily: "Inter",
            fontSize: "25px",
            fontWeight: 700,
            lineHeight: "36px",
            letterSpacing: "0.75px",
          }}
          onClick={handleRegister}
        >
          Register
        </Button>
      </Box>
      <Box
        sx={{
          display: { sm: "flex", md: "none", lg: "none" },
        }}
      >
        <MenuOutlinedIcon
          sx={{
            fontSize: "50px",
            width: "var(--3, 24px)",
            height: "var(--3, 24px)",
          }}
        />
      </Box>
    </Box>
  );
};

export default Navbar;
