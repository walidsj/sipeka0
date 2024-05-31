import { createTRPCRouter, publicProcedure } from '@/server/trpc'

export const helloRouter = createTRPCRouter({
    world: publicProcedure.query(async () => {
        return { message: 'Hello, world!' }
    }),
})
