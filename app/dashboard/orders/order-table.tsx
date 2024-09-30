"use client";

import React from "react";
import CustomeTable from "@/components/table/custom-table";
import columns from "./order-table-column";
import { Order } from "./order-table-column";

type OrderTableProps = {
  data: Order[];
};

function OrderTabel(props: OrderTableProps) {
  return (
    <CustomeTable
      data={props.data}
      columns={columns}
      maxHeight="100%"
      title="orders"
    />
  );
}

export default OrderTabel;
