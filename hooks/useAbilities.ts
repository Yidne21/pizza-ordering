import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { createAbility } from "@/abilities/abilities";
import { redirect } from "next/navigation";
const useAbility = () => {
  const { data: session } = useSession();

  const ability = useMemo(() => {
    if (!session?.user.role.permissions) {
      redirect("/login");
    }
    return createAbility(session?.user.role.permissions);
  }, [session]);

  return ability;
};

export default useAbility;
