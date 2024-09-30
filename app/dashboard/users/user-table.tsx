import CustomeTable from "@/components/table/custom-table";
import columns from "./user-table-column";
import { User } from "./user-table-column";

type UserTableProps = {
  data: User[];
};

function UserTable(props: UserTableProps) {
  return (
    <CustomeTable
      data={props.data}
      columns={columns}
      maxHeight="70vh"
      title="users"
    />
  );
}

export default UserTable;
