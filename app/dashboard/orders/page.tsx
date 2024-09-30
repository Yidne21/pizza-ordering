import React from "react";
import OrderTable from "@/app/dashboard/orders/order-table";

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
const Orders = () => {
  return (
    <>
      <OrderTable data={orders} />
    </>
  );
};

export default Orders;
