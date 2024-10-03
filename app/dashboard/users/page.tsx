import UserTable from "./user-table";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { createAbility } from "@/abilities/abilities";
import { redirect } from "next/navigation";

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

async function Users() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { role } = session.user;

  const ability = createAbility(role.permissions);

  if (!ability.can("read", "users")) {
    redirect("/403");
  }

  return (
    <>
      <UserTable data={data} />
    </>
  );
}

export default Users;
