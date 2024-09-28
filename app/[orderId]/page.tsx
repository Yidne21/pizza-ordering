import React from "react";
import OrderDetailCard from "@/components/Home/card/order-detail";
import { Box } from "@mui/material";

function OrderDetail() {
  return (
    <Box
      sx={{
        background: "#FFF8F1",
      }}
    >
      <OrderDetailCard />
    </Box>
  );
}

export default OrderDetail;
