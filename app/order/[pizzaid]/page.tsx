'use client'

import React, { useEffect, useState } from "react";
import OrderDetailCard from "@/components/Home/card/order-detail";
import { Box, Typography } from "@mui/material";
import RelatedPizza from "@/components/Home/related-pzza";
import { getPizzaDetails } from "@/lib/customerActions";
import { PizzaDetail } from "@/components/Home/card/order-detail";
import { useParams } from "next/navigation";


function OrderDetail(){
  const params = useParams();
  const { pizzaid } = params;
  
  const [pizza, setPizza] = useState< PizzaDetail| null | undefined>(null); 
  const [loading, setLoading] = useState<boolean>(true);

  console.log(pizzaid)

  useEffect(() => {
    const fetchPizzaDetails = async () => {
      setLoading(true)
      try {
        const pizzaData = await getPizzaDetails(pizzaid as string);
        setPizza(pizzaData); 
      } catch (error) {
        console.error("Error fetching pizza details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzaDetails();
  }, [pizzaid]);

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Full viewport height
        }}
      >
        <Typography variant="h4" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    );
  }

  // In case pizza data is not available (null or undefined)
  if (!pizza) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Full viewport height
        }}
      >
        <Typography variant="h4" color="text.secondary">
          No pizza found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: "#FFF8F1",
      }}
    >
      <OrderDetailCard pizzaDetail={pizza} />
      <RelatedPizza />
    </Box>
  );
};

export default OrderDetail;
