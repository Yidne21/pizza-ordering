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

async function fetchOrders(
  filters: Filters,
  resturantId: string
): Promise<Order[]> {
  const result = await filterOrders(filters, resturantId);
  return result.orders;
}

const Orders = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { role, resturantId } = session.user;

  const ability: ReturnType<typeof createAbility> = createAbility(
    role.permissions
  );

  if (!ability.can(Actions.read, Subjects.orders) || !resturantId) {
    redirect("/403");
  }

  const orders = await fetchOrders({}, resturantId);

  return (
    <>
      <OrderTable initialOrders={orders} resturantId={resturantId} />
    </>
  );
};

export default Orders;
