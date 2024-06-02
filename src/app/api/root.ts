import { createCallerFactory, createTRPCRouter } from '@/server/trpc'
import { userRouter } from './routers/user'
import { bankRouter } from './routers/bank'

export const appRouter = createTRPCRouter({
    user: userRouter,
    bank: bankRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
