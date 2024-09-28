import React from "react";
import HeroSection from "../../components/Home/hero-section";
import FeaturedPizza from "../../components/Home/featured-pizza";
import TopRestaurants from "../../components/Home/top-resturant";
import PopularPizza from "@/components/Home/popular-pizza";
import FastingPizza from "@/components/Home/fasting-pizza";
import Footer from "../../components/Home/footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedPizza />
      <TopRestaurants />
      <PopularPizza />
      <FastingPizza />
      <Footer />
    </>
  );
}
