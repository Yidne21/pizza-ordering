import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import Image from "next/image";

const HeroSection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        background:
          "linear-gradient(180deg, #FFF 0%, #FFC993 76%, #FFF8F1 100%)",
        overflow: "hidden",
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          width: { xs: "40%", sm: "50%", md: "60%", lg: "70%" },
          pl: { xs: "10px", sm: "20px", md: "70px", lg: "85px" },
          pb: { xs: "68px", sm: "100px", md: "171px", lg: "271px" },
          pt: { xs: "40px", sm: "60px", md: "70px", lg: "89px" },
        }}
      >
        <Box
          sx={{
            mb: { xs: "10px", sm: "20px", md: "40px", lg: "50px" },
            width: { xs: "200px", sm: "446px", md: "446px", lg: "766px" },
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: "30px", sm: "60px", md: "100px", lg: "150px" },
              fontFamily: "Inter",
              lineHeight: "1.2",
              background:
                "linear-gradient(90deg, #FF8100 -2.97%, #FFBE71 93.66%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              py: { xs: "10px", sm: "15px", md: "20px", lg: "30px" },
            }}
          >
            Order us
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{
              fontSize: { xs: "9px", sm: "14px", md: "18px", lg: "25px" },
              color: "#050505",
              fontFamily: "Roboto",
              fontWeight: 400,
              lineHeight: "145%",
              letterSpacing: {
                xs: "0.3px",
                sm: "0.5px",
                md: "0.6px",
                lg: "0.75px",
              },
              opacity: 0.9,
            }}
          >
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without.
          </Typography>
        </Box>
        {/* Search Box */}

        <TextField
          placeholder="Search"
          fullWidth
          sx={{
            cursor: "pointer",
            "& fieldset": { border: "none" },
            backgroundColor: "#FFFFFF",
            borderRadius: "100px",
            height: { xs: "57px", sm: "70px", md: "80px", lg: "118px" },
            width: { xs: "261px", lg: "718px" },
            alignItems: "center",
            justifyContent: "center",
            "& .MuiInputBase-root": {
              padding: "5px",
            },
            pl: { xs: "17px", sm: "20px", md: "30px", lg: "36px" },
            "& .MuiInputBase-input::placeholder": {
              color: "var(--Greyscale-Grey-500, #6C727F)",
              fontFamily: "Plus Jakarta Sans",
              fontWeight: { xs: 500, lg: 700 },
              fontSize: { xs: "15px", sm: "16px", md: "30px", lg: "30px" },
              lineHeight: {
                xs: "22.5px",
                sm: "24px",
                md: "30px",
                lg: "45px",
              },
            },
          }}
          slotProps={{
            input: {
              endAdornment: (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "360%",
                    backgroundColor: "#FF890F",
                    p: "14px",
                    width: {
                      xs: "52px",
                      sm: "65px",
                      md: "75px",
                      lg: "106px",
                    },
                    height: {
                      xs: "52px",
                      sm: "55px",
                      md: "65px",
                      lg: "106px",
                    },
                    cursor: "pointer",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: { xs: "24px", lg: "50px" },
                      height: { xs: "24px", lg: "50px" },
                      cursor: "pointer",
                    }}
                  >
                    <Image
                      src="/icons/search-.svg"
                      fill
                      alt="search"
                      objectFit="contain"
                    />
                  </Box>
                </Button>
              ),
            },
          }}
        />
      </Box>

      {/* Right Section (Pizza Image) */}
      <Box
        sx={{
          width: { xs: "60%", sm: "50%", md: "40%", lg: "30%" },
          pt: { xs: "10px", sm: "20px", md: "30px", lg: "30px" },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: "250px", sm: "494px", md: "694px", lg: "794px" },
            height: { xs: "255px", sm: "406px", md: "706px", lg: "806px" },
            right: { xs: "-35px", sm: "-10px", md: "110px", lg: "288px" },
          }}
        >
          <Image
            src="/images/hero.png"
            fill
            alt="pizza"
            style={{ objectFit: "contain" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
