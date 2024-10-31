import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
// import { createAbility } from "@/abilities/abilities";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { role } = session.user;

  if (role.name === "customer") {
    redirect("/403");
  }

  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
}
