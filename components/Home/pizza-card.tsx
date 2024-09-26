import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";

const PizzaCard = ({
  pizza,
}: {
  pizza: {
    image: string;
    name: string;
    description: string;
    restaurantAvatar: string;
    restaurant: string;
    price: number;
  };
}) => {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        height="140"
        image={pizza.image}
        alt={pizza.name}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {pizza.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {pizza.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography variant="h6" color="primary">
            {pizza.price} Birr
          </Typography>
          <Button variant="contained" color="warning">
            Order
          </Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Avatar src={pizza.restaurantAvatar} sx={{ width: 30, height: 30 }} />
          <Typography variant="subtitle2" sx={{ ml: 1 }}>
            {pizza.restaurant}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PizzaCard;
