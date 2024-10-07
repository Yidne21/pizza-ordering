import React from "react";
import PizzaSection from "@/components/Home/pizza-section";
import PizzaCard from "@/components/Home/card/pizza-card";
import { Box, Typography } from "@mui/material";
import { fetchOrderByCustomerId } from "@/lib/customerActions";


async function OrderHistory() {
  const results = await fetchOrderByCustomerId();

  if (!results) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Full viewport height
        }}
      >
        <Typography variant="h4" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <PizzaSection title="Order History">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between", // Ensure equal spacing
          gap: "25px", // Space between items
        }}
      >
        {results.orders.map((order, index) => (
          <Box
            key={index}
            sx={{
              flexBasis: { xs: "100%", sm: "48%", md: "30%" }, // Flex basis for 1, 2, or 3 columns
              maxWidth: { xs: "100%", sm: "48%", md: "30%" }, // Ensures each column takes up correct width
            }}
          >
            <PizzaCard pizza={order} isOrdered={true} />
          </Box>
        ))}
      </Box>
    </PizzaSection>
  );
}

export default OrderHistory;
