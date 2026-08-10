import { $ } from "bun";

await Promise.all([
  $`bun --hot ./server/index.ts`,
  $`bun --hot cli/gen-routes.ts`,
]);
