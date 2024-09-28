import React from "react";
import PizzaSection from "@/components/Home/pizza-section";
import PizzaCard from "@/components/Home/card/pizza-card";
import { Box } from "@mui/material";

function OrderHistory() {
  const Orders = [
    {
      name: "Margherita",
      description: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
      price: 150,
      image: "/pizza.jpg",
      status: "Ordered",
    },
    {
      name: "Margherita",
      description: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
      price: 150,
      image: "/pizza.jpg",
      status: "Ordered",
    },
    {
      name: "Margherita",
      description: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
      price: 150,
      image: "/pizza.jpg",
      status: "Ordered",
    },
    {
      name: "Margherita",
      description: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
      price: 150,
      image: "/pizza.jpg",
      status: "Received",
    },
    {
      name: "Margherita",
      description: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
      price: 150,
      image: "/pizza.jpg",
      status: "Received",
    },
    {
      name: "Margherita",
      description: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
      price: 150,
      image: "/pizza.jpg",
      status: "Received",
    },
  ];

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
        {Orders.map((order, index) => (
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
