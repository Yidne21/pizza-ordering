import React from "react";
import OrderDetailCard from "@/components/Home/card/order-detail";
import { Box } from "@mui/material";
import RelatedPizza from "@/components/Home/related-pzza";

function OrderDetail() {
  return (
    <Box
      sx={{
        background: "#FFF8F1",
      }}
    >
      <OrderDetailCard />
      <RelatedPizza />
    </Box>
  );
}

export default OrderDetail;
