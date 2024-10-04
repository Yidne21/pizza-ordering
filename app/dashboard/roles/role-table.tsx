"use client";

import React, { useCallback, useState } from "react";
import CustomeTable from "@/components/table/custom-table";
import columns from "./role-table-column";
import { Role } from "./role-table-column";
import { filterRoles } from "@/lib/adminActions";
import { MRT_ColumnFiltersState } from "material-react-table";

type RoleTableProps = {
  resturantId: string;
}

function RoleTable(props: RoleTableProps) {
  const [data, setData] = useState<Role[]>([]);

  // Memoize fetchData to prevent unnecessary re-renders
  const fetchData = useCallback(
    async (params: {
      filters: MRT_ColumnFiltersState;
      globalFilter: string;
    }) => {
      const formattedFilters = params.filters.reduce(
        (acc: Record<string, string | number | null>, filter) => {
          const value = filter.value;
          if (
            typeof value === "string" ||
            typeof value === "number" ||
            value === null
          ) {
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

      console.log(filters);

      const result = await filterRoles(filters, props.resturantId);
      setData(result.roles);
    },
    [props.resturantId]
  );

  return (
    <CustomeTable
      data={data}
      columns={columns}
      fetchData={fetchData}
      maxHeight="100%"
      title="roles"
    />
  );
}

export default RoleTable;
