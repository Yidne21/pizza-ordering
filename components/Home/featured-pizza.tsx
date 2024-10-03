"use client";

import { Box, styled, Typography } from "@mui/material";
import featPizza from "@/public/images/featPizza.png";
import featPizza2 from "@/public/images/featPizza2.png";
import featPizza3 from "@/public/images/featPizza3.png";
import FeaturedPizzaCard from "./card/featured-pizza";
import CustomeSlider from "../ui/slider";

const featPizzas = [
  {
    id: "1",
    desc: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without.",
    imagePath: featPizza,
    background: "#2F2F2F",
    discount: 50,
  },
  {
    id: "2",
    desc: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without.",
    imagePath: featPizza2,
    background: "#50482B",
    discount: 40,
  },
  {
    id: "3",
    desc: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without.",
    imagePath: featPizza3,
    background: "#296D60",
    discount: 50,
  },
];

const FeaturedPizza = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const CustomSliderWrapper = styled(Box)({
    "& .slick-slide": {
      padding: "10px 15px",
    },
  });

  return (
    <Box
      sx={{
        pt: { xs: "10px", sm: "20px", md: "60px", lg: "65px" },
        pb: { xs: "20px", sm: "40px", md: "100px", lg: "110px" },
        pl: { xs: "10px", sm: "20px", md: "80px", lg: "77px" },
        pr: { xs: "10px", sm: "20px", md: "80px", lg: "77px" },
        overflow: "hidden",
        background: "#FFF8F1",
      }}
    >
      <Box
        sx={{
          mb: { xs: "40px", sm: "40px", md: "50px", lg: "60px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: { xs: "5px", sm: "10px", md: "20px", lg: "25x" },
        }}
      >
        <Typography
          sx={{
            color: "rgba(0, 0, 0, 0.50)",
            fontFamily: "Roboto",
            fontSize: { xs: "15px", sm: "32px", md: "40px", lg: "40px" },
            fontWeight: 500,
            lineHeight: "150%",
          }}
        >
          Featured Pizza
        </Typography>
        <CustomSliderWrapper>
          <CustomeSlider settings={settings}>
            {featPizzas.map((pizza, index) => (
              <FeaturedPizzaCard key={index} pizza={pizza} />
            ))}
          </CustomeSlider>
        </CustomSliderWrapper>
      </Box>
    </Box>
  );
};

export default FeaturedPizza;
