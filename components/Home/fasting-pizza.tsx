"use client";

import React from "react";
import CustomeSlider from "../ui/slider";
import PizzaSection from "./pizza-section";
import PizzaCard from "./card/pizza-card";
import { Box, styled } from "@mui/material";
import { Pizza } from "./popular-pizza";

interface FastingPizaaProps {
  pizzas: Pizza[];
}

function FastingPizza(props: FastingPizaaProps) {
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
          {props.pizzas.map((pizza, index) => (
            <PizzaCard key={index} pizza={pizza} />
          ))}
        </CustomeSlider>
      </CustomSliderWrapper>
    </PizzaSection>
  );
}

export default FastingPizza;
