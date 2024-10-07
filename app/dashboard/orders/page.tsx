import React from "react";
import OrderTable from "@/app/dashboard/orders/order-table";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { createAbility } from "@/abilities/abilities";
import { redirect } from "next/navigation";
import { Subjects, Actions } from "@/utils/permissionSetting";
import { filterOrders } from "@/lib/adminActions";
import { Order } from "./order-table-column";

type Filters = {
  global?: string;
  [key: string]: string | number | null | undefined;
};

async function fetchOrders(filters: Filters): Promise<Order[]> {
  const result = await filterOrders(filters);
  return result.orders;
}

const Orders = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { role } = session.user;

  const ability = createAbility(role.permissions);

  if (!ability.can(Actions.read, Subjects.orders)) {
    redirect("/403");
  }

  const resturantId = session.user.resturantId;

  if(!resturantId){
    redirect("/403");
  }

  const orders = await fetchOrders({});

  return (
    <>
      <OrderTable initialOrders={orders}/>
    </>
  );
};

export default Orders;
