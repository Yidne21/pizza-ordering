import { createMongoAbility } from "@casl/ability";

type Rule = Parameters<typeof createMongoAbility>[0];

export const createAbility = (rules: Rule) => createMongoAbility(rules);
