import React from "react";
import PizzaSection from "@/components/Home/pizza-section";
import PizzaCard from "@/components/Home/card/pizza-card";
import { Box, Typography } from "@mui/material";
import { fetchOrderByCustomerId } from "@/lib/customerActions";
import { createAbility } from "../../../abilities/abilities";
import { redirect } from "next/navigation";
import { Actions, Subjects } from "@/utils/permissionSetting";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

async function OrderHistory() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/login");
  }

  const customerId = session.user.id;
  // const { role } = session.user;
  // const ability = createAbility(role.permissions);

  // if (!ability.can(Actions.read, Subjects.orderHistory) || !customerId) {
  //   return redirect("/403");
  // }

  const results = await fetchOrderByCustomerId(customerId);

  if (!results) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Full viewport height
        }}
      >
        <Typography variant="h4" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <PizzaSection title="Order History">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start", // Ensure equal spacing
          gap: "25px", // Space between items
        }}
      >
        {results.orders.map((order, index) => (
          <Box
            key={index}
            sx={{
              flexBasis: { xs: "100%", sm: "48%", md: "30%" }, // Flex basis for 1, 2, or 3 columns
              maxWidth: { xs: "100%", sm: "48%", md: "30%" }, // Ensures each column takes up correct width
            }}
          >
            <PizzaCard pizza={order} isOrdered={true} />
          </Box>
        ))}
      </Box>
    </PizzaSection>
  );
}

export default OrderHistory;
