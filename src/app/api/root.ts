import { createCallerFactory, createTRPCRouter } from '@/server/trpc'
import { userRouter } from './routers/user'
import { bankRouter } from './routers/bank'
import { pegawaiRouter } from './routers/pegawai'
import { rekananRouter } from './routers/rekanan'
import { pengelolaBludRouter } from './routers/pengelolaBlud'

export const appRouter = createTRPCRouter({
    user: userRouter,
    bank: bankRouter,
    pegawai: pegawaiRouter,
    rekanan: rekananRouter,
    pengelolaBlud: pengelolaBludRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
