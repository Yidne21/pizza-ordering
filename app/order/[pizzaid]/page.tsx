import React from "react";
import OrderDetailCard from "@/components/Home/card/order-detail";
import { Box } from "@mui/material";
import RelatedPizza from "@/components/Home/related-pzza";

interface OrderDetailPageProps {
  params: {
    pizzaId: string;
  };
}

function OrderDetail({ params }: OrderDetailPageProps) {
  const { pizzaId } = params;
  console.log(pizzaId, "%%%%%%");

  return (
    <Box
      sx={{
        background: "#FFF8F1",
      }}
    >
      <OrderDetailCard pizzaId={pizzaId} />
      <RelatedPizza />
    </Box>
  );
}

export default OrderDetail;
