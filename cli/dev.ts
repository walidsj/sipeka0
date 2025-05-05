import { $ } from 'bun'

await Promise.all([$`bun --hot src/server/index.ts`, $`bun --watch cli/gen-routes.ts`])
