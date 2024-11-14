/* eslint-disable import/no-anonymous-default-export */
export default {
  paths: ["features/e2e/*.feature"],
  requireModule: ["ts-node/register", "tsconfig-paths/register"],
  import: ["features/**/**/*.ts", "features/support/world.ts"],
  loader: ["ts-node/esm"],
};
