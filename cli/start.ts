import { $ } from "bun";

await Promise.all([
  $`bun run build`,
  $`NODE_ENV=production bun ./server/index.ts`,
]);
