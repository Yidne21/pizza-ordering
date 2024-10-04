import RoleTable from "./role-table";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { createAbility } from "@/abilities/abilities";
import { redirect } from "next/navigation";
import { Subjects, Actions } from "@/utils/contants";

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

  return (
    <>
      <RoleTable data={data} />
    </>
  );
}

export default Roles;
