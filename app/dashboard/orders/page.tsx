import React from "react";
import OrderTable from "@/app/dashboard/orders/order-table";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { createAbility } from "@/abilities/abilities";
import { redirect } from "next/navigation";

const orders = [
  {
    pizza: "Pepperoni",
    toppings: ["Cheese", "Pepperoni"],
    quantity: 2,
    customer_no: "123456",
    created_at: "2021-12-01",
    status: "PREPARING",
  },
  {
    pizza: "Margherita",
    toppings: ["Cheese", "Tomato"],
    quantity: 1,
    customer_no: "123457",
    created_at: "2021-12-02",
    status: "READY",
  },

  {
    pizza: "Hawaiian",
    toppings: ["Cheese", "Pineapple", "Ham"],
    quantity: 3,
    customer_no: "123458",
    created_at: "2021-12-03",
    status: "DELIVERED",
  },
];
const Orders = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { role } = session.user;

  const ability = createAbility(role.permissions);

  if (!ability.can("read", "orders")) {
    redirect("/403");
  }
  return (
    <>
      <OrderTable data={orders} />
    </>
  );
};

export default Orders;
