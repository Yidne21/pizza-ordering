import React from "react";
import HeroSection from "../../components/Home/hero-section";
import FeaturedPizza from "../../components/Home/featured-pizza";
import TopRestaurants from "../../components/Home/top-resturant";
import PopularPizza from "@/components/Home/popular-pizza";
import FastingPizza from "@/components/Home/fasting-pizza";
import Footer from "../../components/Home/footer";
import { fetchPizzas } from "@/lib/customerActions";


export default async function Home({searchParams}:{  searchParams?:{ [key: string]: string | undefined };}) {
  const searchQuery = searchParams?.search || "";
  const result = await fetchPizzas(searchQuery);
  return (
    <>
      <HeroSection />
      <FeaturedPizza />
      <TopRestaurants />
      <PopularPizza pizzas={result.pizzas}/>
      <FastingPizza pizzas={result.pizzas}/>
      <Footer />
    </>
  );
}
