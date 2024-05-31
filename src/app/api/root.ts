import { createCallerFactory, createTRPCRouter } from '@/server/trpc'
import { helloRouter } from './routers/hello'

export const appRouter = createTRPCRouter({
    hello: helloRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
