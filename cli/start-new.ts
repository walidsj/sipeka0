import { $ } from 'bun'

// await $`bun run cli/build.ts`
await $`NODE_ENV=production bun src/server/index-new.ts`
