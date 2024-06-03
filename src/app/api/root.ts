import { createCallerFactory, createTRPCRouter } from '@/server/trpc'
import { userRouter } from './routers/user'
import { bankRouter } from './routers/bank'
import { pegawaiRouter } from './routers/pegawai'
import { rekananRouter } from './routers/rekanan'
import { pengelolaBludRouter } from './routers/pengelolaBlud'
import { profilBludRouter } from './routers/profilBlud'
import { kodeRekeningRouter } from './routers/kodeRekening'

export const appRouter = createTRPCRouter({
    user: userRouter,
    bank: bankRouter,
    pegawai: pegawaiRouter,
    rekanan: rekananRouter,
    pengelolaBlud: pengelolaBludRouter,
    profilBlud: profilBludRouter,
    kodeRekening: kodeRekeningRouter,
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
