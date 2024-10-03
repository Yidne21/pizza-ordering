"use client";

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
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";

type PizzaCardProps = {
  pizza: {
    id?: string;
    image: string;
    name: string;
    description: string;
    restaurantAvatar?: string;
    restaurant?: string;
    price: number;
    status?: string;
  };
  isOrdered?: boolean;
  isRelated?: boolean;
};

const PizzaCard = (props: PizzaCardProps) => {
  const router = useRouter();
  const handleOrder = () => {
    router.push(`order/${props.pizza.id}`);
  };

  return (
    <Card
      sx={{
        p: "30px",
        background: "#FFF",
        display: "flex",
        flexDirection: "column",
        borderRadius: "25px",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "387px",
        maxHeight: "621px",
        border: "none",
        boxShadow: "none",
        gap: "5px",
        width: "100%",
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: { xs: "233px", lg: "318px" },
          height: { xs: "233px", lg: "318px" },
          borderRadius: "var(--none, 318px)",
          background: "rgba(234, 129, 0, 0.20)",
          pt: "20px",
          pl: "15px",
        }}
        image="/images/wfullpizza.png"
        alt={props.pizza.name}
      />

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          width: "100%",
          height: "100%",
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "#000",
              fontFamily: "Roboto",
              fontSize: { xs: "20px", lg: "24px" },
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: { xs: "18px", lg: "28px" },
              letterSpacing: { xs: "0.6px", lg: "0.72px" },
            }}
          >
            {props.pizza.name}
          </Typography>
          <Typography
            sx={{
              color: "rgba(0, 0, 0, 0.75)",
              fontFamily: "Roboto",
              fontSize: { xs: "10px", sm: "12px", lg: "15px" },
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: { xs: "9px", lg: "14px" },
              letterSpacing: { xs: "0.3px", lg: "0.45px" },
              mt: "10px",
            }}
          >
            {props.pizza.description}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            {!props.isRelated && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "top",
                  gap: "5px",
                }}
              >
                <Typography
                  sx={{
                    color: "#01C550",
                    fontFamily: "Roboto",
                    fontSize: { xs: "30px", lg: "45px" },
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: { xs: "29px", lg: "45px" },
                    letterSpacing: { xs: "0.9px", lg: "1.35px" },
                  }}
                >
                  {props.pizza.price}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(0, 0, 0, 0.75)",
                    fontFamily: "Roboto",
                    fontSize: { lg: "15px" },
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "14px",
                    letterSpacing: "0.45px",
                  }}
                >
                  Birr
                </Typography>
              </Box>
            )}

            {!props.isOrdered && !props.isRelated && (
              <Button
                sx={{
                  display: "flex",
                  padding: { lg: "10px 20px" },
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                  background: "#FF8100",
                  color: "#FDFFFE",
                }}
                onClick={handleOrder}
              >
                <Typography
                  sx={{
                    color: "##FDFFFE",
                    fontFamily: "Inter",
                    fontSize: { xs: "25px", lg: "32px" },
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: { xs: "36px", lg: "46px" },
                    letterSpacing: { xs: "0.75", lg: "0.96px" },
                    textTransform: "none",
                  }}
                  variant="button"
                >
                  Order
                </Typography>
              </Button>
            )}

            {props.isOrdered && (
              <Typography
                sx={{
                  color:
                    props.pizza.status === "Ordered" ? "#FFA500" : "#008000",
                  fontFamily: "Inter",
                  fontSize: "32px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "46px",
                  letterSpacing: "0.96px",
                }}
              >
                {props.pizza.status}
              </Typography>
            )}
          </Box>
        </Box>

        {!props.isOrdered && !props.isRelated && (
          <>
            <Divider
              sx={{
                my: "5px",
                width: "100%",
                background: "rgba(0, 0, 0, 0.10)",
                height: "var(--none, 1px)",
              }}
              component="hr"
            />

            {/* footer */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Avatar
                src={props.pizza.restaurantAvatar}
                sx={{
                  width: "65px",
                  height: "65px",
                  borderRadius: "var(--none, 65px)",
                }}
              />
              <Typography
                sx={{
                  color: "rgba(0, 0, 0, 0.75)",
                  fontFamily: "Roboto",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "18px",
                  letterSpacing: "0.6px",
                }}
              >
                {props.pizza.restaurant}
              </Typography>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PizzaCard;
