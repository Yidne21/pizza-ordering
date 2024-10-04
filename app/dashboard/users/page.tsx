import UserTable from "./user-table";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { createAbility } from "@/abilities/abilities";
import { redirect } from "next/navigation";
import { Subjects, Actions } from "@/utils/contants";

async function Users() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { role } = session.user;

  const ability = createAbility(role.permissions);

  if (!ability.can(Actions.read, Subjects.users)) {
    redirect("/403");
  }

  return (
    <>
      <UserTable />
    </>
  );
}

export default Users;
