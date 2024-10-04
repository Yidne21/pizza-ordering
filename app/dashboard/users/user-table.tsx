'use client'

import CustomeTable from "@/components/table/custom-table";
import columns from "./user-table-column";
import { User } from "./user-table-column";
import { filterUsers } from "@/lib/adminActions";
import { MRT_ColumnFiltersState } from "material-react-table";
import { useCallback, useState } from "react";

type UserTableProps ={
  resturantId: string;
}


function UserTable(props: UserTableProps) {
  const [data, setData] = useState<User[]>([]);

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
  
        const result = await filterUsers(filters, props.resturantId);
        setData(result.users);
      },
      [props.resturantId]
    );
    
  return (
    <CustomeTable
      data={data}
      columns={columns}
      fetchData={fetchData}
      maxHeight="70vh"
      title="users"
    />
  );
}

export default UserTable;
