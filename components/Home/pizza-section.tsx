import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import PizzaCard from "./pizza-card";

const pizzaData = [
  {
    name: "Margherita",
    description: "Tomato, Mozzarella...",
    price: 150,
    image: "/pizza.jpg",
    restaurant: "Azmera Pizza",
    restaurantAvatar: "/avatar.jpg",
  },
  // Add more pizzas...
];

const PizzaSection = ({ title }: { title: string }) => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={3}>
        {pizzaData.map((pizza, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <PizzaCard pizza={pizza} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PizzaSection;
