import React from "react";
import OrderTable from "@/app/dashboard/orders/order-table";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { createAbility } from "@/abilities/abilities";
import { redirect } from "next/navigation";
import { Subjects, Actions } from "@/utils/permissionSetting";

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

  return (
    <>
      <OrderTable/>
    </>
  );
};

export default Orders;
