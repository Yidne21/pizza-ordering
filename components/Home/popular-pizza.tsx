'use client'

import { Box } from "@mui/material";
import PizzaCard from "./card/pizza-card";
import PizzaSection from "./pizza-section";
import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

export type Pizza = {
  id: string;
  name: string;
  price: number;
  image: string;
  resturant: string;
  logo: string;
  toppings: string;
}

interface PopularPizaaProps {
  pizzas: Pizza[];
}

function PopularPizza(props: PopularPizaaProps) {
  const searchParams = useSearchParams(); 
  const searchQuery = searchParams.get("search");
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (searchQuery && sectionRef.current) {
      window.scrollTo({
        top: sectionRef.current.offsetTop + 200,
        behavior: "smooth",
      });
    }
  }, [searchQuery]);

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
        {props.pizzas.map((pizza, index) => (
          <Box
            key={index}
            sx={{
              flexBasis: { xs: "100%", sm: "48%", md: "30%" }, // Flex basis for 1, 2, or 3 columns
              maxWidth: { xs: "100%", sm: "48%", md: "30%" }, // Ensures each column takes up correct width
            }}
            ref={sectionRef}
          >
            <PizzaCard pizza={pizza} />
          </Box>
        ))}
      </Box>
    </PizzaSection>
  );
}

export default PopularPizza;
