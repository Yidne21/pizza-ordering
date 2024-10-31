import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { createAbility } from "@/abilities/abilities";
const useAbility = () => {
  const { data: session } = useSession();

  const ability = useMemo(() => {
    if (!session?.user.role.permissions) {
      return null;
    }
    return createAbility(session?.user.role.permissions);
  }, [session]);

  return ability;
};

export default useAbility;
