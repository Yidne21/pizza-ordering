import React from "react";
import CustomeTable from "@/components/table/custom-table";
import columns from "./role-table-column";
import { Role } from "./role-table-column";

type RoleTableProps = {
  data: Role[];
};

function RoleTable(props: RoleTableProps) {
  return (
    <CustomeTable
      data={props.data}
      columns={columns}
      maxHeight="100%"
      title="roles"
    />
  );
}

export default RoleTable;
