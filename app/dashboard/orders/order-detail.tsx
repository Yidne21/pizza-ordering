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
  return (
    <CustomModal open={props.open} onClose={props.onClose}>
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
          <Box>
            <Typography sx={{ ...labelStyle }}>Name:</Typography>

            <Typography sx={{ ...valueStyle }}>{props.order.name}</Typography>
          </Box>

          <Box>
            <Typography sx={{ ...labelStyle }}>Toppings:</Typography>
          </Box>

          <Box>
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
