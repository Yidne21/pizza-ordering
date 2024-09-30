"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import CustomModal from "@/components/ui/Modal";

type OrderDetailProps = {
  order: {
    name: string;
    toppings: string[];
    quantity: number;
  };
  open: boolean;
  onClose: () => void;
};

function OrderDetail(props: OrderDetailProps) {
  const labelStyle = {
    color: "rgba(0, 0, 0, 0.50)",
    fontFeatureSettings: "'liga' off, 'clig' off",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0.15px",
  };

  const valueStyle = {
    color: "var(--text-primary, rgba(0, 0, 0, 0.87))",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "150%", // 24px
    letterSpacing: "0.15px",
  };

  const boxStyle = {
    display: "flex",
    gap: "10px",
  };

  function getRandomColorExceptWhite(): string {
    let color: string;

    do {
      // Generate a random color
      color = `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`;
    } while (color.toUpperCase() === "#FFFFFF");

    return color;
  }

  return (
    <CustomModal open={props.open} onClose={props.onClose} showCloseIcon={true}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "409px",
          gap: "30px",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          sx={{
            color: "#000",
            fontFeatureSettings: "'liga' off, 'clig' off",
            fontFamily: "Roboto",
            fontSize: "22px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "24px",
            letterSpacing: "0.15px",
          }}
        >
          Order Details
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            width: "100%",
          }}
        >
          <Box sx={{ ...boxStyle }}>
            <Typography sx={{ ...labelStyle }}>Name:</Typography>

            <Typography sx={{ ...valueStyle }}>{props.order.name}</Typography>
          </Box>

          <Box sx={{ ...boxStyle }}>
            <Typography sx={{ ...labelStyle }}>Toppings:</Typography>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {props.order.toppings.map((topping, index) => (
                <Typography
                  key={index}
                  sx={{
                    backgroundColor: getRandomColorExceptWhite(),
                    borderRadius: "100px",
                    color: "#FFF",
                    fontFeatureSettings: "'liga' off, 'clig' off",
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "21px",
                    letterSpacing: "0.15px",
                    padding: "4px 10px",
                  }}
                >
                  {topping}
                </Typography>
              ))}
            </Box>
          </Box>

          <Box sx={{ ...boxStyle }}>
            <Typography sx={{ ...labelStyle }}>Quantity:</Typography>
            <Typography sx={{ ...valueStyle }}>
              {props.order.quantity}
            </Typography>
          </Box>
        </Box>
      </Box>
    </CustomModal>
  );
}

export default OrderDetail;
