import UserTable from "./user-table";

const data = [
  {
    id: 1,
    name: "John Doe",
    email: "jondoe@gmail.com",
    phone: "1234567890",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jondoe@gmail.com",
    phone: "1234567890",
    status: "Inactive",
  },
];

function Users() {
  return (
    <>
      <UserTable data={data} />
    </>
  );
}

export default Users;
