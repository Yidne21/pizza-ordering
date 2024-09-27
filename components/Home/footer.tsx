import React from "react";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* top */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxHeight: "241px",
          background: "#CCB691",
          width: "100%",
          pt: {
            xs: "38px",
            lg: "22px",
          },
          pb: {
            xs: "20px",
            lg: "88px",
          },
          pl: {
            xs: "20px",
            lg: "50px",
          },
          pr: {
            xs: "20px",
            lg: "50px",
          },
        }}
      >
        {/* left */}
        <Box
          sx={{
            display: "flex",
            gap: { lg: "50px" },
            alignItems: "flex-start",
            height: { lg: "36px" },
            flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
            mt: { xs: "0px", lg: "50px" },
          }}
        >
          <Link href="/">
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
          </Link>

          <Link href="/orders">
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
          </Link>

          <Link href="/about">
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: { xs: "13px", sm: "18px", md: "23px", lg: "25px" },
                fontWeight: "700px",
                lineHeight: "36px",
                letterSpacing: "0.75px",
              }}
            >
              About us
            </Typography>
          </Link>
        </Box>

        {/* right */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: { xs: "15px", lg: "18px" },
          }}
        >
          {/* logo */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: "3px", sm: "5px", md: "10px", lg: "15px" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: { xs: "26px", sm: "30px", md: "50px", lg: "50px" },
                height: { xs: "26px", sm: "30px", md: "50px", lg: "50px" },
              }}
            >
              <Image src="/images/emojione-pizza.svg" fill alt="logo" />
            </Box>
            <Box
              sx={{
                position: "relative",
                width: { xs: "26px", sm: "30px", md: "50px", lg: "66px" },
                height: { xs: "20px", sm: "20px", md: "20px", lg: "20px" },
              }}
            >
              <Image src="/images/pizza.svg" fill alt="logo" />
            </Box>
          </Box>

          {/* text field */}

          <Box
            sx={{
              background: "#fff",
              borderRadius: "12px",
              border: "var(--none, 1px) solid rgba(38, 38, 38, 0.50)",
            }}
          >
            <TextField
              placeholder="Your Feedback..."
              fullWidth
              sx={{
                height: "62px",
                width: "100%",
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                alignItems: "center",
                justifyContent: "center",
                "& fieldset": {
                  border: "none",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "var(--Grey-60, #999)",
                  fontFamily: "Urbanist",
                  fontWeight: 500,
                  fontSize: { xs: "15px", sm: "16px", md: "30px", lg: "18px" },
                  lineHeight: {
                    xs: "22.5px",
                    sm: "24px",
                    md: "30px",
                    lg: "24px",
                  },
                  letterSpacing: "-0.108px",
                },
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="start">
                      <Box
                        sx={{
                          position: "relative",
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                        }}
                      >
                        <Image src="/icons/send.svg" fill alt="logo" />
                      </Box>
                    </InputAdornment>
                  ),
                },
              }}
              variant="outlined"
            />
          </Box>
        </Box>
      </Box>

      {/* bottom */}
      <Box
        sx={{
          display: "flex",
          background: "#000",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          p: { xs: "20px", lg: "50px" },
          flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
        }}
      >
        {/* left */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
            color: "#FFFFFF",
            p: "10px",
            gap: { xs: "10px", sm: "10px", md: "40px", lg: "40px" },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Urbanist",
              fontSize: { xs: "14px", sm: "16px", md: "16px", lg: "18px" },
              fontWeight: 500,
              lineHeight: "24px",
              letterSpacing: "-0.084px",
              fontStyle: "normal",
            }}
          >
            @2024 Pizza All Rights Reserved.
          </Typography>
          <Typography
            sx={{
              fontFamily: "Urbanist",
              fontSize: { xs: "14px", sm: "16px", md: "16px", lg: "18px" },
              fontWeight: 500,
              lineHeight: "24px",
              letterSpacing: "-0.084px",
              fontStyle: "normal",
            }}
          >
            Terms & Conditions
          </Typography>
        </Box>

        {/* right */}
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "52px",
              height: "52px",
              cursor: "pointer",
              borderRadius: "58px",
              padding: "14px",
              background: "var(--Grey-08, #141414)",
            }}
          >
            <Image src="/icons/fb.svg" alt="logo" width={24} height={24} />
          </Box>
          <Box
            sx={{
              position: "relative",
              width: "52px",
              height: "52px",
              cursor: "pointer",
              borderRadius: "58px",
              padding: "14px",
              background: "var(--Grey-08, #141414)",
            }}
          >
            <Image src="/icons/lind.svg" alt="logo" width={24} height={24} />
          </Box>
          <Box
            sx={{
              position: "relative",
              width: "52px",
              height: "52px",
              cursor: "pointer",
              borderRadius: "58px",
              padding: "14px",
              background: "var(--Grey-08, #141414)",
            }}
          >
            <Image src="/icons/twt.svg" alt="logo" width={24} height={24} />
          </Box>
          <Box
            sx={{
              position: "relative",
              width: "52px",
              height: "52px",
              cursor: "pointer",
              borderRadius: "58px",
              padding: "14px",
              background: "var(--Grey-08, #141414)",
            }}
          >
            <Image src="/icons/ytb.svg" alt="logo" width={24} height={24} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
