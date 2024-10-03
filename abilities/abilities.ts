import { createMongoAbility } from "@casl/ability";

// Define the Permission type
type Permission = { action: string; subject: string };

// Create the CASL ability based on the user's permissions
export const createAbility = (permissions: Permission[]) => {
  return createMongoAbility(permissions);
};
