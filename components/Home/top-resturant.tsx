"use client";

import React from "react";
import { Box, styled, Typography } from "@mui/material";
import RestaurantCard from "./card/top-resturant-card";
import logo from "@/public/images/ava.svg";
import CustomeSlider from "../ui/slider";

const TopRestaurants = () => {
  const CustomSliderWrapper = styled(Box)({
    "& .slick-slide": {
      padding: "10px 10px",
    },
    backgroundColor:
      " linear-gradient(180deg, rgba(250, 126, 0, 0.00) 0%, rgba(250, 126, 0, 0.20) 60.5%, rgba(148, 74, 0, 0.00) 100%)",
  });

  const restaurants = [
    {
      name: "Azmera Pizza",
      orders: "2K",
      desc: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to...",
      logo: logo,
    },
    {
      name: "Azmera Pizza",
      orders: "2K",
      desc: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to...",
      logo: logo,
    },
    {
      name: "Azmera Pizza",
      orders: "2K",
      desc: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to...",
      logo: logo,
    },
  ];

  const settings = {
    infinite: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
    <Box
      sx={{
        pt: { xs: "14px", sm: "30px", md: "40px", lg: "94px" },
        pb: { xs: "45px", sm: "30px", md: "40px", lg: "94px" },
        pl: { xs: "10px", sm: "30px", md: "40px", lg: "47px" },
        background: "#FFF8F1",
        display: "flex",
        flexDirection: "column",
        gap: { xs: "10px", sm: "15px", md: "20px", lg: "25px" },
      }}
    >
      <Typography
        sx={{
          color: "rgba(0, 0, 0, 0.50)",
          fontFamily: "Inter",
          fontWeight: 500,
          fontSize: { xs: "14px", sm: "20x", md: "24px", lg: "50px" },
          fontStyle: "normal",
          lineHeight: "20px",
        }}
      >
        Top Restaurants
      </Typography>
      <CustomSliderWrapper>
        <CustomeSlider settings={settings}>
          {restaurants.map((restaurant, index) => (
            <RestaurantCard key={index} resturant={restaurant} />
          ))}
        </CustomeSlider>
      </CustomSliderWrapper>
    </Box>
  );
};

export default TopRestaurants;
