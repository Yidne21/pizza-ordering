"use client";

import React, { useState } from "react";
import CustomeTable from "@/components/table/custom-table";
import columns from "./order-table-column";
import { Order } from "./order-table-column";
import { filterOrderByResturantId } from "@/lib/adminActions";
import { MRT_ColumnFiltersState } from "material-react-table";

function OrderTabel() {
  const [data, setData] = useState<Order[]>([]);

  const fetchData = async (params: {
    filters: MRT_ColumnFiltersState;
    globalFilter: string;
  }) => {
    const formattedFilters = params.filters.reduce((acc: any, filter) => {
      acc[filter.id] = filter.value;
      return acc;
    }, {});

    const filters = {
      ...formattedFilters,
      global: params.globalFilter,
    };

    const result = await filterOrderByResturantId(filters);
    setData(result.orders);
  };

  return (
    <CustomeTable
      data={data}
      columns={columns}
      fetchData={fetchData}
      maxHeight="100%"
      title="orders"
    />
  );
}

export default OrderTabel;
