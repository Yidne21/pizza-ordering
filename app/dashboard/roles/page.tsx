import RoleTable from "./role-table";

const data = [
  {
    id: 1,
    name: "Admin",
    createdAt: "2021-10-10",
    permissions: ["create", "read", "update", "delete"],
    status: "Active",
  },
  {
    id: 2,
    name: "User",
    createdAt: "2021-10-10",
    permissions: ["read"],
    status: "InActive",
  },
];

function Roles() {
  return (
    <>
      <RoleTable data={data} />
    </>
  );
}

export default Roles;
