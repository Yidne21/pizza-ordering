import React from "react";
import { Box } from "@mui/material";
import PizzaCard from "./card/pizza-card";
import PizzaSection from "./pizza-section";

const pizzaData = [
  {
    name: "Margherita",
    description: "Tomato, Mozzarella, Bell Peppers, Onions, Olives",
    price: 150,
    image: "/pizza.jpg",
    restaurant: "Azmera Pizza",
    restaurantAvatar: "/images/ava.svg",
  },
];

function PopularPizza() {
  return (
    <PizzaSection title="Popular Pizza">
      {pizzaData.map((pizza, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: "50px",
            rowGap: { xs: "10px", lg: "25px" },
            columnCount: { xs: 1, sm: 2, md: 3, lg: 3 },
            width: { xs: "100%", sm: "100%", md: "100%", lg: "100vw" },
          }}
        >
          <PizzaCard pizza={pizza} />
          <PizzaCard pizza={pizza} />
          <PizzaCard pizza={pizza} />
          <PizzaCard pizza={pizza} />
          <PizzaCard pizza={pizza} />
          <PizzaCard pizza={pizza} />
          <PizzaCard pizza={pizza} />
        </Box>
      ))}
    </PizzaSection>
  );
}

export default PopularPizza;
