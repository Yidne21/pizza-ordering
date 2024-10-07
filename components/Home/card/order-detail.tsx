"use client";

import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  CardMedia,
  CardContent,
  Card,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import { keyframes } from "@emotion/react";
import SuccessPopUp from "@/components/ui/success-popup";
import { Controller, useForm } from "react-hook-form";
import { orderSchema } from "@/utils/schema";
import { orderFormTypes } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrder } from "@/lib/customerActions";

// Keyframes for rolling animation
const rollToActive = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateX(-270px) rotate(-360deg);
    opacity: 0;
  }
`;

type Topping = {
  name: string;
  id: string;
}

export type PizzaDetail = {
  name: string;
  price: number;
  toppings: Topping[];
  images: string[];
  pizzaId: string;
}

interface OrderDetail {
  pizzaDetail: PizzaDetail;
}

function OrderDetailCard({ pizzaDetail }: OrderDetail) {
  const [activeImage, setActiveImage] = useState<string>(
    "/images/featPizza2.png"
  );
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [rollingImage, setRollingImage] = useState<string>("");
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [Quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(pizzaDetail.price);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [orderError, setOrderError] = useState<string | null>(null); // Track upload errors

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const { control, handleSubmit, reset } = useForm<orderFormTypes>({
    resolver: zodResolver(orderSchema),
  });

  const handleOrder = async (data: orderFormTypes) => {
    setIsSubmitting(true);
    setOrderError(null);

    try {
      const formData = new FormData();
      formData.append("toppings", JSON.stringify(data.toppings));
      formData.append("pizzaId", pizzaDetail.pizzaId);
      formData.append("total", totalPrice.toString());
      formData.append("quantity", Quantity.toString());
      const response = await createOrder(formData); // Call the server action

      if (response.success) {
        setOpen(true); // Open success popup
        reset(); // Reset form after successful submission
      } else {
        console.log(response.message);
        setOrderError(response.message);
        reset();
      }
    } catch {
      setOrderError("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
    handleOpen();
    reset();
  };

  const handleAdd = () => {
    const newQuantity = Quantity + 1;
    const newPrice = pizzaDetail.price * newQuantity;
    setQuantity(newQuantity);
    setTotalPrice(newPrice);
  };
  const handleRemove = () => {
    const newQuantity = Quantity - 1;
    const newPrice = totalPrice - pizzaDetail.price;
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    setTotalPrice(newPrice);
  };
  // Handle the image click to trigger animation
  const handleImageClick = (image: string) => {
    setRollingImage(image);
    setIsRolling(true);

    setTimeout(() => {
      setActiveImage(image);
      setIsRolling(false);
      setRollingImage("");
    }, 1000); // Match the animation duration
  };

  return (
    <Card
      sx={{
        p: { xs: "20px", lg: "51px" },
        background: "#FFF8F1",
      }}
      component={"form"}
      onSubmit={handleSubmit(handleOrder)}
    >
      <CardContent
        sx={{
          display: "inline-flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "space-between",
          gap: { xs: "25px", lg: "70px" },
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Left: Image and Inactive Image List */}
        <Box
          sx={{
            display: "flex",
            gap: { xs: "28px", lg: "var(--5, 40px)" },
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Active image */}
          <CardMedia
            component="img"
            sx={{
              width: { xs: "251px", lg: "500px" },
              height: { xs: "251px", lg: "500px" },
              borderRadius: "var(--none, 318px)",
              background: "rgba(234, 129, 0, 0.20)",
            }}
            image={activeImage}
            alt="Active Pizza"
          />

          {/* Inactive image list */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: "20px", lg: "50px" },
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            {pizzaDetail.images.map((image, index) => (
              <CardMedia
                key={index}
                component="img"
                ref={imageRef}
                sx={{
                  width: { xs: "100px", lg: "208px" },
                  height: { xs: "100px", lg: "208px" },
                  borderRadius: "var(--none, 208px)",
                  background: "rgba(2, 1, 1, 0.30)",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#D9D9D9",
                  },
                }}
                image={image}
                alt={`Pizza Image ${index + 1}`}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </Box>

          {/* Rolling image animation */}
          {rollingImage && isRolling && (
            <CardMedia
              component="img"
              sx={{
                width: { xs: "100px", lg: "208px" },
                height: { xs: "100px", lg: "208px" },
                borderRadius: "var(--none, 208px)",
                position: "absolute",
                top: imageRef.current?.getBoundingClientRect().top,
                left: imageRef.current?.getBoundingClientRect().left,
                animation: `${rollToActive} 1s ease-in-out`,
              }}
              image={rollingImage}
              alt="Rolling Pizza"
            />
          )}
        </Box>

        {/* Right: Details Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "20px",
            alignSelf: "stretch",
          }}
        >
          <Typography
            sx={{
              color: "#000",
              fontFamily: "Roboto",
              fontSize: { xs: "20px", lg: "80px" },
              fontWeight: 700,
              lineHeight: { xs: "18px", lg: "75px" },
              letterSpacing: { xs: "0.6px", lg: "2.4px" },
            }}
          >
            {pizzaDetail.name}
          </Typography>

          {/* Toppings */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: "0px", lg: "15px" },
              flexWrap: "wrap",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            {pizzaDetail.toppings.map((topping, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Controller
                    name="toppings"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        value={topping.id}
                        checked={field.value.includes(topping.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([...field.value, e.target.value]);
                          } else {
                            field.onChange(
                              field.value.filter(
                                (val) => val !== e.target.value
                              )
                            );
                          }
                        }}
                        sx={{
                          "&.Mui-checked": {
                            color: "#FF8100",
                          },
                        }}
                      />
                    )}
                  />
                }
                label={topping.name}
              />
            ))}
          </Box>

          {/* Quantity Selector */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: "15px", lg: "35px" },
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "50px",
                alignItems: "center",
              }}
            >
              <Button
                sx={{
                  borderRadius: "10px",
                  border: "1px solid #FF8100",
                  background: "#FFF",
                }}
                onClick={handleRemove}
              >
                <RemoveIcon
                  sx={{ color: "#000", width: "40px", height: "40px" }}
                />
              </Button>
              <Typography
                sx={{
                  color: "#000",
                  fontFamily: "DM Sans",
                  fontSize: "32px",
                  fontWeight: 400,
                  lineHeight: "normal",
                  letterSpacing: { xs: "0.1px", lg: "0.2px" },
                }}
              >
                {Quantity}
              </Typography>
              <Button
                sx={{
                  borderRadius: "10px",
                  border: "1px solid #FF8100",
                  background: "#FFF",
                }}
                onClick={handleAdd}
              >
                <AddIcon
                  sx={{ color: "#000", width: "40px", height: "40px" }}
                />
              </Button>
            </Box>

            <Box sx={{ display: "flex", gap: "5px", alignItems: "top" }}>
              <Typography
                sx={{
                  color: "#01C550",
                  fontFamily: "Roboto",
                  fontSize: "45px",
                  fontWeight: 700,
                  letterSpacing: "1.35px",
                }}
              >
                {totalPrice}
              </Typography>
              <Typography
                sx={{
                  color: "rgba(0, 0, 0, 0.75)",
                  fontFamily: "Roboto",
                  fontSize: "15px",
                  fontWeight: 400,
                  letterSpacing: "0.45px",
                }}
              >
                Birr
              </Typography>
            </Box>
          </Box>

          {/* Order Button */}
          <Button
            sx={{
              display: "flex",
              padding: "15px 30px",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "10px",
              background: "#FF8100",
              alignSelf: "stretch",
              color: "#FDFFFE",
            }}
            type="submit"
            disabled={isSubmitting}
          >
            <Typography
              sx={{
                color: "#FDFFFE",
                fontFamily: "Inter",
                fontSize: { xs: "25px", lg: "30px" },
                fontWeight: 700,
                letterSpacing: { xs: "0.5px", lg: "0.96px" },
                textTransform: "none",
              }}
            >
              Order
            </Typography>
            <ArrowOutwardOutlinedIcon
              sx={{
                color: "#FDFFFE",
                width: "33px",
                height: "32px",
              }}
            />
          </Button>

          {/* Error Message */}

          {orderError && (
            <Typography
              sx={{
                color: "red",
                textAlign: "center",
              }}
            >
              {orderError}
            </Typography>
          )}

          {/* Success Popup */}

          <SuccessPopUp
            open={open}
            onClose={handleClose}
            message="Your order has been successfully completed!"
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default OrderDetailCard;
