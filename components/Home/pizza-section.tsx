import React from "react";
import { Box, Typography } from "@mui/material";

type PizzaSectionProps = {
  title: string;
  children: React.ReactNode;
};

const PizzaSection = (props: PizzaSectionProps) => {
  return (
    <Box
      sx={{
        p: { xs: "20px", sm: "20px", lg: "70px" },
        background: "#FFF8F1",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Typography
        sx={{
          color: "rgba(0, 0, 0, 0.50)",
          fontFamily: "Roboto",
          fontSize: { xs: "15px", sm: "32px", md: "40px", lg: "50px" },
          fontWeight: 500,
          lineHeight: "150%",
        }}
      >
        {props.title}
      </Typography>
      {props.children}
    </Box>
  );
};

export default PizzaSection;
