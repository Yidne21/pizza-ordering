import React from "react";
import { Box } from "@mui/material";
import PizzaCard from "./card/pizza-card";
import PizzaSection from "./pizza-section";

const pizzaData = [
  {
    id: "1",
    name: "Margherita",
    description: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
    price: 150,
    image: "/pizza.jpg",
    restaurant: "Azmera Pizza",
    restaurantAvatar: "/images/ava.svg",
  },
  {
    id: "188",
    name: "Pepperoni",
    description: "Tomato, Mozzarella, Pepperoni",
    price: 180,
    image: "/pizza.jpg",
    restaurant: "Pepperoni Palace",
    restaurantAvatar: "/images/pepperoni.svg",
  },
  {
    id: "2",

    name: "BBQ Chicken",
    description: "BBQ sauce, Chicken, Mozzarella",
    price: 200,
    image: "/pizza.jpg",
    restaurant: "BBQ Grill",
    restaurantAvatar: "/images/bbq.svg",
  },

  {
    id: "3",

    name: "Pepperoni",
    description: "Tomato, Mozzarella, Pepperoni",
    price: 180,
    image: "/pizza.jpg",
    restaurant: "Pepperoni Palace",
    restaurantAvatar: "/images/pepperoni.svg",
  },
  {
    id: "4",

    name: "BBQ Chicken",
    description: "BBQ sauce, Chicken, Mozzarella",
    price: 200,
    image: "/pizza.jpg",
    restaurant: "BBQ Grill",
    restaurantAvatar: "/images/bbq.svg",
  },
];

function PopularPizza() {
  return (
    <PizzaSection title="Popular Pizza">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "25px",
          width: "100%",
        }}
      >
        {pizzaData.map((pizza, index) => (
          <Box
            key={index}
            sx={{
              flexBasis: { xs: "100%", sm: "48%", md: "30%" }, // Flex basis for 1, 2, or 3 columns
              maxWidth: { xs: "100%", sm: "48%", md: "30%" }, // Ensures each column takes up correct width
            }}
          >
            <PizzaCard pizza={pizza} />
          </Box>
        ))}
      </Box>
    </PizzaSection>
  );
}

export default PopularPizza;
