import React from "react";
import Navbar from "../components/Home/navbar";
import HeroSection from "../components/Home/hero-section";
import FeaturedPizza from "../components/Home/featured-pizza";
import TopRestaurants from "../components/Home/top-resturant";
import PizzaSection from "../components/Home/pizza-section";
import Footer from "../components/Home/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturedPizza />
      <TopRestaurants />
      <PizzaSection title="Popular Pizzas" />
      <PizzaSection title="Fasting" />
      <Footer />
    </>
  );
}
