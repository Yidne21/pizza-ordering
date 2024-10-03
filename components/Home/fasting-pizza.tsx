"use client";

import React from "react";
import CustomeSlider from "../ui/slider";
import PizzaSection from "./pizza-section";
import PizzaCard from "./card/pizza-card";
import { Box, styled } from "@mui/material";

const fastingPizzas = [
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
function FastingPizza() {
  const CustomSliderWrapper = styled(Box)({
    "& .slick-slide": {
      padding: "10px 10px",
    },
    backgroundColor:
      " linear-gradient(180deg, rgba(250, 126, 0, 0.00) 0%, rgba(250, 126, 0, 0.20) 60.5%, rgba(148, 74, 0, 0.00) 100%)",
  });

  const settings = {
    infinite: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <PizzaSection title="Fasting Pizza">
      <CustomSliderWrapper>
        <CustomeSlider settings={settings}>
          {fastingPizzas.map((pizza, index) => (
            <PizzaCard key={index} pizza={pizza} />
          ))}
        </CustomeSlider>
      </CustomSliderWrapper>
    </PizzaSection>
  );
}

export default FastingPizza;
