import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";
import Image from "next/image";

type RestaurantCardProps = {
  resturant: {
    name: string;
    orders: string;
    logo: string;
    desc: string;
  };
};

const RestaurantCard = ({ resturant }: RestaurantCardProps) => (
  <Card
    sx={{
      backgroundColor: "#FFF",
      borderRadius: "10px",
      maxWidth: { xs: "298px", sm: "320px", md: "400px", lg: "574px" },
      maxHeight: { xs: "90px", sm: "100px", md: "120px", lg: "154px" },
    }}
  >
    <CardContent
      sx={{
        display: "flex",
        gap: { xs: "15px", sm: "20px" },
        p: { xs: "10px", sm: "15px", md: "20px", lg: "25px" },
      }}
    >
      {/* left */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: { xs: "5px", sm: "10px" },
          flexDirection: "column",
          width: { xs: "120px", sm: "150px", md: "200px", lg: "235px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: "5px", sm: "10px" },
            mb: { xs: "5px", sm: "10px" },
          }}
        >
          <Avatar
            alt={resturant.name}
            src={resturant.logo}
            sx={{
              width: { xs: "25px", sm: "30px", md: "40px", lg: "50px" },
              height: { xs: "25px", sm: "30px", md: "40px", lg: "50px" },
            }}
          />
          <Typography
            sx={{
              color: "#000",
              fontFamily: "Roboto",
              fontWeight: 700,
              fontSize: { xs: "8px", md: "16px", sm: "12px" },
              lineHeight: "11px",
              letterSpacing: "0.36px",
            }}
          >
            {resturant.name}
          </Typography>
        </Box>
        <Typography
          sx={{
            color: "rgba(0, 0, 0, 0.50)",
            fontFamily: "Inter",
            fontWeight: 400,
            fontSize: { xs: "10px", md: "12px", sm: "14px" },
            fontStyle: "normal",
            lineHeight: "10px",
          }}
        >
          {resturant.desc} Orders
        </Typography>
      </Box>

      {/* right */}
      <Box
        sx={{
          display: "flex",
          px: "15px",
          gap: "20px",
          height: { xs: "68px", sm: "80px", md: "100px", lg: "108px" },
          minWidth: "133px",
          maxWidth: "262px",
          alignItems: "center",
          justifyContent: "flex-start",
          borderRadius: "10px",
          backgroundColor: "rgba(0, 128, 0, 0.05)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: "var(--5, 40px)", sm: "40px", md: "50px", lg: "80px" },
            height: {
              xs: "var(--5, 40px)",
              sm: "40px",
              md: "50px",
              lg: "80px",
            },
          }}
        >
          <Image src="/icons/nitro.svg" alt="nitro" fill objectFit="contain" />
        </Box>
        <Box
          sx={{
            width: {
              xs: "43px",
              sm: "50px",
              md: "60px",
              lg: "132px",
            },
          }}
        >
          <Typography
            sx={{
              color: "rgba(0, 0, 0, 0.50)",
              fontFamily: "Inter",
              fontWeight: 400,
              fontSize: { xs: "8px", lg: "12px" },
              fontStyle: "normal",
              lineHeight: "11px",
              letterSpacing: "0.24px",
            }}
          >
            Number of Order
          </Typography>
          <Typography
            sx={{
              color: "#FF8100",
              fontFamily: "Roboto",
              fontWeight: 700,
              fontSize: { xs: "30px", sm: "35", md: "40px", lg: "50px" },
              fontStyle: "normal",
              lineHeight: "47px",
              letterSpacing: "1.5px",
            }}
          >
            {resturant.orders}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default RestaurantCard;
