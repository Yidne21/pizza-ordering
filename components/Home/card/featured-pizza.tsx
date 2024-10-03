"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

type FeaturedPizzaCardProps = {
  pizza: {
    id: string;
    desc: string;
    imagePath: string | StaticImageData;
    background: string;
    discount: number;
  };
};

export default function FeaturedPizzaCard({ pizza }: FeaturedPizzaCardProps) {
  const router = useRouter();
  const handleOrder = () => {
    router.push(`order/${pizza.id}`);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        height: { xs: "205px", sm: "255px", md: "380px", lg: "386px" },
        borderRadius: { xs: "15px", sm: "20px", md: "45px", lg: "45px" },
        background: pizza.background,
        overflow: "hidden",
      }}
    >
      {/* left */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: "10px", sm: "20px", md: "30px", lg: "31px" },
          pl: { xs: "30px", sm: "30px", md: "40px", lg: "70px" },
          pt: { xs: "30px", sm: "32px", md: "32px", lg: "40px" },
          pb: { xs: "30px", sm: "32px", md: "32px", lg: "40px" },
          width: "62%",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#FFF",
              fontFamily: "Roboto",
              fontSize: { xs: "14px", sm: "24px", md: "32px", lg: "32px" },
              lineHeight: "96%",
              letterSpacing: "1.35px",
            }}
          >
            Make Your First Order
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "#FFF",
              fontFamily: "Roboto",
              fontSize: { xs: "14px", sm: "24px", md: "32px", lg: "32px" },
              lineHeight: "96%",
              letterSpacing: "1.35px",
            }}
          >
            and Get{" "}
            <span style={{ color: "#FFA800" }}>{pizza.discount}% Off</span>
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{
            color: "#FFF",
            fontFamily: "Roboto",
            fontSize: { xs: "6px", sm: "10px", md: "12px", lg: "16px" },
            lineHeight: "150%",
            fontWeight: 400,
            letterSpacing: "0.48px",
            mb: { xs: "10px", sm: "20px", md: "30px", lg: "31px" },
          }}
        >
          {pizza.desc}
        </Typography>
        <Button
          sx={{
            background: "#FF9921",
            width: { xs: "77px", sm: "100px", md: "150px", lg: "248px" },
            height: { xs: "30px", sm: "40px", md: "50px", lg: "60px" },
            px: { xs: "10px", sm: "13px", md: "40px", lg: "50px" },
            py: { xs: "10px", sm: "10px", md: "13px", lg: "15px" },
            borderRadius: "5px",
          }}
          onClick={handleOrder}
        >
          <Typography
            sx={{
              color: "#FFF",
              fontFamily: "Roboto",
              fontSize: { xs: "8px", sm: "10px", md: "12px", lg: "16px" },
              lineHeight: "150%",
              letterSpacing: "0.72px",
            }}
          >
            Order Now
          </Typography>
        </Button>
      </Box>
      {/* right */}
      <Box
        sx={{
          width: "38%",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: "349px", sm: "557px", md: "657px", lg: "657px" },
            height: { xs: "257px", sm: "283px", md: "484px", lg: "490px" },
            right: { xs: "35px", sm: "-20px", md: "-50px", lg: "-45px" },
            top: { xs: "-20px", sm: "-30px", md: "-50px", lg: "-50px" },
          }}
        >
          <Image src={pizza.imagePath} alt="Pizza" fill objectFit="cover" />
        </Box>
      </Box>
    </Box>
  );
}
