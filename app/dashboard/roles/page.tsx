import RoleTable from "./role-table";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { createAbility } from "@/abilities/abilities";
import { redirect } from "next/navigation";
import { Subjects, Actions } from "@/utils/permissionSetting";
import { filterRoles } from "@/lib/adminActions";
import { Role } from "./role-table-column";

type Filters = {
  global?: string;
  [key: string]: string | number | null | undefined;
};

async function fetchRoles(filters: Filters): Promise<Role[]> {
  const result = await filterRoles(filters);
  return result.roles;
}

async function Roles() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { role } = session.user;

  const ability = createAbility(role.permissions);

  if (!ability.can(Actions.read, Subjects.roles)) {
    redirect("/403");
  }

  const roles = await fetchRoles({});



  return (
    <>
      <RoleTable  initialRoles={roles}/>
    </>
  );
}

export default Roles;
