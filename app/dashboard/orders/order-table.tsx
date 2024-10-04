"use client";

import React, { useCallback, useState } from "react";
import CustomeTable from "@/components/table/custom-table";
import columns from "./order-table-column";
import { Order } from "./order-table-column";
import { filterOrders } from "@/lib/adminActions";
import { MRT_ColumnFiltersState } from "material-react-table";

type OrderTableProps = {
  resturantId: string;
}

function OrderTabel(props: OrderTableProps) {
  const [data, setData] = useState<Order[]>([]);

  // Memoize fetchData to prevent unnecessary re-renders
  const fetchData = useCallback(async (params: {
    filters: MRT_ColumnFiltersState;
    globalFilter: string;
  }) => {
    const formattedFilters = params.filters.reduce(
      (acc: Record<string, string | number | null>, filter) => {
        const value = filter.value;
        if (typeof value === 'string' || typeof value === 'number' || value === null) {
          acc[filter.id] = value;
        }
        return acc;
      },
      {} as Record<string, string | number | null>
    );

    const filters = {
      ...formattedFilters,
      global: params.globalFilter,
    };

    const result = await filterOrders(filters, props.resturantId);
    setData(result.orders);
  }, [props.resturantId]);

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
