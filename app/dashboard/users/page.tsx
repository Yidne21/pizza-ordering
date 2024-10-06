import UserTable from "./user-table";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { createAbility } from "@/abilities/abilities";
import { redirect } from "next/navigation";
import { Subjects, Actions } from "@/utils/permissionSetting";
import { filterUsers } from "@/lib/adminActions";
import { User } from "./user-table-column";

type Filters = {
  global?: string;
  [key: string]: string | number | null | undefined;
};

async function fetchUsers( filters: Filters): Promise<User[]> {
  const result = await filterUsers(filters);
  return result.users;
}

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


  const users = await fetchUsers({});

  return (
    <>
      <UserTable initialUsers={users}/>
    </>
  );
}

export default Users;
